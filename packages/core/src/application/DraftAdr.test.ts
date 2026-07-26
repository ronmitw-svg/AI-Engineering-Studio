import assert from "node:assert/strict";
import test from "node:test";
import { Project } from "../domain/project.js";
import { Requirement } from "../domain/Requirement.js";
import { Priority } from "../value-objects/Priority.js";
import { RequirementType } from "../value-objects/RequirementType.js";
import { AdrId, ProjectId, RequirementId } from "../value-objects/Ids.js";
import type { AiCompletionRequest, AiProvider } from "../ports/AiProvider.js";
import type { ProjectRepository } from "../repositories/ProjectRepository.js";
import { AiResponseError } from "./AiResponseError.js";
import { DraftAdr } from "./DraftAdr.js";
import { MissingRequirementError } from "../errors/MissingRequirementError.js";

class InMemoryProjectRepository implements ProjectRepository {
  private readonly projects = new Map<string, Project>();
  async findById(id: ProjectId): Promise<Project | null> { return this.projects.get(id.value) ?? null; }
  async findAll(): Promise<Project[]> { return [...this.projects.values()]; }
  async save(project: Project): Promise<void> { this.projects.set(project.id.value, project); }
}

class StubAiProvider implements AiProvider {
  public lastRequest?: AiCompletionRequest;
  constructor(private readonly response: string) {}
  async complete(request: AiCompletionRequest): Promise<string> {
    this.lastRequest = request;
    return this.response;
  }
}

async function projectWithRequirement(repository: ProjectRepository): Promise<ProjectId> {
  const projectId = new ProjectId("project-adr-draft");
  const project = Project.create({ id: projectId, name: "AI drafting" });
  project.addRequirement((await import("../domain/Requirement.js")).Requirement.create({
    id: new RequirementId("req-1"), title: "Governed persistence", description: "Persist projects safely.",
    type: RequirementType.Functional, priority: Priority.High, acceptanceCriteria: ["Data survives restart"], source: "Charter",
  }));
  await repository.save(project);
  return projectId;
}

test("drafts an ADR from the AI provider's response and persists it as Proposed", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = await projectWithRequirement(repository);
  const ai = new StubAiProvider(JSON.stringify({
    context: "Persistence must survive process restarts without a database dependency.",
    decision: "Use versioned JSON snapshots on the local filesystem.",
    consequences: "Adapters stay simple; multi-process concurrent writes are out of scope.",
  }));

  const adr = await new DraftAdr(repository, ai).execute({
    projectId, id: new AdrId("adr-draft-1"), title: "Choose a persistence strategy",
    requirementIds: [new RequirementId("req-1")], question: "How should projects be persisted?",
  });

  assert.equal(adr.decision, "Use versioned JSON snapshots on the local filesystem.");
  assert.equal((await repository.findById(projectId))?.getAdrs()[0]?.decision, adr.decision);
  assert.match(ai.lastRequest?.prompt ?? "", /req-1: Governed persistence/);
  assert.match(ai.lastRequest?.prompt ?? "", /How should projects be persisted\?/);
});

test("accepts a JSON response wrapped in a markdown code fence", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = await projectWithRequirement(repository);
  const ai = new StubAiProvider('```json\n{"context":"c","decision":"d","consequences":"e"}\n```');

  const adr = await new DraftAdr(repository, ai).execute({
    projectId, id: new AdrId("adr-draft-2"), title: "Choose a persistence strategy",
    requirementIds: [new RequirementId("req-1")], question: "How should projects be persisted?",
  });

  assert.equal(adr.decision, "d");
});

test("rejects a malformed AI response instead of persisting a broken ADR", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = await projectWithRequirement(repository);
  const ai = new StubAiProvider("not json at all");

  await assert.rejects(
    new DraftAdr(repository, ai).execute({
      projectId, id: new AdrId("adr-draft-3"), title: "Choose a persistence strategy",
      requirementIds: [new RequirementId("req-1")], question: "How should projects be persisted?",
    }),
    AiResponseError,
  );
  assert.equal((await repository.findById(projectId))?.getAdrs().length, 0);
});

test("rejects a request referencing a requirement outside the project before calling the AI", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = await projectWithRequirement(repository);
  const ai = new StubAiProvider("unused");

  await assert.rejects(
    new DraftAdr(repository, ai).execute({
      projectId, id: new AdrId("adr-draft-4"), title: "Choose a persistence strategy",
      requirementIds: [new RequirementId("req-missing")], question: "How should projects be persisted?",
    }),
    MissingRequirementError,
  );
  assert.equal(ai.lastRequest, undefined);
});
