import { AggregateRoot } from "./AggregateRoot.js";

export class Requirement extends AggregateRoot<string> {
  constructor(
    id: string,
    public readonly title: string,
    public readonly description: string
  ) {
    super(id);
  }

  static create(
    id: string,
    title: string,
    description: string
  ): Requirement {
    return new Requirement(id, title, description);
  }
}
