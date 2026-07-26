import type { ProjectRepository } from "../repositories/ProjectRepository.js";
import type { ProjectId } from "../value-objects/Ids.js";
import { ProjectNotFoundError } from "./ProjectNotFoundError.js";

export interface RequirementTraceability {
  readonly requirementId: string;
  readonly workOrderIds: readonly string[];
}

export interface ProjectValidationReport {
  readonly projectId: string;
  readonly requirementTraceability: readonly RequirementTraceability[];
  readonly unlinkedRequirementIds: readonly string[];
  readonly isValid: boolean;
}

export class AnalyzeProjectTraceability {
  constructor(private readonly projects: ProjectRepository) {}

  async execute(projectId: ProjectId): Promise<ProjectValidationReport> {
    const project = await this.projects.findById(projectId);
    if (!project) throw new ProjectNotFoundError(projectId.toString());

    const requirementTraceability = project.getRequirements().map((requirement) => ({
      requirementId: requirement.id.value,
      workOrderIds: project.getWorkOrders()
        .filter((workOrder) => workOrder.requirementIds.some((id) => id.equals(requirement.id)))
        .map((workOrder) => workOrder.id.value),
    }));
    const unlinkedRequirementIds = requirementTraceability
      .filter((entry) => !entry.workOrderIds.length)
      .map((entry) => entry.requirementId);

    return { projectId: project.id.value, requirementTraceability, unlinkedRequirementIds, isValid: !unlinkedRequirementIds.length };
  }
}
