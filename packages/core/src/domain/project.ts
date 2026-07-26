import { AggregateRoot } from "./AggregateRoot.js";
import { DuplicateRequirementError } from "../errors/DuplicateRequirementError.js";
import { MissingRequirementError } from "../errors/MissingRequirementError.js";
import { ValidationError } from "../errors/ValidationError.js";
import { ProjectId, RequirementId, ReviewId, WorkOrderId } from "../value-objects/Ids.js";
import { Requirement } from "./Requirement.js";
import { WorkOrder } from "./WorkOrder.js";
import type { CreateWorkOrderInput, WorkOrderSnapshot } from "./WorkOrder.js";
import type { RequirementSnapshot } from "./Requirement.js";
import { ArchitectureDecisionRecord, type AdrSnapshot, type CreateAdrInput } from "./ArchitectureDecisionRecord.js";
import { Stakeholder, type StakeholderSnapshot } from "./Stakeholder.js";
import { Review, type ReviewSnapshot } from "./Review.js";
import { Release, type ReleaseSnapshot } from "./Release.js";

export interface ProjectSnapshot {
  schemaVersion: 1;
  id: string;
  name: string;
  requirements: readonly RequirementSnapshot[];
  workOrders: readonly WorkOrderSnapshot[];
  adrs: readonly AdrSnapshot[];
  stakeholders: readonly StakeholderSnapshot[];
  reviews: readonly ReviewSnapshot[];
  releases: readonly ReleaseSnapshot[];
}

export class Project extends AggregateRoot<ProjectId> {
  private readonly requirements: Requirement[] = [];
  private readonly workOrders: WorkOrder[] = [];
  private readonly adrs: ArchitectureDecisionRecord[] = [];
  private readonly stakeholders: Stakeholder[] = [];
  private readonly reviews: Review[] = [];
  private readonly releases: Release[] = [];

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
    for (const review of snapshot.reviews ?? []) project.reviews.push(Review.rehydrate(review));
    for (const release of snapshot.releases ?? []) project.releases.push(Release.rehydrate(release));
    return project;
  }

  toSnapshot(): ProjectSnapshot {
    return { schemaVersion: 1, id: this.id.value, name: this.name,
      requirements: this.requirements.map((requirement) => requirement.toSnapshot()),
      workOrders: this.workOrders.map((workOrder) => workOrder.toSnapshot()), adrs: this.adrs.map((adr) => adr.toSnapshot()),
      stakeholders: this.stakeholders.map((stakeholder) => stakeholder.toSnapshot()), reviews: this.reviews.map((review) => review.toSnapshot()),
      releases: this.releases.map((release) => release.toSnapshot()) };
  }

  addAdr(adr: ArchitectureDecisionRecord): void { this.adrs.push(adr); }
  getAdrs(): ArchitectureDecisionRecord[] { return [...this.adrs]; }

  createAdr(input: CreateAdrInput): ArchitectureDecisionRecord {
    for (const requirementId of input.requirementIds) {
      if (!this.requirements.some((requirement) => requirement.id.equals(requirementId))) {
        throw new MissingRequirementError(requirementId.toString());
      }
    }

    const adr = ArchitectureDecisionRecord.create(input);

    this.adrs.push(adr);

    return adr;
  }
  addStakeholder(stakeholder: Stakeholder): void { this.stakeholders.push(stakeholder); }
  getStakeholders(): Stakeholder[] { return [...this.stakeholders]; }
  addReview(review: Review): void { this.reviews.push(review); }
  getReviews(): Review[] { return [...this.reviews]; }
  findReview(id: ReviewId): Review | undefined { return this.reviews.find((review) => review.id.equals(id)); }
  addRelease(release: Release): void { this.releases.push(release); }
  getReleases(): Release[] { return [...this.releases]; }

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
