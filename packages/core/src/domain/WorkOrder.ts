import { AggregateRoot } from "./AggregateRoot.js";
import { InvalidStateTransitionError } from "../errors/InvalidStateTransitionError.js";
import { ValidationError } from "../errors/ValidationError.js";
import { RequirementId, WorkOrderId } from "../value-objects/Ids.js";
import { WorkOrderStatus } from "../value-objects/WorkOrderStatus.js";

export interface CreateWorkOrderInput {
  id: WorkOrderId;
  title: string;
  description: string;
  requirementIds: readonly RequirementId[];
  dependencies?: readonly WorkOrderId[];
  acceptanceCriteria?: readonly string[];
  assignedAgent?: string;
}

export interface WorkOrderSnapshot {
  id: string;
  title: string;
  description: string;
  requirementIds: readonly string[];
  dependencies: readonly string[];
  acceptanceCriteria: readonly string[];
  assignedAgent?: string;
  status: WorkOrderStatus;
  blockedFrom?: WorkOrderStatus;
}

export class WorkOrder extends AggregateRoot<WorkOrderId> {
  private status = WorkOrderStatus.Planned;
  private blockedFrom?: WorkOrderStatus;
  public readonly dependencies: readonly WorkOrderId[];
  public readonly acceptanceCriteria: readonly string[];
  public readonly assignedAgent?: string;

  private constructor(
    id: WorkOrderId,
    public readonly title: string,
    public readonly description: string,
    public readonly requirementIds: readonly RequirementId[],
    dependencies: readonly WorkOrderId[],
    acceptanceCriteria: readonly string[],
    assignedAgent?: string,
  ) {
    super(id);
    this.dependencies = dependencies;
    this.acceptanceCriteria = acceptanceCriteria;
    this.assignedAgent = assignedAgent;
  }

  static create(input: CreateWorkOrderInput): WorkOrder {
    const title = input.title.trim();
    const description = input.description.trim();
    if (!title || !description) {
      throw new ValidationError("A work order needs a title and description.");
    }
    if (!input.requirementIds.length) {
      throw new ValidationError("A work order must reference at least one requirement.");
    }

    return new WorkOrder(
      input.id,
      title,
      description,
      input.requirementIds,
      input.dependencies ?? [],
      input.acceptanceCriteria ?? [],
      input.assignedAgent?.trim() || undefined,
    );
  }

  static rehydrate(snapshot: WorkOrderSnapshot): WorkOrder {
    const workOrder = WorkOrder.create({ id: new WorkOrderId(snapshot.id), title: snapshot.title, description: snapshot.description,
      requirementIds: snapshot.requirementIds.map((id) => new RequirementId(id)), dependencies: snapshot.dependencies.map((id) => new WorkOrderId(id)),
      acceptanceCriteria: snapshot.acceptanceCriteria, assignedAgent: snapshot.assignedAgent });
    workOrder.status = snapshot.status;
    workOrder.blockedFrom = snapshot.blockedFrom;
    return workOrder;
  }

  toSnapshot(): WorkOrderSnapshot {
    return { id: this.id.value, title: this.title, description: this.description, requirementIds: this.requirementIds.map(String),
      dependencies: this.dependencies.map(String), acceptanceCriteria: this.acceptanceCriteria, assignedAgent: this.assignedAgent,
      status: this.status, blockedFrom: this.blockedFrom };
  }

  start(): void {
    this.transition(WorkOrderStatus.Ready, WorkOrderStatus.InProgress);
  }

  submitForReview(): void {
    this.transition(WorkOrderStatus.InProgress, WorkOrderStatus.Review);
  }

  approve(): void {
    this.transition(WorkOrderStatus.Review, WorkOrderStatus.Completed);
  }

  markReady(): void {
    this.transition(WorkOrderStatus.Planned, WorkOrderStatus.Ready);
  }

  block(): void {
    if (![WorkOrderStatus.Ready, WorkOrderStatus.InProgress, WorkOrderStatus.Review].includes(this.status)) {
      throw new InvalidStateTransitionError("WorkOrder", this.status, WorkOrderStatus.Blocked);
    }
    this.blockedFrom = this.status;
    this.status = WorkOrderStatus.Blocked;
  }

  resume(): void {
    if (this.status !== WorkOrderStatus.Blocked || !this.blockedFrom) {
      throw new InvalidStateTransitionError("WorkOrder", this.status, "resumed state");
    }
    this.status = this.blockedFrom;
    this.blockedFrom = undefined;
  }

  cancel(): void {
    if ([WorkOrderStatus.Completed, WorkOrderStatus.Cancelled].includes(this.status)) {
      throw new InvalidStateTransitionError("WorkOrder", this.status, WorkOrderStatus.Cancelled);
    }
    this.status = WorkOrderStatus.Cancelled;
  }

  statusValue(): WorkOrderStatus {
    return this.status;
  }

  private transition(from: WorkOrderStatus, to: WorkOrderStatus): void {
    if (this.status !== from) {
      throw new InvalidStateTransitionError("WorkOrder", this.status, to);
    }
    this.status = to;
  }
}
