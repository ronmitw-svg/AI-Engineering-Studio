import { ValidationError } from "../errors/ValidationError.js";

export abstract class Identifier {
  public readonly value: string;

  constructor(value: string) {
    const normalized = value.trim();
    if (!normalized) {
      throw new ValidationError("An identifier must not be empty.");
    }
    if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(normalized)) {
      throw new ValidationError("An identifier may contain only letters, digits, hyphens, and underscores.");
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
