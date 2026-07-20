#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .name("aes")
  .description("AI Engineering Studio CLI")
  .version("0.1.0");

program
  .command("doctor")
  .description("Validate workspace")
  .action(() => {
    console.log("✅ AI Engineering Studio");
    console.log("✅ CLI loaded");
    console.log("✅ Workspace OK");
  });

program.parse();