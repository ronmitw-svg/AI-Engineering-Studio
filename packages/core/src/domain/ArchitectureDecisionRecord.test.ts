import assert from "node:assert/strict";
import test from "node:test";
import { InvalidStateTransitionError } from "../errors/InvalidStateTransitionError.js";
import { SeparationOfDutiesError } from "../errors/SeparationOfDutiesError.js";
import { AdrId, RequirementId } from "../value-objects/Ids.js";
import { ArchitectureDecisionRecord, AdrStatus } from "./ArchitectureDecisionRecord.js";
import { ValidationError } from "../errors/ValidationError.js";

test("ADR can only be superseded after acceptance", () => {
  const adr = ArchitectureDecisionRecord.create({
    id: new AdrId("adr-1"),
    title: "Use a core package",
    context: "Business rules need a stable home.",
    decision: "Place business rules in @aes/core.",
    consequences: "Adapters depend on core.",
    requirementIds: [new RequirementId("req-1")],
    proposedBy: "architect",
  });

  assert.throws(() => adr.supersede(new AdrId("adr-2")), InvalidStateTransitionError);
  adr.accept("reviewer");
  adr.supersede(new AdrId("adr-2"));
  assert.equal(adr.statusValue(), AdrStatus.Superseded);
});

test("ADR must reference at least one requirement", () => {
  assert.throws(() => ArchitectureDecisionRecord.create({
    id: new AdrId("adr-2"),
    title: "Use a core package",
    context: "Business rules need a stable home.",
    decision: "Place business rules in @aes/core.",
    consequences: "Adapters depend on core.",
    requirementIds: [],
    proposedBy: "architect",
  }), ValidationError);
});

test("an ADR cannot be accepted by whoever proposed it", () => {
  const adr = ArchitectureDecisionRecord.create({
    id: new AdrId("adr-3"),
    title: "Use a core package",
    context: "Business rules need a stable home.",
    decision: "Place business rules in @aes/core.",
    consequences: "Adapters depend on core.",
    requirementIds: [new RequirementId("req-1")],
    proposedBy: "architect",
  });

  assert.throws(() => adr.accept("architect"), SeparationOfDutiesError);
});
