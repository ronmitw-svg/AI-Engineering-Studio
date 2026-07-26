import assert from "node:assert/strict";
import test from "node:test";
import { ApproveWorkOrder, CreateAdr, CreateProject, CreateRequirement, CreateReview, CreateStakeholder, CreateWorkOrder, MarkWorkOrderReady, StartWorkOrder, SubmitWorkOrderForReview } from "./ProjectUseCases.js";
import { AdrId, ReviewId, StakeholderId } from "../value-objects/Ids.js";
import type { Project } from "../domain/project.js";
import type { ProjectRepository } from "../repositories/ProjectRepository.js";
import { ProjectId, RequirementId, WorkOrderId } from "../value-objects/Ids.js";
import { Priority } from "../value-objects/Priority.js";
import { RequirementType } from "../value-objects/RequirementType.js";
import { WorkOrderStatus } from "../value-objects/WorkOrderStatus.js";
import { AnalyzeProjectTraceability } from "./ProjectAnalysis.js";

class InMemoryProjectRepository implements ProjectRepository {
  private readonly projects = new Map<string, Project>();
  async findById(id: ProjectId): Promise<Project | null> { return this.projects.get(id.value) ?? null; }
  async save(project: Project): Promise<void> { this.projects.set(project.id.value, project); }
}

test("application use cases persist controlled project changes", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = new ProjectId("project-1");
  await new CreateProject(repository).execute({ id: projectId, name: "Studio" });
  await new CreateRequirement(repository).execute({
    projectId, id: new RequirementId("req-1"), title: "Traceability", description: "Track changes.",
    type: RequirementType.Functional, priority: Priority.High, acceptanceCriteria: ["A link exists"], source: "Charter",
  });
  await new CreateWorkOrder(repository).execute({
    projectId, id: new WorkOrderId("wo-1"), title: "Implement links", description: "Implement trace links.",
    requirementIds: [new RequirementId("req-1")],
  });
  const start = new StartWorkOrder(repository);
  const stored = await repository.findById(projectId);
  await new MarkWorkOrderReady(repository).execute({ projectId, workOrderId: new WorkOrderId("wo-1") });
  await start.execute({ projectId, workOrderId: new WorkOrderId("wo-1") });
  await new SubmitWorkOrderForReview(repository).execute({ projectId, workOrderId: new WorkOrderId("wo-1") });
  await new ApproveWorkOrder(repository).execute({ projectId, workOrderId: new WorkOrderId("wo-1") });

  assert.equal(stored?.findWorkOrder(new WorkOrderId("wo-1"))?.statusValue(), WorkOrderStatus.Completed);
});

test("stakeholder use case persists stakeholder context", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = new ProjectId("project-stakeholder");
  await new CreateProject(repository).execute({ id: projectId, name: "Stakeholder project" });
  await new CreateStakeholder(repository).execute({ projectId, id: new StakeholderId("stk-1"), name: "Product owner", role: "Sponsor",
    interest: "Delivery", influence: "High", notes: "Approves scope." });
  assert.equal((await repository.findById(projectId))?.getStakeholders()[0]?.name, "Product owner");
});

test("review use case links an independent reviewer to a work order", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = new ProjectId("project-review");
  await new CreateProject(repository).execute({ id: projectId, name: "Review project" });
  await new CreateRequirement(repository).execute({ projectId, id: new RequirementId("req-review"), title: "Review", description: "Review work.",
    type: RequirementType.Functional, priority: Priority.Medium, acceptanceCriteria: ["Review exists"], source: "Charter" });
  await new CreateWorkOrder(repository).execute({ projectId, id: new WorkOrderId("wo-review"), title: "Implement", description: "Implement review.", requirementIds: [new RequirementId("req-review")] });
  await new CreateReview(repository).execute({ projectId, id: new ReviewId("review-1"), target: new WorkOrderId("wo-review"), reviewer: "review-agent" });
  assert.equal((await repository.findById(projectId))?.getReviews()[0]?.reviewer, "review-agent");
});

test("ADR use case persists an architectural decision", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = new ProjectId("project-adr");
  await new CreateProject(repository).execute({ id: projectId, name: "ADR project" });
  await new CreateAdr(repository).execute({ projectId, id: new AdrId("adr-1"), title: "Use core", context: "Rules need boundaries.",
    decision: "Use a core package.", consequences: "Adapters depend on core." });
  assert.equal((await repository.findById(projectId))?.getAdrs().length, 1);
});

test("traceability analysis identifies unlinked requirements", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = new ProjectId("project-analysis");
  await new CreateProject(repository).execute({ id: projectId, name: "Analysis" });
  await new CreateRequirement(repository).execute({ projectId, id: new RequirementId("req-unlinked"), title: "Coverage", description: "Must be covered.",
    type: RequirementType.Functional, priority: Priority.Medium, acceptanceCriteria: ["A work order exists"], source: "Charter" });

  const report = await new AnalyzeProjectTraceability(repository).execute(projectId);
  assert.deepEqual(report.unlinkedRequirementIds, ["req-unlinked"]);
  assert.equal(report.isValid, false);
});
