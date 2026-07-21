import { ValidationError } from "../errors/ValidationError.js";
import { AdrId, RequirementId, ReviewId, StakeholderId, WorkOrderId } from "../value-objects/Ids.js";

export interface TraceabilityLink {
  readonly stakeholderId?: StakeholderId;
  readonly requirementId: RequirementId;
  readonly adrId?: AdrId;
  readonly workOrderId?: WorkOrderId;
  readonly reviewId?: ReviewId;
  readonly implementationReference?: string;
  readonly testReference?: string;
}

export class TraceabilityGraph {
  private readonly links: TraceabilityLink[] = [];

  add(link: TraceabilityLink): void {
    if (!link.workOrderId && !link.adrId) {
      throw new ValidationError("A traceability link must connect a requirement to an ADR or work order.");
    }
    this.links.push(link);
  }

  forRequirement(requirementId: RequirementId): readonly TraceabilityLink[] {
    return this.links.filter((link) => link.requirementId.equals(requirementId));
  }

  unlinkedRequirements(requirementIds: readonly RequirementId[]): readonly RequirementId[] {
    return requirementIds.filter((id) => !this.forRequirement(id).length);
  }
}
