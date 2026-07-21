import { DomainError } from "./DomainError.js";

export class DuplicateRequirementError extends DomainError {
  constructor(requirementId: string) {
    super(`Requirement ${requirementId} is already part of the project.`);
  }
}
