import { AggregateRoot } from "./AggregateRoot.js";
import { DuplicateRequirementError } from "../errors/DuplicateRequirementError.js";
import { MissingRequirementError } from "../errors/MissingRequirementError.js";
import { ValidationError } from "../errors/ValidationError.js";
import { ProjectId, RequirementId, WorkOrderId } from "../value-objects/Ids.js";
import { Requirement } from "./Requirement.js";
import { WorkOrder } from "./WorkOrder.js";
import type { CreateWorkOrderInput, WorkOrderSnapshot } from "./WorkOrder.js";
import type { RequirementSnapshot } from "./Requirement.js";
import { ArchitectureDecisionRecord, type AdrSnapshot } from "./ArchitectureDecisionRecord.js";
import { Stakeholder, type StakeholderSnapshot } from "./Stakeholder.js";

export interface ProjectSnapshot {
  schemaVersion: 1;
  id: string;
  name: string;
  requirements: readonly RequirementSnapshot[];
  workOrders: readonly WorkOrderSnapshot[];
  adrs: readonly AdrSnapshot[];
  stakeholders: readonly StakeholderSnapshot[];
}

export class Project extends AggregateRoot<ProjectId> {
  private readonly requirements: Requirement[] = [];
  private readonly workOrders: WorkOrder[] = [];
  private readonly adrs: ArchitectureDecisionRecord[] = [];
  private readonly stakeholders: Stakeholder[] = [];

  constructor(
    id: ProjectId,
    public readonly name: string
  ) {
    super(id);
  }

  static create(input: { id: ProjectId; name: string }): Project {
    const name = input.name.trim();
    if (!name) {
      throw new ValidationError("A project needs a name.");
    }
    return new Project(input.id, name);
  }

  static rehydrate(snapshot: ProjectSnapshot): Project {
    const project = Project.create({ id: new ProjectId(snapshot.id), name: snapshot.name });
    for (const requirement of snapshot.requirements) project.addRequirement(Requirement.rehydrate(requirement));
    for (const workOrder of snapshot.workOrders) project.workOrders.push(WorkOrder.rehydrate(workOrder));
    for (const adr of snapshot.adrs ?? []) project.adrs.push(ArchitectureDecisionRecord.rehydrate(adr));
    for (const stakeholder of snapshot.stakeholders ?? []) project.stakeholders.push(Stakeholder.rehydrate(stakeholder));
    return project;
  }

  toSnapshot(): ProjectSnapshot {
    return { schemaVersion: 1, id: this.id.value, name: this.name,
      requirements: this.requirements.map((requirement) => requirement.toSnapshot()),
      workOrders: this.workOrders.map((workOrder) => workOrder.toSnapshot()), adrs: this.adrs.map((adr) => adr.toSnapshot()),
      stakeholders: this.stakeholders.map((stakeholder) => stakeholder.toSnapshot()) };
  }

  addAdr(adr: ArchitectureDecisionRecord): void { this.adrs.push(adr); }
  getAdrs(): ArchitectureDecisionRecord[] { return [...this.adrs]; }
  addStakeholder(stakeholder: Stakeholder): void { this.stakeholders.push(stakeholder); }
  getStakeholders(): Stakeholder[] { return [...this.stakeholders]; }

  addRequirement(requirement: Requirement): void {
    if (this.requirements.some((existing) => existing.id.equals(requirement.id))) {
      throw new DuplicateRequirementError(requirement.id.toString());
    }
    this.requirements.push(requirement);
  }

  createWorkOrder(input: CreateWorkOrderInput): WorkOrder {
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

  findWorkOrder(id: WorkOrderId): WorkOrder | undefined {
    return this.workOrders.find((workOrder) => workOrder.id.equals(id));
  }
}
