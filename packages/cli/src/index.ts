#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs-extra";
import { resolve } from "node:path";
import { FileSystemProjectRepository } from "@aes/filesystem";
import { AdrId, AnalyzeProjectTraceability, ApproveWorkOrder, CreateAdr, CreateProject, CreateRequirement, CreateWorkOrder, MarkWorkOrderReady, Priority, ProjectId, RequirementId, RequirementType, StartWorkOrder, SubmitWorkOrderForReview, WorkOrderId } from "@aes/core";

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

generate
  .command("work-order <projectId> <workOrderId> <title> <description>")
  .description("Create a work order for one or more requirements")
  .requiredOption("--requirement <id...>", "Requirement IDs")
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, workOrderId: string, title: string, description: string, options: { requirement: string[]; workspace: string }) => {
    await new CreateWorkOrder(repository(options.workspace)).execute({ projectId: new ProjectId(projectId), id: new WorkOrderId(workOrderId), title, description,
      requirementIds: options.requirement.map((id) => new RequirementId(id)) });
    console.log(`Created work order ${workOrderId}.`);
  });

generate
  .command("adr <projectId> <adrId> <title>")
  .description("Create a proposed architecture decision record")
  .requiredOption("--context <context>", "Decision context")
  .requiredOption("--decision <decision>", "Decision")
  .requiredOption("--consequences <consequences>", "Consequences")
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, adrId: string, title: string, options: { context: string; decision: string; consequences: string; workspace: string }) => {
    await new CreateAdr(repository(options.workspace)).execute({ projectId: new ProjectId(projectId), id: new AdrId(adrId), title,
      context: options.context, decision: options.decision, consequences: options.consequences });
    console.log(`Created ADR ${adrId}.`);
  });

program
  .command("validate <projectId>")
  .description("Check whether each requirement has a work order")
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, options: { workspace: string }) => {
    const report = await new AnalyzeProjectTraceability(repository(options.workspace)).execute(new ProjectId(projectId));
    if (!report.isValid) {
      console.error(`Requirements without work order: ${report.unlinkedRequirementIds.join(", ")}`);
      process.exitCode = 1;
      return;
    }
    console.log(`Project ${projectId} is valid.`);
  });

program
  .command("traceability <projectId>")
  .description("Show requirement-to-work-order traceability")
  .option("--workspace <path>", "Workspace root", process.cwd())
  .action(async (projectId: string, options: { workspace: string }) => {
    const report = await new AnalyzeProjectTraceability(repository(options.workspace)).execute(new ProjectId(projectId));
    for (const row of report.requirementTraceability) {
      console.log(`${row.requirementId}: ${row.workOrderIds.join(", ") || "UNLINKED"}`);
    }
    if (!report.isValid) process.exitCode = 1;
  });

function repository(workspace: string): FileSystemProjectRepository {
  return new FileSystemProjectRepository(resolve(workspace));
}

program.parse();
