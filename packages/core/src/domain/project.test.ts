import assert from "node:assert/strict";
import test from "node:test";
import { DuplicateRequirementError } from "../errors/DuplicateRequirementError.js";
import { MissingRequirementError } from "../errors/MissingRequirementError.js";
import { ProjectId, RequirementId, WorkOrderId } from "../value-objects/Ids.js";
import { Priority } from "../value-objects/Priority.js";
import { RequirementType } from "../value-objects/RequirementType.js";
import { Requirement } from "./Requirement.js";
import { Project } from "./project.js";

const requirement = (id = "req-1") => Requirement.create({
  id: new RequirementId(id),
  title: "Auditability",
  description: "Every decision is auditable.",
  type: RequirementType.Compliance,
  priority: Priority.High,
  acceptanceCriteria: ["A traceability link exists"],
  source: "Charter",
});

test("project rejects duplicate requirements and work orders with missing requirements", () => {
  const project = new Project(new ProjectId("project-1"), "Studio");
  project.addRequirement(requirement());

  assert.throws(() => project.addRequirement(requirement()), DuplicateRequirementError);
  assert.throws(
    () => project.createWorkOrder({
      id: new WorkOrderId("wo-1"),
      title: "Implement audit trail",
      description: "Implement the audit trail.",
      requirementIds: [new RequirementId("missing")],
    }),
    MissingRequirementError,
  );
});
