import { DomainError } from "../errors/DomainError.js";

export class WorkOrderNotFoundError extends DomainError {
  constructor(workOrderId: string) {
    super(`Work order ${workOrderId} was not found.`);
  }
}
