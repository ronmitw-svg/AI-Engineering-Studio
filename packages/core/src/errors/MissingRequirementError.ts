import { DomainError } from "./DomainError.js";

export class MissingRequirementError extends DomainError {
  constructor(requirementId: string) {
    super(`Requirement ${requirementId} is not part of the project.`);
  }
}
