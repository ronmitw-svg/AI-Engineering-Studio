import assert from "node:assert/strict";
import test from "node:test";
import { InvalidStateTransitionError } from "../errors/InvalidStateTransitionError.js";
import { SeparationOfDutiesError } from "../errors/SeparationOfDutiesError.js";
import { ReleaseId, RequirementId } from "../value-objects/Ids.js";
import { ReleaseStatus } from "../value-objects/ReleaseStatus.js";
import { Release } from "./Release.js";

test("a release starts as a draft and records its proposer in the audit trail", () => {
  const release = Release.create({ id: new ReleaseId("release-1"), version: "0.1.0", requirementIds: [new RequirementId("req-1")], proposedBy: "release-manager" });

  assert.equal(release.statusValue(), ReleaseStatus.Draft);
  assert.deepEqual(release.auditTrailValue().map((entry) => entry.action), ["Proposed"]);
});

test("a release cannot be approved by whoever proposed it", () => {
  const release = Release.create({ id: new ReleaseId("release-2"), version: "0.1.0", requirementIds: [new RequirementId("req-1")], proposedBy: "release-manager" });

  assert.throws(() => release.approve("release-manager"), SeparationOfDutiesError);
});

test("approval and rejection are only valid from Draft, and both extend the audit trail", () => {
  const release = Release.create({ id: new ReleaseId("release-3"), version: "0.1.0", requirementIds: [new RequirementId("req-1")], proposedBy: "release-manager" });

  release.approve("release-approver");
  assert.equal(release.statusValue(), ReleaseStatus.Approved);
  assert.deepEqual(release.auditTrailValue().map((entry) => entry.action), ["Proposed", "Approved"]);
  assert.throws(() => release.approve("release-approver"), InvalidStateTransitionError);
  assert.throws(() => release.reject("release-approver"), InvalidStateTransitionError);
});

test("a rejected release records who rejected it", () => {
  const release = Release.create({ id: new ReleaseId("release-4"), version: "0.1.0", requirementIds: [new RequirementId("req-1")], proposedBy: "release-manager" });

  release.reject("release-approver");
  const [, rejection] = release.auditTrailValue();
  assert.equal(release.statusValue(), ReleaseStatus.Rejected);
  assert.equal(rejection?.action, "Rejected");
  assert.equal(rejection?.actor, "release-approver");
});
