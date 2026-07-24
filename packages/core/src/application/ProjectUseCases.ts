import { Project } from "../domain/project.js";
import { Requirement, type CreateRequirementInput } from "../domain/Requirement.js";
import { type CreateWorkOrderInput, WorkOrder } from "../domain/WorkOrder.js";
import { ProjectRepository } from "../repositories/ProjectRepository.js";
import { ProjectId, WorkOrderId } from "../value-objects/Ids.js";
import { ProjectNotFoundError } from "./ProjectNotFoundError.js";
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
    workOrder.approve();
    await this.projects.save(project);
  }
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
