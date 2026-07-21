import { AggregateRoot } from "./AggregateRoot.js";
import { DuplicateRequirementError } from "../errors/DuplicateRequirementError.js";
import { MissingRequirementError } from "../errors/MissingRequirementError.js";
import { ProjectId, RequirementId, WorkOrderId } from "../value-objects/Ids.js";
import { Requirement } from "./Requirement.js";
import { WorkOrder } from "./WorkOrder.js";

export class Project extends AggregateRoot<ProjectId> {
  private readonly requirements: Requirement[] = [];
  private readonly workOrders: WorkOrder[] = [];

  constructor(
    id: ProjectId,
    public readonly name: string
  ) {
    super(id);
  }

  addRequirement(requirement: Requirement): void {
    if (this.requirements.some((existing) => existing.id.equals(requirement.id))) {
      throw new DuplicateRequirementError(requirement.id.toString());
    }
    this.requirements.push(requirement);
  }

  createWorkOrder(input: {
    id: WorkOrderId;
    title: string;
    description: string;
    requirementIds: readonly RequirementId[];
  }): WorkOrder {
    for (const requirementId of input.requirementIds) {
      if (!this.requirements.some((requirement) => requirement.id.equals(requirementId))) {
        throw new MissingRequirementError(requirementId.toString());
      }
    }

    const workOrder = WorkOrder.create(input);

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
