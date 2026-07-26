import assert from "node:assert/strict";
import test from "node:test";
import { Entity } from "./Entity.js";
import { ProjectId } from "../value-objects/Ids.js";
import { ValidationError } from "../errors/ValidationError.js";

class TestEntity extends Entity<ProjectId> {
  constructor(id: ProjectId) {
    super(id);
  }
}

test("entities with equal typed identifiers are equal", () => {
  const left = new TestEntity(new ProjectId("project-1"));
  const right = new TestEntity(new ProjectId("project-1"));

  assert.equal(left.equals(right), true);
});

test("identifiers reject filesystem path characters", () => {
  assert.throws(() => new ProjectId("../../tmp/evil"), ValidationError);
  assert.throws(() => new ProjectId("project.name"), ValidationError);
});
