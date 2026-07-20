import { AggregateRoot } from "./AggregateRoot.js";
import { Requirement } from "./Requirement.js";
import { WorkOrder } from "./WorkOrder.js";

export class Project extends AggregateRoot<string> {
  private readonly requirements: Requirement[] = [];
  private readonly workOrders: WorkOrder[] = [];

  constructor(
    id: string,
    public readonly name: string
  ) {
    super(id);
  }

  addRequirement(requirement: Requirement): void {
    this.requirements.push(requirement);
  }

  createWorkOrder(
    id: string,
    title: string,
    description: string
  ): WorkOrder {
    const workOrder = new WorkOrder(id, title, description);

    this.workOrders.push(workOrder);

    return workOrder;
  }

  getRequirements(): Requirement[] {
    return [...this.requirements];
  }

  getWorkOrders(): WorkOrder[] {
    return [...this.workOrders];
  }
}
