import { DomainError } from "../errors/DomainError.js";

export class ProjectNotFoundError extends DomainError {
  constructor(projectId: string) {
    super(`Project ${projectId} was not found.`);
  }
}
