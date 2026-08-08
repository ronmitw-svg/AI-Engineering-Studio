import { InvalidStateTransitionError } from "../errors/InvalidStateTransitionError.js";
import { SeparationOfDutiesError } from "../errors/SeparationOfDutiesError.js";
import { ValidationError } from "../errors/ValidationError.js";
import { ReleaseId, RequirementId } from "../value-objects/Ids.js";
import { ReleaseStatus } from "../value-objects/ReleaseStatus.js";
import { AggregateRoot } from "./AggregateRoot.js";

export interface ReleaseAuditEntry {
  readonly action: string;
  readonly actor: string;
  readonly at: string;
}

export interface ReleaseSnapshot {
  id: string;
  version: string;
  requirementIds: readonly string[];
  proposedBy: string;
  status: ReleaseStatus;
  auditTrail: readonly ReleaseAuditEntry[];
  createdAt: string;
}

export class Release extends AggregateRoot<ReleaseId> {
  private status = ReleaseStatus.Draft;
  private readonly auditTrail: ReleaseAuditEntry[] = [];

  private constructor(
    id: ReleaseId,
    public readonly version: string,
    public readonly requirementIds: readonly RequirementId[],
    public readonly proposedBy: string,
    public readonly createdAt: Date,
  ) {
    super(id);
  }

  static create(input: { id: ReleaseId; version: string; requirementIds: readonly RequirementId[]; proposedBy: string; createdAt?: Date }): Release {
    const version = input.version.trim();
    const proposedBy = input.proposedBy.trim();
    if (!version) throw new ValidationError("A release needs a version.");
    if (!proposedBy) throw new ValidationError("A release needs to record who proposed it.");
    const release = new Release(input.id, version, input.requirementIds, proposedBy, input.createdAt ?? new Date());
    release.auditTrail.push({ action: "Proposed", actor: proposedBy, at: release.createdAt.toISOString() });
    return release;
  }

  static rehydrate(snapshot: ReleaseSnapshot): Release {
    const release = Release.create({ id: new ReleaseId(snapshot.id), version: snapshot.version,
      requirementIds: (snapshot.requirementIds ?? []).map((id) => new RequirementId(id)), proposedBy: snapshot.proposedBy ?? "",
      createdAt: new Date(snapshot.createdAt) });
    release.status = snapshot.status;
    release.auditTrail.length = 0;
    release.auditTrail.push(...(snapshot.auditTrail ?? []));
    return release;
  }

  toSnapshot(): ReleaseSnapshot {
    return { id: this.id.value, version: this.version, requirementIds: this.requirementIds.map(String), proposedBy: this.proposedBy,
      status: this.status, auditTrail: [...this.auditTrail], createdAt: this.createdAt.toISOString() };
  }

  approve(approvedBy: string, at = new Date()): void {
    const actor = approvedBy.trim();
    if (!actor) throw new ValidationError("A release approval needs an approver.");
    if (this.status !== ReleaseStatus.Draft) throw new InvalidStateTransitionError("Release", this.status, ReleaseStatus.Approved);
    if (actor === this.proposedBy) throw new SeparationOfDutiesError(actor, "approve");
    this.status = ReleaseStatus.Approved;
    this.auditTrail.push({ action: "Approved", actor, at: at.toISOString() });
  }

  reject(rejectedBy: string, at = new Date()): void {
    const actor = rejectedBy.trim();
    if (!actor) throw new ValidationError("A release rejection needs a rejecter.");
    if (this.status !== ReleaseStatus.Draft) throw new InvalidStateTransitionError("Release", this.status, ReleaseStatus.Rejected);
    this.status = ReleaseStatus.Rejected;
    this.auditTrail.push({ action: "Rejected", actor, at: at.toISOString() });
  }

  statusValue(): ReleaseStatus {
    return this.status;
  }

  auditTrailValue(): readonly ReleaseAuditEntry[] {
    return [...this.auditTrail];
  }
}
