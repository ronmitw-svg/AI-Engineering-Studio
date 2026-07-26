import type { ArchitectureDecisionRecord } from "../domain/ArchitectureDecisionRecord.js";
import type { Requirement } from "../domain/Requirement.js";
import { MissingRequirementError } from "../errors/MissingRequirementError.js";
import type { AiProvider } from "../ports/AiProvider.js";
import type { ProjectRepository } from "../repositories/ProjectRepository.js";
import type { AdrId, ProjectId, RequirementId } from "../value-objects/Ids.js";
import { AiResponseError } from "./AiResponseError.js";
import { ProjectNotFoundError } from "./ProjectNotFoundError.js";

export interface DraftAdrInput {
  readonly projectId: ProjectId;
  readonly id: AdrId;
  readonly title: string;
  readonly requirementIds: readonly RequirementId[];
  readonly question: string;
}

interface AdrDraft {
  readonly context: string;
  readonly decision: string;
  readonly consequences: string;
}

const SYSTEM_PROMPT =
  "You are a software architect drafting an Architecture Decision Record for a " +
  "CSDS-governed project. Think through the problem, the realistic options, and " +
  "how they compare, then decide. Respond with a single JSON object with exactly " +
  "three string fields: context, decision, consequences. No markdown, no other text.";

export class DraftAdr {
  constructor(
    private readonly projects: ProjectRepository,
    private readonly ai: AiProvider,
  ) {}

  async execute(input: DraftAdrInput): Promise<ArchitectureDecisionRecord> {
    const project = await this.projects.findById(input.projectId);
    if (!project) throw new ProjectNotFoundError(input.projectId.toString());

    const requirements = input.requirementIds.map((requirementId) => {
      const requirement = project.getRequirements().find((existing) => existing.id.equals(requirementId));
      if (!requirement) throw new MissingRequirementError(requirementId.toString());
      return requirement;
    });

    const draft = parseAdrDraft(
      await this.ai.complete({
        system: SYSTEM_PROMPT,
        prompt: buildPrompt(project.name, input.title, input.question, requirements),
      }),
    );

    const adr = project.createAdr({
      id: input.id,
      title: input.title,
      context: draft.context,
      decision: draft.decision,
      consequences: draft.consequences,
      requirementIds: input.requirementIds,
    });
    await this.projects.save(project);
    return adr;
  }
}

function buildPrompt(projectName: string, title: string, question: string, requirements: readonly Requirement[]): string {
  const requirementLines = requirements
    .map((requirement) => `- ${requirement.id.toString()}: ${requirement.title} - ${requirement.description}`)
    .join("\n");
  return `Project: ${projectName}\nDecision to record: ${title}\nQuestion driving this decision: ${question}\n\nRequirements this decision addresses:\n${requirementLines}`;
}

function parseAdrDraft(raw: string): AdrDraft {
  let parsed: unknown;
  try {
    parsed = JSON.parse(extractJson(raw));
  } catch {
    throw new AiResponseError("the response was not valid JSON.");
  }
  if (!isAdrDraftShape(parsed)) {
    throw new AiResponseError("the response was missing a context, decision, or consequences string.");
  }
  return parsed;
}

function extractJson(raw: string): string {
  const fenced = /```(?:json)?\s*([\s\S]*?)```/i.exec(raw);
  return (fenced ? fenced[1] : raw).trim();
}

function isAdrDraftShape(value: unknown): value is AdrDraft {
  const record = value as Record<string, unknown> | null;
  return typeof record === "object" && record !== null
    && typeof record.context === "string"
    && typeof record.decision === "string"
    && typeof record.consequences === "string";
}
