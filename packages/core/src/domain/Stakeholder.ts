import { ValidationError } from "../errors/ValidationError.js";
import { RequirementId, StakeholderId } from "../value-objects/Ids.js";
import { Entity } from "./Entity.js";

export interface CreateStakeholderInput {
  id: StakeholderId;
  name: string;
  role: string;
  interest: string;
  influence: "Low" | "Medium" | "High";
  requirementIds?: readonly RequirementId[];
  notes?: string;
}

export class Stakeholder extends Entity<StakeholderId> {
  public readonly requirementIds: readonly RequirementId[];
  public readonly notes?: string;

  private constructor(input: Required<Omit<CreateStakeholderInput, "notes" | "requirementIds">> & Pick<CreateStakeholderInput, "notes" | "requirementIds">) {
    super(input.id);
    this.name = input.name;
    this.role = input.role;
    this.interest = input.interest;
    this.influence = input.influence;
    this.requirementIds = input.requirementIds ?? [];
    this.notes = input.notes?.trim() || undefined;
  }

  public readonly name: string;
  public readonly role: string;
  public readonly interest: string;
  public readonly influence: "Low" | "Medium" | "High";

  static create(input: CreateStakeholderInput): Stakeholder {
    const name = input.name.trim();
    const role = input.role.trim();
    const interest = input.interest.trim();
    if (!name || !role || !interest) {
      throw new ValidationError("A stakeholder needs a name, role, and interest.");
    }
    return new Stakeholder({ ...input, name, role, interest });
  }
}
