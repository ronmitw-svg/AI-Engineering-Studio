import { Project } from "../domain/project.js";
import { Requirement, type CreateRequirementInput } from "../domain/Requirement.js";
import { type CreateWorkOrderInput, WorkOrder } from "../domain/WorkOrder.js";
import { ProjectRepository } from "../repositories/ProjectRepository.js";
import { AdrId, ProjectId, ReleaseId, ReviewId, WorkOrderId } from "../value-objects/Ids.js";
import { AdrNotFoundError } from "./AdrNotFoundError.js";
import { ProjectNotFoundError } from "./ProjectNotFoundError.js";
import { ArchitectureDecisionRecord, type CreateAdrInput } from "../domain/ArchitectureDecisionRecord.js";
import { Stakeholder, type CreateStakeholderInput } from "../domain/Stakeholder.js";
import { Review, ReviewStatus } from "../domain/Review.js";
import { Release } from "../domain/Release.js";
import { WorkOrderStatus } from "../value-objects/WorkOrderStatus.js";
import { ReleaseNotFoundError } from "./ReleaseNotFoundError.js";
import { ReleaseNotReadyError } from "./ReleaseNotReadyError.js";
import { WorkOrderNotFoundError } from "./WorkOrderNotFoundError.js";

export class CreateProject {
  constructor(private readonly projects: ProjectRepository) {}

  async execute(input: { id: ProjectId; name: string }): Promise<Project> {
    const project = Project.create(input);
    await this.projects.save(project);
    return project;
  }
}

export class CreateRequirement {
  constructor(private readonly projects: ProjectRepository) {}

  async execute(input: CreateRequirementInput & { projectId: ProjectId }): Promise<Requirement> {
    const project = await this.requireProject(input.projectId);
    const requirement = Requirement.create(input);
    project.addRequirement(requirement);
    await this.projects.save(project);
    return requirement;
  }

  private async requireProject(id: ProjectId): Promise<Project> {
    const project = await this.projects.findById(id);
    if (!project) throw new ProjectNotFoundError(id.toString());
    return project;
  }
}

export class CreateWorkOrder {
  constructor(private readonly projects: ProjectRepository) {}

  async execute(input: CreateWorkOrderInput & { projectId: ProjectId }): Promise<WorkOrder> {
    const project = await this.requireProject(input.projectId);
    const workOrder = project.createWorkOrder(input);
    await this.projects.save(project);
    return workOrder;
  }

  private async requireProject(id: ProjectId): Promise<Project> {
    const project = await this.projects.findById(id);
    if (!project) throw new ProjectNotFoundError(id.toString());
    return project;
  }
}

export class CreateAdr {
  constructor(private readonly projects: ProjectRepository) {}

  async execute(input: CreateAdrInput & { projectId: ProjectId }): Promise<ArchitectureDecisionRecord> {
    const project = await this.projects.findById(input.projectId);
    if (!project) throw new ProjectNotFoundError(input.projectId.toString());
    const adr = project.createAdr(input);
    await this.projects.save(project);
    return adr;
  }
}

export class CreateStakeholder {
  constructor(private readonly projects: ProjectRepository) {}

  async execute(input: CreateStakeholderInput & { projectId: ProjectId }): Promise<Stakeholder> {
    const project = await this.projects.findById(input.projectId);
    if (!project) throw new ProjectNotFoundError(input.projectId.toString());
    const stakeholder = Stakeholder.create(input);
    project.addStakeholder(stakeholder);
    await this.projects.save(project);
    return stakeholder;
  }
}

export class CreateReview {
  constructor(private readonly projects: ProjectRepository) {}

  async execute(input: { projectId: ProjectId; id: ReviewId; target: WorkOrderId; reviewer: string }): Promise<Review> {
    const project = await this.projects.findById(input.projectId);
    if (!project) throw new ProjectNotFoundError(input.projectId.toString());
    if (!project.findWorkOrder(input.target)) throw new WorkOrderNotFoundError(input.target.toString());
    const review = Review.create(input);
    project.addReview(review);
    await this.projects.save(project);
    return review;
  }
}

export class CreateRelease {
  constructor(private readonly projects: ProjectRepository) {}
  async execute(input: { projectId: ProjectId; id: ReleaseId; version: string; proposedBy: string }): Promise<Release> {
    const project = await this.projects.findById(input.projectId);
    if (!project) throw new ProjectNotFoundError(input.projectId.toString());
    const linked = new Set(project.getWorkOrders().flatMap((workOrder) => workOrder.requirementIds.map((id) => id.value)));
    if (project.getRequirements().some((requirement) => !linked.has(requirement.id.value)) || project.getWorkOrders().some((workOrder) => workOrder.statusValue() !== WorkOrderStatus.Completed)) {
      throw new ReleaseNotReadyError(input.projectId.toString());
    }
    const release = Release.create({ ...input, requirementIds: project.getRequirements().map((requirement) => requirement.id) });
    project.addRelease(release);
    await this.projects.save(project);
    return release;
  }
}

export class ApproveRelease {
  constructor(private readonly projects: ProjectRepository) {}
  async execute(input: { projectId: ProjectId; releaseId: ReleaseId; approvedBy: string }): Promise<void> {
    const { project, release } = await findRelease(this.projects, input);
    release.approve(input.approvedBy);
    await this.projects.save(project);
  }
}

export class RejectRelease {
  constructor(private readonly projects: ProjectRepository) {}
  async execute(input: { projectId: ProjectId; releaseId: ReleaseId; rejectedBy: string }): Promise<void> {
    const { project, release } = await findRelease(this.projects, input);
    release.reject(input.rejectedBy);
    await this.projects.save(project);
  }
}

export class AcceptAdr {
  constructor(private readonly projects: ProjectRepository) {}
  async execute(input: { projectId: ProjectId; adrId: AdrId }): Promise<void> {
    const { project, adr } = await findAdr(this.projects, input);
    adr.accept();
    await this.projects.save(project);
  }
}

export class RejectAdr {
  constructor(private readonly projects: ProjectRepository) {}
  async execute(input: { projectId: ProjectId; adrId: AdrId }): Promise<void> {
    const { project, adr } = await findAdr(this.projects, input);
    adr.reject();
    await this.projects.save(project);
  }
}

export class StartReview {
  constructor(private readonly projects: ProjectRepository) {}
  async execute(input: { projectId: ProjectId; reviewId: ReviewId }): Promise<void> {
    const { project, review } = await findReview(this.projects, input);
    review.start();
    await this.projects.save(project);
  }
}

export class ApproveReview {
  constructor(private readonly projects: ProjectRepository) {}
  async execute(input: { projectId: ProjectId; reviewId: ReviewId }): Promise<void> {
    const { project, review } = await findReview(this.projects, input);
    review.approve();
    await this.projects.save(project);
  }
}

export class AddReviewFinding {
  constructor(private readonly projects: ProjectRepository) {}
  async execute(input: { projectId: ProjectId; reviewId: ReviewId; finding: string }): Promise<void> {
    const { project, review } = await findReview(this.projects, input);
    review.addFinding(input.finding);
    await this.projects.save(project);
  }
}

export class RequestReviewChanges {
  constructor(private readonly projects: ProjectRepository) {}
  async execute(input: { projectId: ProjectId; reviewId: ReviewId }): Promise<void> {
    const { project, review } = await findReview(this.projects, input);
    review.requestChanges();
    const workOrder = project.findWorkOrder(review.target);
    if (!workOrder) throw new WorkOrderNotFoundError(review.target.toString());
    workOrder.returnToInProgress();
    await this.projects.save(project);
  }
}

export class RejectReview {
  constructor(private readonly projects: ProjectRepository) {}
  async execute(input: { projectId: ProjectId; reviewId: ReviewId }): Promise<void> {
    const { project, review } = await findReview(this.projects, input);
    review.reject();
    const workOrder = project.findWorkOrder(review.target);
    if (!workOrder) throw new WorkOrderNotFoundError(review.target.toString());
    workOrder.block();
    await this.projects.save(project);
  }
}

export class StartWorkOrder {
  constructor(private readonly projects: ProjectRepository) {}

  async execute(input: { projectId: ProjectId; workOrderId: WorkOrderId }): Promise<void> {
    const project = await this.projects.findById(input.projectId);
    if (!project) throw new ProjectNotFoundError(input.projectId.toString());
    const workOrder = project.findWorkOrder(input.workOrderId);
    if (!workOrder) throw new WorkOrderNotFoundError(input.workOrderId.toString());
    workOrder.start();
    await this.projects.save(project);
  }
}

export class MarkWorkOrderReady {
  constructor(private readonly projects: ProjectRepository) {}

  async execute(input: { projectId: ProjectId; workOrderId: WorkOrderId }): Promise<void> {
    const { project, workOrder } = await findWorkOrder(this.projects, input);
    workOrder.markReady();
    await this.projects.save(project);
  }
}

export class SubmitWorkOrderForReview {
  constructor(private readonly projects: ProjectRepository) {}

  async execute(input: { projectId: ProjectId; workOrderId: WorkOrderId }): Promise<void> {
    const { project, workOrder } = await findWorkOrder(this.projects, input);
    workOrder.submitForReview();
    await this.projects.save(project);
  }
}

export class ApproveWorkOrder {
  constructor(private readonly projects: ProjectRepository) {}

  async execute(input: { projectId: ProjectId; workOrderId: WorkOrderId }): Promise<void> {
    const { project, workOrder } = await findWorkOrder(this.projects, input);
    if (!project.getReviews().some((review) => review.target.equals(workOrder.id) && review.statusValue() === ReviewStatus.Approved)) {
      throw new WorkOrderNotFoundError(`approved review for ${workOrder.id.toString()}`);
    }
    workOrder.approve();
    await this.projects.save(project);
  }
}

async function findReview(projects: ProjectRepository, input: { projectId: ProjectId; reviewId: ReviewId }): Promise<{ project: Project; review: Review }> {
  const project = await projects.findById(input.projectId);
  if (!project) throw new ProjectNotFoundError(input.projectId.toString());
  const review = project.findReview(input.reviewId);
  if (!review) throw new WorkOrderNotFoundError(`review ${input.reviewId.toString()}`);
  return { project, review };
}

async function findWorkOrder(
  projects: ProjectRepository,
  input: { projectId: ProjectId; workOrderId: WorkOrderId },
): Promise<{ project: Project; workOrder: WorkOrder }> {
  const project = await projects.findById(input.projectId);
  if (!project) throw new ProjectNotFoundError(input.projectId.toString());
  const workOrder = project.findWorkOrder(input.workOrderId);
  if (!workOrder) throw new WorkOrderNotFoundError(input.workOrderId.toString());
  return { project, workOrder };
}

async function findRelease(
  projects: ProjectRepository,
  input: { projectId: ProjectId; releaseId: ReleaseId },
): Promise<{ project: Project; release: Release }> {
  const project = await projects.findById(input.projectId);
  if (!project) throw new ProjectNotFoundError(input.projectId.toString());
  const release = project.findRelease(input.releaseId);
  if (!release) throw new ReleaseNotFoundError(input.releaseId.toString());
  return { project, release };
}

async function findAdr(
  projects: ProjectRepository,
  input: { projectId: ProjectId; adrId: AdrId },
): Promise<{ project: Project; adr: ArchitectureDecisionRecord }> {
  const project = await projects.findById(input.projectId);
  if (!project) throw new ProjectNotFoundError(input.projectId.toString());
  const adr = project.findAdr(input.adrId);
  if (!adr) throw new AdrNotFoundError(input.adrId.toString());
  return { project, adr };
}
