import { DomainError } from "../errors/DomainError.js";

export class ReleaseNotFoundError extends DomainError {
  constructor(releaseId: string) {
    super(`Release ${releaseId} was not found.`);
  }
}
