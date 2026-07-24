import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Project, ProjectId, Requirement, RequirementId, Priority, RequirementType, WorkOrderId, WorkOrderStatus } from "@aes/core";
import { FileSystemProjectRepository } from "./FileSystemProjectRepository.js";

test("filesystem repository round-trips the project state", async () => {
  const directory = await mkdtemp(join(tmpdir(), "aes-filesystem-"));
  try {
    const repository = new FileSystemProjectRepository(directory);
    const project = Project.create({ id: new ProjectId("project-1"), name: "Studio" });
    project.addRequirement(Requirement.create({ id: new RequirementId("req-1"), title: "Persist projects", description: "Projects survive restart.",
      type: RequirementType.Functional, priority: Priority.High, acceptanceCriteria: ["Project reloads"], source: "Roadmap" }));
    const workOrder = project.createWorkOrder({ id: new WorkOrderId("wo-1"), title: "Persist data", description: "Write project data.", requirementIds: [new RequirementId("req-1")] });
    workOrder.markReady();
    await repository.save(project);

    const restored = await repository.findById(new ProjectId("project-1"));
    assert.equal(restored?.name, "Studio");
    assert.equal(restored?.getRequirements().length, 1);
    assert.equal(restored?.findWorkOrder(new WorkOrderId("wo-1"))?.statusValue(), WorkOrderStatus.Ready);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
