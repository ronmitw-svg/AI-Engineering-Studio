import assert from "node:assert/strict";
import test from "node:test";
import { InvalidStateTransitionError } from "../errors/InvalidStateTransitionError.js";
import { ReviewId, WorkOrderId } from "../value-objects/Ids.js";
import { Review, ReviewStatus } from "./Review.js";

test("review captures findings only while under review", () => {
  const review = Review.create({
    id: new ReviewId("review-1"),
    target: new WorkOrderId("wo-1"),
    reviewer: "qa-agent",
  });

  assert.throws(() => review.addFinding("Missing test"), InvalidStateTransitionError);
  review.start();
  review.addFinding("Missing test");
  review.requestChanges();

  assert.deepEqual(review.findingsValue(), ["Missing test"]);
  assert.equal(review.statusValue(), ReviewStatus.ChangesRequested);
});
