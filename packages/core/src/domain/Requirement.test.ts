import assert from "node:assert/strict";
import test from "node:test";
import { ValidationError } from "../errors/ValidationError.js";
import { RequirementId } from "../value-objects/Ids.js";
import { Priority } from "../value-objects/Priority.js";
import { RequirementStatus } from "../value-objects/RequirementStatus.js";
import { RequirementType } from "../value-objects/RequirementType.js";
import { Requirement } from "./Requirement.js";

const input = {
  id: new RequirementId("req-1"),
  title: "Traceable requirements",
  description: "Requirements must be traceable.",
  type: RequirementType.Functional,
  priority: Priority.High,
  acceptanceCriteria: ["Requirement can be linked to a work order"],
  source: "Stakeholder workshop",
};

test("requirement has an explicit approval lifecycle", () => {
  const requirement = Requirement.create(input);
  requirement.approve();
  requirement.markImplemented();

  assert.equal(requirement.statusValue(), RequirementStatus.Implemented);
});

test("requirement rejects empty acceptance criteria", () => {
  assert.throws(
    () => Requirement.create({ ...input, acceptanceCriteria: [] }),
    ValidationError,
  );
});
