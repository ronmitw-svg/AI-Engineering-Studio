import { AggregateRoot } from "./AggregateRoot.js";
import { ValidationError } from "../errors/ValidationError.js";
import { RequirementId } from "../value-objects/Ids.js";
import { Priority } from "../value-objects/Priority.js";
import { RequirementStatus } from "../value-objects/RequirementStatus.js";
import { RequirementType } from "../value-objects/RequirementType.js";

export interface CreateRequirementInput {
  id: RequirementId;
  title: string;
  description: string;
  type: RequirementType;
  priority: Priority;
  acceptanceCriteria: readonly string[];
  source: string;
  createdAt?: Date;
}

export interface RequirementSnapshot extends Omit<CreateRequirementInput, "id" | "createdAt"> {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: RequirementStatus;
}

export class Requirement extends AggregateRoot<RequirementId> {
  private status: RequirementStatus;
  public readonly createdAt: Date;
  private updatedAt: Date;

  private constructor(
    id: RequirementId,
    public readonly title: string,
    public readonly description: string,
    public readonly type: RequirementType,
    public readonly priority: Priority,
    public readonly acceptanceCriteria: readonly string[],
    public readonly source: string,
    createdAt: Date,
  ) {
    super(id);
    this.status = RequirementStatus.Draft;
    this.createdAt = createdAt;
    this.updatedAt = createdAt;
  }

  static create(input: CreateRequirementInput): Requirement {
    const title = input.title.trim();
    const description = input.description.trim();
    const source = input.source.trim();
    const acceptanceCriteria = input.acceptanceCriteria.map((criterion) => criterion.trim());

    if (!title || !description || !source) {
      throw new ValidationError("A requirement needs a title, description, and source.");
    }
    if (!acceptanceCriteria.length || acceptanceCriteria.some((criterion) => !criterion)) {
      throw new ValidationError("A requirement needs at least one non-empty acceptance criterion.");
    }

    return new Requirement(
      input.id,
      title,
      description,
      input.type,
      input.priority,
      acceptanceCriteria,
      source,
      input.createdAt ?? new Date(),
    );
  }

  static rehydrate(snapshot: RequirementSnapshot): Requirement {
    const requirement = Requirement.create({ ...snapshot, id: new RequirementId(snapshot.id), createdAt: new Date(snapshot.createdAt) });
    requirement.status = snapshot.status;
    requirement.updatedAt = new Date(snapshot.updatedAt);
    return requirement;
  }

  toSnapshot(): RequirementSnapshot {
    return { id: this.id.value, title: this.title, description: this.description, type: this.type, priority: this.priority,
      acceptanceCriteria: this.acceptanceCriteria, source: this.source, createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(), status: this.status };
  }

  approve(at = new Date()): void {
    if (this.status !== RequirementStatus.Draft) {
      throw new ValidationError("Only draft requirements can be approved.");
    }
    this.status = RequirementStatus.Approved;
    this.updatedAt = at;
  }

  markImplemented(at = new Date()): void {
    if (this.status !== RequirementStatus.Approved) {
      throw new ValidationError("Only approved requirements can be marked implemented.");
    }
    this.status = RequirementStatus.Implemented;
    this.updatedAt = at;
  }

  statusValue(): RequirementStatus {
    return this.status;
  }

  updatedAtValue(): Date {
    return new Date(this.updatedAt);
  }
}
