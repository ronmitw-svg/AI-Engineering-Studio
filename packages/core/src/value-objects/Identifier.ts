import { ValidationError } from "../errors/ValidationError.js";

export abstract class Identifier {
  public readonly value: string;

  constructor(value: string) {
    const normalized = value.trim();
    if (!normalized) {
      throw new ValidationError("An identifier must not be empty.");
    }

    this.value = normalized;
  }

  equals(other?: Identifier): boolean {
    return other?.constructor === this.constructor && other.value === this.value;
  }

  toString(): string {
    return this.value;
  }
}
