import { ValidationError } from "../errors/ValidationError.js";
import { ReleaseId, RequirementId } from "../value-objects/Ids.js";
import { AggregateRoot } from "./AggregateRoot.js";

export interface ReleaseSnapshot { id: string; version: string; requirementIds: readonly string[]; createdAt: string; }

export class Release extends AggregateRoot<ReleaseId> {
  private constructor(id: ReleaseId, public readonly version: string, public readonly requirementIds: readonly RequirementId[], public readonly createdAt: Date) { super(id); }
  static create(input: { id: ReleaseId; version: string; requirementIds: readonly RequirementId[]; createdAt?: Date }): Release {
    const version = input.version.trim();
    if (!version) throw new ValidationError("A release needs a version.");
    return new Release(input.id, version, input.requirementIds, input.createdAt ?? new Date());
  }
  static rehydrate(snapshot: ReleaseSnapshot): Release {
    return Release.create({ id: new ReleaseId(snapshot.id), version: snapshot.version,
      requirementIds: (snapshot.requirementIds ?? []).map((id) => new RequirementId(id)), createdAt: new Date(snapshot.createdAt) });
  }
  toSnapshot(): ReleaseSnapshot { return { id: this.id.value, version: this.version, requirementIds: this.requirementIds.map(String), createdAt: this.createdAt.toISOString() }; }
}
