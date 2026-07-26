import { InvalidStateTransitionError } from "../errors/InvalidStateTransitionError.js";
import { ValidationError } from "../errors/ValidationError.js";
import { AdrId, RequirementId } from "../value-objects/Ids.js";
import { AggregateRoot } from "./AggregateRoot.js";

export enum AdrStatus {
  Proposed = "Proposed",
  Accepted = "Accepted",
  Rejected = "Rejected",
  Deprecated = "Deprecated",
  Superseded = "Superseded",
}

export interface CreateAdrInput {
  id: AdrId;
  title: string;
  context: string;
  decision: string;
  consequences: string;
  requirementIds: readonly RequirementId[];
  createdAt?: Date;
}

export interface AdrSnapshot {
  id: string;
  title: string;
  context: string;
  decision: string;
  consequences: string;
  requirementIds: readonly string[];
  status: AdrStatus;
  createdAt: string;
  supersededBy?: string;
}

export class ArchitectureDecisionRecord extends AggregateRoot<AdrId> {
  private status = AdrStatus.Proposed;
  public readonly createdAt: Date;
  private supersededBy?: AdrId;

  private constructor(
    id: AdrId,
    public readonly title: string,
    public readonly context: string,
    public readonly decision: string,
    public readonly consequences: string,
    public readonly requirementIds: readonly RequirementId[],
    createdAt: Date,
  ) {
    super(id);
    this.createdAt = createdAt;
  }

  static create(input: CreateAdrInput): ArchitectureDecisionRecord {
    const fields = [input.title, input.context, input.decision, input.consequences].map((field) => field.trim());
    if (fields.some((field) => !field)) {
      throw new ValidationError("An ADR needs a title, context, decision, and consequences.");
    }
    if (!input.requirementIds.length) {
      throw new ValidationError("An ADR must reference at least one requirement.");
    }
    return new ArchitectureDecisionRecord(input.id, fields[0], fields[1], fields[2], fields[3], input.requirementIds, input.createdAt ?? new Date());
  }

  static rehydrate(snapshot: AdrSnapshot): ArchitectureDecisionRecord {
    const adr = ArchitectureDecisionRecord.create({ id: new AdrId(snapshot.id), title: snapshot.title, context: snapshot.context,
      decision: snapshot.decision, consequences: snapshot.consequences, requirementIds: snapshot.requirementIds.map((id) => new RequirementId(id)),
      createdAt: new Date(snapshot.createdAt) });
    adr.status = snapshot.status;
    adr.supersededBy = snapshot.supersededBy ? new AdrId(snapshot.supersededBy) : undefined;
    return adr;
  }

  toSnapshot(): AdrSnapshot {
    return { id: this.id.value, title: this.title, context: this.context, decision: this.decision, consequences: this.consequences,
      requirementIds: this.requirementIds.map(String), status: this.status, createdAt: this.createdAt.toISOString(), supersededBy: this.supersededBy?.value };
  }

  accept(): void {
    this.transition(AdrStatus.Proposed, AdrStatus.Accepted);
  }

  reject(): void {
    this.transition(AdrStatus.Proposed, AdrStatus.Rejected);
  }

  deprecate(): void {
    this.transition(AdrStatus.Accepted, AdrStatus.Deprecated);
  }

  supersede(by: AdrId): void {
    this.transition(AdrStatus.Accepted, AdrStatus.Superseded);
    this.supersededBy = by;
  }

  statusValue(): AdrStatus {
    return this.status;
  }

  supersededByValue(): AdrId | undefined {
    return this.supersededBy;
  }

  private transition(from: AdrStatus, to: AdrStatus): void {
    if (this.status !== from) {
      throw new InvalidStateTransitionError("ArchitectureDecisionRecord", this.status, to);
    }
    this.status = to;
  }
}
