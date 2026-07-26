import { DomainError } from "../errors/DomainError.js";

export class AdrNotFoundError extends DomainError {
  constructor(adrId: string) {
    super(`ADR ${adrId} was not found.`);
  }
}
