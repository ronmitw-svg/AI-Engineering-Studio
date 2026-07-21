import { InvalidStateTransitionError } from "../errors/InvalidStateTransitionError.js";
import { ValidationError } from "../errors/ValidationError.js";
import { ReviewId, WorkOrderId } from "../value-objects/Ids.js";
import { AggregateRoot } from "./AggregateRoot.js";

export enum ReviewStatus {
  Pending = "Pending",
  InReview = "InReview",
  Approved = "Approved",
  ChangesRequested = "ChangesRequested",
  Rejected = "Rejected",
}

export class Review extends AggregateRoot<ReviewId> {
  private status = ReviewStatus.Pending;
  private readonly findings: string[] = [];
  private completedAt?: Date;

  private constructor(
    id: ReviewId,
    public readonly target: WorkOrderId,
    public readonly reviewer: string,
    public readonly createdAt: Date,
  ) {
    super(id);
  }

  static create(input: { id: ReviewId; target: WorkOrderId; reviewer: string; createdAt?: Date }): Review {
    const reviewer = input.reviewer.trim();
    if (!reviewer) {
      throw new ValidationError("A review must have a reviewer.");
    }
    return new Review(input.id, input.target, reviewer, input.createdAt ?? new Date());
  }

  start(): void {
    this.transition(ReviewStatus.Pending, ReviewStatus.InReview);
  }

  addFinding(finding: string): void {
    if (this.status !== ReviewStatus.InReview) {
      throw new InvalidStateTransitionError("Review", this.status, "finding added");
    }
    const normalized = finding.trim();
    if (!normalized) throw new ValidationError("A review finding must not be empty.");
    this.findings.push(normalized);
  }

  approve(at = new Date()): void {
    this.complete(ReviewStatus.Approved, at);
  }

  requestChanges(at = new Date()): void {
    this.complete(ReviewStatus.ChangesRequested, at);
  }

  reject(at = new Date()): void {
    this.complete(ReviewStatus.Rejected, at);
  }

  statusValue(): ReviewStatus {
    return this.status;
  }

  findingsValue(): readonly string[] {
    return [...this.findings];
  }

  completedAtValue(): Date | undefined {
    return this.completedAt && new Date(this.completedAt);
  }

  private complete(status: ReviewStatus, at: Date): void {
    this.transition(ReviewStatus.InReview, status);
    this.completedAt = at;
  }

  private transition(from: ReviewStatus, to: ReviewStatus | string): void {
    if (this.status !== from) {
      throw new InvalidStateTransitionError("Review", this.status, to);
    }
    if (Object.values(ReviewStatus).includes(to as ReviewStatus)) {
      this.status = to as ReviewStatus;
    }
  }
}
