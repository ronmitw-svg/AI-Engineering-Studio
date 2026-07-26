import { DomainError } from "../errors/DomainError.js";

export class AiResponseError extends DomainError {
  constructor(reason: string) {
    super(`The AI response could not be used: ${reason}`);
  }
}
