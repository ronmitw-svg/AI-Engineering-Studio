#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs-extra";
import { resolve } from "node:path";
import { AnthropicAiProvider } from "@aes/ai";
import { FileSystemProjectRepository } from "@aes/filesystem";
import { AcceptAdr, AddReviewFinding, AdrId, AnalyzeProjectTraceability, ApproveRelease, ApproveReview, ApproveWorkOrder, CreateAdr, CreateProject, CreateRelease, CreateRequirement, CreateReview, CreateStakeholder, CreateWorkOrder, DraftAdr, ListProjects, MarkWorkOrderReady, Priority, ProjectId, RejectAdr, RejectRelease, RejectReview, ReleaseId, RequestReviewChanges, RequirementId, RequirementType, ReviewId, StakeholderId, StartReview, StartWorkOrder, SubmitWorkOrderForReview, WorkOrderId } from "@aes/core";

const program = new Command();

program
  .name("aes")
  .description("AI Engineering Studio CLI")
  .version("0.1.0");

program
  .command("doctor")
  .description("Validate the AI Engineering Studio workspace")
  .option("--workspace <path>", "Workspace root to inspect", process.cwd())
  .action(async (options: { workspace: string }) => {
    const workspace = resolve(options.workspace);
    const requiredFiles = ["package.json", "pnpm-workspace.yaml", "turbo.json"];
    const results = await Promise.all(requiredFiles.map(async (file) => ({
      file,
      exists: await fs.pathExists(resolve(workspace, file)),
    })));
    const packageJsonPath = resolve(workspace, "package.json");
    const packageJson = (await fs.pathExists(packageJsonPath))
      ? await fs.readJson(packageJsonPath) as { packageManager?: string }
      : undefined;

    console.log(`AI Engineering Studio doctor: ${workspace}`);
    for (const result of results) {
      console.log(`${result.exists ? "✓" : "✗"} ${result.file}`);
    }
    console.log(`${packageJson?.packageManager?.startsWith("pnpm@") ? "✓" : "✗"} pnpm package manager declared`);

    if (results.some((result) => !result.exists) || !packageJson?.packageManager?.startsWith("pnpm@")) {
      process.exitCode = 1;
      return;
    }

    console.log("Workspace configuration is valid.");
  });

program
  .command("list")
  .description("List projects persisted in the workspace")
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (options: { workspace: string }) => {
    const summaries = await new ListProjects(repository(options.workspace)).execute();
    if (!summaries.length) {
      console.log("No projects found.");
      return;
    }
    for (const summary of summaries) {
      console.log(`${summary.id}: ${summary.name} (requirements=${summary.requirementCount} work-orders=${summary.workOrderCount} reviews=${summary.reviewCount} releases=${summary.releaseCount})`);
    }
  });

program
  .command("init <projectId> <name>")
  .description("Create a persisted engineering project")
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, name: string, options: { workspace: string }) => {
    await new CreateProject(repository(options.workspace)).execute({ id: new ProjectId(projectId), name });
    console.log(`Created project ${projectId}.`);
  });

const generate = program.command("generate").description("Create governed engineering artefacts");
generate
  .command("requirement <projectId> <requirementId> <title> <description>")
  .description("Create a functional requirement")
  .requiredOption("--source <source>", "Requirement source")
  .option("--priority <priority>", "Critical, High, Medium, or Low", "Medium")
  .option("--acceptance <criterion...>", "Acceptance criteria", ["Manually verified"])
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, requirementId: string, title: string, description: string, options: { source: string; priority: keyof typeof Priority; acceptance: string[]; workspace: string }) => {
    const priority = Priority[options.priority as keyof typeof Priority];
    if (!priority) throw new Error(`Unknown priority: ${options.priority}`);
    await new CreateRequirement(repository(options.workspace)).execute({ projectId: new ProjectId(projectId), id: new RequirementId(requirementId), title, description,
      type: RequirementType.Functional, priority, acceptanceCriteria: options.acceptance, source: options.source });
    console.log(`Created requirement ${requirementId}.`);
  });

const workOrder = program.command("work-order").description("Advance a persisted work order through its controlled lifecycle");
for (const [name, description, UseCase] of [
  ["ready", "Mark a planned work order ready", MarkWorkOrderReady],
  ["start", "Start a ready work order", StartWorkOrder],
  ["submit", "Submit an in-progress work order for review", SubmitWorkOrderForReview],
  ["approve", "Approve a reviewed work order", ApproveWorkOrder],
] as const) {
  workOrder
    .command(`${name} <projectId> <workOrderId>`)
    .description(description)
    .option("--workspace <path>", "Workspace root", process.cwd())
    .action(async (projectId: string, workOrderId: string, options: { workspace: string }) => {
      await new UseCase(repository(options.workspace)).execute({ projectId: new ProjectId(projectId), workOrderId: new WorkOrderId(workOrderId) });
      console.log(`Work order ${workOrderId} moved to ${name}.`);
    });
}

const review = program.command("review").description("Advance an independent review");
for (const [name, UseCase] of [["start", StartReview], ["approve", ApproveReview]] as const) {
  review.command(`${name} <projectId> <reviewId>`).option("--workspace <path>", "Workspace root", process.cwd())
    .action(async (projectId: string, reviewId: string, options: { workspace: string }) => {
      await new UseCase(repository(options.workspace)).execute({ projectId: new ProjectId(projectId), reviewId: new ReviewId(reviewId) });
      console.log(`Review ${reviewId} moved to ${name}.`);
    });
}
review.command("finding <projectId> <reviewId> <finding>").option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, reviewId: string, finding: string, options: { workspace: string }) => {
    await new AddReviewFinding(repository(options.workspace)).execute({ projectId: new ProjectId(projectId), reviewId: new ReviewId(reviewId), finding });
    console.log(`Added finding to review ${reviewId}.`);
  });
review.command("request-changes <projectId> <reviewId>").option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, reviewId: string, options: { workspace: string }) => {
    await new RequestReviewChanges(repository(options.workspace)).execute({ projectId: new ProjectId(projectId), reviewId: new ReviewId(reviewId) });
    console.log(`Review ${reviewId} requested changes.`);
  });
review.command("reject <projectId> <reviewId>").option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, reviewId: string, options: { workspace: string }) => {
    await new RejectReview(repository(options.workspace)).execute({ projectId: new ProjectId(projectId), reviewId: new ReviewId(reviewId) });
    console.log(`Review ${reviewId} rejected; work order blocked pending a decision.`);
  });

generate
  .command("work-order <projectId> <workOrderId> <title> <description>")
  .description("Create a work order for one or more requirements")
  .requiredOption("--requirement <id...>", "Requirement IDs")
  .option("--assigned-agent <agent>", "Who is implementing this work order (blocks them from also reviewing it)")
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, workOrderId: string, title: string, description: string, options: { requirement: string[]; assignedAgent?: string; workspace: string }) => {
    await new CreateWorkOrder(repository(options.workspace)).execute({ projectId: new ProjectId(projectId), id: new WorkOrderId(workOrderId), title, description,
      requirementIds: options.requirement.map((id) => new RequirementId(id)), assignedAgent: options.assignedAgent });
    console.log(`Created work order ${workOrderId}.`);
  });

generate
  .command("adr <projectId> <adrId> <title>")
  .description("Create a proposed architecture decision record")
  .requiredOption("--context <context>", "Decision context")
  .requiredOption("--decision <decision>", "Decision")
  .requiredOption("--consequences <consequences>", "Consequences")
  .requiredOption("--requirement <id...>", "Requirement IDs this decision addresses")
  .requiredOption("--proposed-by <name>", "Who is proposing this ADR")
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, adrId: string, title: string, options: { context: string; decision: string; consequences: string; requirement: string[]; proposedBy: string; workspace: string }) => {
    await new CreateAdr(repository(options.workspace)).execute({ projectId: new ProjectId(projectId), id: new AdrId(adrId), title,
      context: options.context, decision: options.decision, consequences: options.consequences, requirementIds: options.requirement.map((id) => new RequirementId(id)),
      proposedBy: options.proposedBy });
    console.log(`Created ADR ${adrId}.`);
  });

const adr = program.command("adr").description("Record a project's human decision on a proposed ADR");
adr.command("accept <projectId> <adrId>")
  .requiredOption("--accepted-by <name>", "Who is accepting this ADR (must differ from who proposed it)")
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, adrId: string, options: { acceptedBy: string; workspace: string }) => {
    await new AcceptAdr(repository(options.workspace)).execute({ projectId: new ProjectId(projectId), adrId: new AdrId(adrId), acceptedBy: options.acceptedBy });
    console.log(`ADR ${adrId} accepted by ${options.acceptedBy}.`);
  });
adr.command("reject <projectId> <adrId>")
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, adrId: string, options: { workspace: string }) => {
    await new RejectAdr(repository(options.workspace)).execute({ projectId: new ProjectId(projectId), adrId: new AdrId(adrId) });
    console.log(`ADR ${adrId} rejected.`);
  });

const ai = program.command("ai").description("AI-assisted drafting of governed artefacts (always lands as Proposed, pending human approval)");
ai.command("draft-adr <projectId> <adrId> <title>")
  .description("Ask the configured AI provider to draft an ADR's context/decision/consequences")
  .requiredOption("--question <question>", "The question this decision should answer")
  .requiredOption("--requirement <id...>", "Requirement IDs this decision addresses")
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, adrId: string, title: string, options: { question: string; requirement: string[]; workspace: string }) => {
    const adr = await new DraftAdr(repository(options.workspace), aiProvider()).execute({
      projectId: new ProjectId(projectId), id: new AdrId(adrId), title, question: options.question,
      requirementIds: options.requirement.map((id) => new RequirementId(id)),
    });
    console.log(`Drafted ADR ${adrId} (status: Proposed - review and run 'aes adr accept' before relying on it).`);
    console.log(`Context: ${adr.context}`);
    console.log(`Decision: ${adr.decision}`);
    console.log(`Consequences: ${adr.consequences}`);
  });

generate
  .command("stakeholder <projectId> <stakeholderId> <name>")
  .description("Create a project stakeholder")
  .requiredOption("--role <role>", "Stakeholder role")
  .requiredOption("--interest <interest>", "Stakeholder interest")
  .option("--influence <influence>", "Low, Medium, or High", "Medium")
  .option("--notes <notes>", "Optional notes")
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, stakeholderId: string, name: string, options: { role: string; interest: string; influence: "Low" | "Medium" | "High"; notes?: string; workspace: string }) => {
    if (!["Low", "Medium", "High"].includes(options.influence)) throw new Error(`Unknown influence: ${options.influence}`);
    await new CreateStakeholder(repository(options.workspace)).execute({ projectId: new ProjectId(projectId), id: new StakeholderId(stakeholderId), name,
      role: options.role, interest: options.interest, influence: options.influence, notes: options.notes });
    console.log(`Created stakeholder ${stakeholderId}.`);
  });

generate
  .command("review <projectId> <reviewId> <workOrderId>")
  .description("Create an independent review for a work order")
  .requiredOption("--reviewer <reviewer>", "Reviewer identity")
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, reviewId: string, workOrderId: string, options: { reviewer: string; workspace: string }) => {
    await new CreateReview(repository(options.workspace)).execute({ projectId: new ProjectId(projectId), id: new ReviewId(reviewId),
      target: new WorkOrderId(workOrderId), reviewer: options.reviewer });
    console.log(`Created review ${reviewId}.`);
  });

program
  .command("validate <projectId>")
  .description("Check whether each requirement has a work order")
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, options: { workspace: string }) => {
    const report = await new AnalyzeProjectTraceability(repository(options.workspace)).execute(new ProjectId(projectId));
    if (report.requirementsMissingAdr.length) console.warn(`Requirements without an ADR: ${report.requirementsMissingAdr.join(", ")}`);
    if (report.requirementsMissingApprovedReview.length) console.warn(`Requirements without an approved review: ${report.requirementsMissingApprovedReview.join(", ")}`);
    if (!report.isValid) {
      console.error(`Requirements without work order: ${report.unlinkedRequirementIds.join(", ")}`);
      process.exitCode = 1;
      return;
    }
    console.log(`Project ${projectId} is valid.`);
  });

program
  .command("traceability <projectId>")
  .description("Show requirement traceability: work orders, ADRs, reviews, and releases")
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, options: { workspace: string }) => {
    const report = await new AnalyzeProjectTraceability(repository(options.workspace)).execute(new ProjectId(projectId));
    for (const row of report.requirementTraceability) {
      console.log(`${row.requirementId}: work-orders=${row.workOrderIds.join(",") || "UNLINKED"} adrs=${row.adrIds.join(",") || "NONE"} reviewed=${row.reviewedWorkOrderIds.join(",") || "NONE"} releases=${row.releaseIds.join(",") || "NONE"}`);
    }
    if (!report.isValid) process.exitCode = 1;
  });

const release = program.command("release").description("Propose a release and record its human approval");
release.command("create <projectId> <releaseId> <version>")
  .description("Propose a release after all quality gates are satisfied")
  .requiredOption("--proposed-by <name>", "Who is proposing this release")
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, releaseId: string, version: string, options: { proposedBy: string; workspace: string }) => {
    await new CreateRelease(repository(options.workspace)).execute({ projectId: new ProjectId(projectId), id: new ReleaseId(releaseId), version, proposedBy: options.proposedBy });
    console.log(`Proposed release ${version}.`);
  });
release.command("approve <projectId> <releaseId>")
  .description("Record human approval for a proposed release")
  .requiredOption("--approved-by <name>", "Who is approving this release")
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, releaseId: string, options: { approvedBy: string; workspace: string }) => {
    await new ApproveRelease(repository(options.workspace)).execute({ projectId: new ProjectId(projectId), releaseId: new ReleaseId(releaseId), approvedBy: options.approvedBy });
    console.log(`Release ${releaseId} approved by ${options.approvedBy}.`);
  });
release.command("reject <projectId> <releaseId>")
  .description("Record a rejection for a proposed release")
  .requiredOption("--rejected-by <name>", "Who is rejecting this release")
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, releaseId: string, options: { rejectedBy: string; workspace: string }) => {
    await new RejectRelease(repository(options.workspace)).execute({ projectId: new ProjectId(projectId), releaseId: new ReleaseId(releaseId), rejectedBy: options.rejectedBy });
    console.log(`Release ${releaseId} rejected by ${options.rejectedBy}.`);
  });

function repository(workspace: string): FileSystemProjectRepository {
  return new FileSystemProjectRepository(resolve(workspace));
}

function aiProvider(): AnthropicAiProvider {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set. Export it before running an `aes ai` command.");
  }
  return new AnthropicAiProvider({ apiKey });
}

program.parse();
