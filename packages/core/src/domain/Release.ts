import { ValidationError } from "../errors/ValidationError.js";
import { ReleaseId } from "../value-objects/Ids.js";
import { AggregateRoot } from "./AggregateRoot.js";

export interface ReleaseSnapshot { id: string; version: string; createdAt: string; }

export class Release extends AggregateRoot<ReleaseId> {
  private constructor(id: ReleaseId, public readonly version: string, public readonly createdAt: Date) { super(id); }
  static create(input: { id: ReleaseId; version: string; createdAt?: Date }): Release {
    const version = input.version.trim();
    if (!version) throw new ValidationError("A release needs a version.");
    return new Release(input.id, version, input.createdAt ?? new Date());
  }
  static rehydrate(snapshot: ReleaseSnapshot): Release { return Release.create({ id: new ReleaseId(snapshot.id), version: snapshot.version, createdAt: new Date(snapshot.createdAt) }); }
  toSnapshot(): ReleaseSnapshot { return { id: this.id.value, version: this.version, createdAt: this.createdAt.toISOString() }; }
}
