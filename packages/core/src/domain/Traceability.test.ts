import assert from "node:assert/strict";
import test from "node:test";
import { ValidationError } from "../errors/ValidationError.js";
import { RequirementId, WorkOrderId } from "../value-objects/Ids.js";
import { TraceabilityGraph } from "./Traceability.js";

test("traceability graph identifies requirements without a link", () => {
  const graph = new TraceabilityGraph();
  const linked = new RequirementId("req-1");
  const unlinked = new RequirementId("req-2");
  graph.add({ requirementId: linked, workOrderId: new WorkOrderId("wo-1") });

  assert.deepEqual(graph.unlinkedRequirements([linked, unlinked]), [unlinked]);
  assert.throws(() => graph.add({ requirementId: unlinked }), ValidationError);
});
