#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs-extra";
import { resolve } from "node:path";

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

program.parse();
