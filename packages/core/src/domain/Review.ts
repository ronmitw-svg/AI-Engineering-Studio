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

export interface ReviewSnapshot {
  id: string;
  target: string;
  reviewer: string;
  status: ReviewStatus;
  findings: readonly string[];
  createdAt: string;
  completedAt?: string;
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

  static rehydrate(snapshot: ReviewSnapshot): Review {
    const review = Review.create({ id: new ReviewId(snapshot.id), target: new WorkOrderId(snapshot.target), reviewer: snapshot.reviewer, createdAt: new Date(snapshot.createdAt) });
    review.status = snapshot.status;
    review.findings.push(...snapshot.findings);
    review.completedAt = snapshot.completedAt ? new Date(snapshot.completedAt) : undefined;
    return review;
  }

  toSnapshot(): ReviewSnapshot {
    return { id: this.id.value, target: this.target.value, reviewer: this.reviewer, status: this.status, findings: this.findings,
      createdAt: this.createdAt.toISOString(), completedAt: this.completedAt?.toISOString() };
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
