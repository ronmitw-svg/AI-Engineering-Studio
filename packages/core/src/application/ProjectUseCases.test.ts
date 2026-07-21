import assert from "node:assert/strict";
import test from "node:test";
import { ApproveWorkOrder, CreateProject, CreateRequirement, CreateWorkOrder, StartWorkOrder, SubmitWorkOrderForReview } from "./ProjectUseCases.js";
import type { Project } from "../domain/project.js";
import type { ProjectRepository } from "../repositories/ProjectRepository.js";
import { ProjectId, RequirementId, WorkOrderId } from "../value-objects/Ids.js";
import { Priority } from "../value-objects/Priority.js";
import { RequirementType } from "../value-objects/RequirementType.js";
import { WorkOrderStatus } from "../value-objects/WorkOrderStatus.js";

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
  stored?.findWorkOrder(new WorkOrderId("wo-1"))?.markReady();
  await start.execute({ projectId, workOrderId: new WorkOrderId("wo-1") });
  await new SubmitWorkOrderForReview(repository).execute({ projectId, workOrderId: new WorkOrderId("wo-1") });
  await new ApproveWorkOrder(repository).execute({ projectId, workOrderId: new WorkOrderId("wo-1") });

  assert.equal(stored?.findWorkOrder(new WorkOrderId("wo-1"))?.statusValue(), WorkOrderStatus.Completed);
});
