import assert from "node:assert/strict";
import test from "node:test";
import { InvalidStateTransitionError } from "../errors/InvalidStateTransitionError.js";
import { RequirementId, WorkOrderId } from "../value-objects/Ids.js";
import { WorkOrderStatus } from "../value-objects/WorkOrderStatus.js";
import { WorkOrder } from "./WorkOrder.js";

const createWorkOrder = () => WorkOrder.create({
  id: new WorkOrderId("wo-1"),
  title: "Implement core domain",
  description: "Implement the foundation.",
  requirementIds: [new RequirementId("req-1")],
  acceptanceCriteria: ["Lifecycle is enforced"],
});

test("work order follows the controlled approval lifecycle", () => {
  const workOrder = createWorkOrder();

  workOrder.markReady();
  workOrder.start();
  workOrder.submitForReview();
  workOrder.approve();

  assert.equal(workOrder.statusValue(), WorkOrderStatus.Completed);
});

test("work order cannot bypass review or reopen from a terminal state", () => {
  const workOrder = createWorkOrder();

  assert.throws(() => workOrder.approve(), InvalidStateTransitionError);
  workOrder.markReady();
  workOrder.start();
  assert.throws(() => workOrder.approve(), InvalidStateTransitionError);
  workOrder.submitForReview();
  workOrder.approve();
  assert.throws(() => workOrder.markReady(), InvalidStateTransitionError);
});

test("a blocked work order resumes to its prior active state", () => {
  const workOrder = createWorkOrder();
  workOrder.markReady();
  workOrder.start();
  workOrder.block();

  assert.equal(workOrder.statusValue(), WorkOrderStatus.Blocked);
  workOrder.resume();
  assert.equal(workOrder.statusValue(), WorkOrderStatus.InProgress);
});
