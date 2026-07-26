import { DomainError } from "./DomainError.js";

export class SeparationOfDutiesError extends DomainError {
  constructor(actor: string, action: string) {
    super(`${actor} cannot ${action} their own work.`);
  }
}
