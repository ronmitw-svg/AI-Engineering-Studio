import { DomainError } from "../errors/DomainError.js";

export class ReleaseNotReadyError extends DomainError {
  constructor(projectId: string) {
    super(`Project ${projectId} is not ready for release.`);
  }
}
