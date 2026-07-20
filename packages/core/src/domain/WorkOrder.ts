import { AggregateRoot } from "./AggregateRoot.js";
import { WorkOrderStatus } from "../value-objects/WorkOrderStatus.js";

export class WorkOrder extends AggregateRoot<string> {
  private status = WorkOrderStatus.Planned;

  constructor(
    id: string,
    public readonly title: string,
    public readonly description: string
  ) {
    super(id);
  }

  start(): void {
    if (this.status !== WorkOrderStatus.Ready) {
      throw new Error("Work Order is not ready.");
    }

    this.status = WorkOrderStatus.InProgress;
  }

  complete(): void {
    if (this.status !== WorkOrderStatus.InProgress) {
      throw new Error("Work Order not running.");
    }

    this.status = WorkOrderStatus.Completed;
  }

  approve(): void {
    if (this.status !== WorkOrderStatus.Review) {
      throw new Error("Review required.");
    }

    this.status = WorkOrderStatus.Completed;
  }

  markReady(): void {
    this.status = WorkOrderStatus.Ready;
  }

  statusValue(): WorkOrderStatus {
    return this.status;
  }
}
