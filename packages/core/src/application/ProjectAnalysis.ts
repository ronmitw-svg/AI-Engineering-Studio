import type { ProjectRepository } from "../repositories/ProjectRepository.js";
import type { ProjectId } from "../value-objects/Ids.js";
import { ProjectNotFoundError } from "./ProjectNotFoundError.js";
import { ReviewStatus } from "../domain/Review.js";

export interface ProjectSummary {
  readonly id: string;
  readonly name: string;
  readonly requirementCount: number;
  readonly workOrderCount: number;
  readonly reviewCount: number;
  readonly releaseCount: number;
}

export class ListProjects {
  constructor(private readonly projects: ProjectRepository) {}

  async execute(): Promise<ProjectSummary[]> {
    const projects = await this.projects.findAll();
    return projects.map((project) => ({
      id: project.id.value,
      name: project.name,
      requirementCount: project.getRequirements().length,
      workOrderCount: project.getWorkOrders().length,
      reviewCount: project.getReviews().length,
      releaseCount: project.getReleases().length,
    }));
  }
}

export interface RequirementTraceability {
  readonly requirementId: string;
  readonly workOrderIds: readonly string[];
  readonly adrIds: readonly string[];
  readonly reviewedWorkOrderIds: readonly string[];
  readonly releaseIds: readonly string[];
}

export interface ProjectValidationReport {
  readonly projectId: string;
  readonly requirementTraceability: readonly RequirementTraceability[];
  readonly unlinkedRequirementIds: readonly string[];
  readonly requirementsMissingAdr: readonly string[];
  readonly requirementsMissingApprovedReview: readonly string[];
  readonly isValid: boolean;
}

export class AnalyzeProjectTraceability {
  constructor(private readonly projects: ProjectRepository) {}

  async execute(projectId: ProjectId): Promise<ProjectValidationReport> {
    const project = await this.projects.findById(projectId);
    if (!project) throw new ProjectNotFoundError(projectId.toString());

    const workOrders = project.getWorkOrders();
    const adrs = project.getAdrs();
    const reviews = project.getReviews();
    const releases = project.getReleases();

    const requirementTraceability = project.getRequirements().map((requirement) => {
      const linkedWorkOrders = workOrders.filter((workOrder) => workOrder.requirementIds.some((id) => id.equals(requirement.id)));
      const reviewedWorkOrderIds = linkedWorkOrders
        .filter((workOrder) => reviews.some((review) => review.target.equals(workOrder.id) && review.statusValue() === ReviewStatus.Approved))
        .map((workOrder) => workOrder.id.value);

      return {
        requirementId: requirement.id.value,
        workOrderIds: linkedWorkOrders.map((workOrder) => workOrder.id.value),
        adrIds: adrs.filter((adr) => adr.requirementIds.some((id) => id.equals(requirement.id))).map((adr) => adr.id.value),
        reviewedWorkOrderIds,
        releaseIds: releases.filter((release) => release.requirementIds.some((id) => id.equals(requirement.id))).map((release) => release.id.value),
      };
    });

    const unlinkedRequirementIds = requirementTraceability.filter((entry) => !entry.workOrderIds.length).map((entry) => entry.requirementId);
    const requirementsMissingAdr = requirementTraceability.filter((entry) => !entry.adrIds.length).map((entry) => entry.requirementId);
    const requirementsMissingApprovedReview = requirementTraceability
      .filter((entry) => entry.workOrderIds.length && !entry.reviewedWorkOrderIds.length)
      .map((entry) => entry.requirementId);

    return {
      projectId: project.id.value,
      requirementTraceability,
      unlinkedRequirementIds,
      requirementsMissingAdr,
      requirementsMissingApprovedReview,
      // Unchanged from before: not every requirement needs an ADR, and review approval is already gated at release time via ApproveWorkOrder.
      isValid: !unlinkedRequirementIds.length,
    };
  }
}
