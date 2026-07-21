import assert from "node:assert/strict";
import test from "node:test";
import { InvalidStateTransitionError } from "../errors/InvalidStateTransitionError.js";
import { AdrId } from "../value-objects/Ids.js";
import { ArchitectureDecisionRecord, AdrStatus } from "./ArchitectureDecisionRecord.js";

test("ADR can only be superseded after acceptance", () => {
  const adr = ArchitectureDecisionRecord.create({
    id: new AdrId("adr-1"),
    title: "Use a core package",
    context: "Business rules need a stable home.",
    decision: "Place business rules in @aes/core.",
    consequences: "Adapters depend on core.",
  });

  assert.throws(() => adr.supersede(new AdrId("adr-2")), InvalidStateTransitionError);
  adr.accept();
  adr.supersede(new AdrId("adr-2"));
  assert.equal(adr.statusValue(), AdrStatus.Superseded);
});
