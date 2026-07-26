import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import test from "node:test";

const execute = promisify(execFile);
const cli = new URL("./index.js", import.meta.url).pathname;

async function run(workspace: string, ...args: string[]): Promise<string> {
  const { stdout } = await execute(process.execPath, [cli, ...args, "--workspace", workspace]);
  return stdout;
}

test("CLI persists a governed work-order workflow end to end", async () => {
  const workspace = await mkdtemp(join(tmpdir(), "aes-cli-"));
  try {
    await run(workspace, "init", "demo", "Demo project");
    await run(workspace, "generate", "requirement", "demo", "req-1", "Traceability", "Track delivery", "--source", "Charter");
    await run(workspace, "generate", "work-order", "demo", "wo-1", "Implement traceability", "Connect artefacts", "--requirement", "req-1");
    await run(workspace, "work-order", "ready", "demo", "wo-1");
    await run(workspace, "work-order", "start", "demo", "wo-1");
    await run(workspace, "work-order", "submit", "demo", "wo-1");
    await run(workspace, "generate", "review", "demo", "review-1", "wo-1", "--reviewer", "qa");
    await run(workspace, "review", "start", "demo", "review-1");
    await run(workspace, "review", "approve", "demo", "review-1");
    await run(workspace, "work-order", "approve", "demo", "wo-1");
    assert.match(await run(workspace, "release", "demo", "release-1", "0.1.0"), /Created release/);

    assert.match(await run(workspace, "validate", "demo"), /valid/);
    assert.match(await run(workspace, "traceability", "demo"), /req-1: wo-1/);
  } finally {
    await rm(workspace, { recursive: true, force: true });
  }
});
