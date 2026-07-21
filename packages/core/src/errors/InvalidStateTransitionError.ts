import { DomainError } from "./DomainError.js";

export class InvalidStateTransitionError extends DomainError {
  constructor(entity: string, from: string, to: string) {
    super(`${entity} cannot transition from ${from} to ${to}.`);
  }
}
