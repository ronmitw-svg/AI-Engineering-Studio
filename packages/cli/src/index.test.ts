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
    await run(workspace, "generate", "work-order", "demo", "wo-1", "Implement traceability", "Connect artefacts", "--requirement", "req-1", "--assigned-agent", "implementer-agent");
    await run(workspace, "work-order", "ready", "demo", "wo-1");
    await run(workspace, "work-order", "start", "demo", "wo-1");
    await run(workspace, "work-order", "submit", "demo", "wo-1");
    await assert.rejects(
      run(workspace, "generate", "review", "demo", "review-conflict", "wo-1", "--reviewer", "implementer-agent"),
      /cannot review their own work/,
    );
    await run(workspace, "generate", "review", "demo", "review-1", "wo-1", "--reviewer", "qa");
    await run(workspace, "review", "start", "demo", "review-1");
    await run(workspace, "review", "approve", "demo", "review-1");
    await run(workspace, "work-order", "approve", "demo", "wo-1");
    assert.match(
      await run(workspace, "release", "create", "demo", "release-1", "0.1.0", "--proposed-by", "release-manager"),
      /Proposed release/,
    );
    await assert.rejects(
      run(workspace, "release", "approve", "demo", "release-1", "--approved-by", "release-manager"),
      /cannot approve their own work/,
    );
    assert.match(
      await run(workspace, "release", "approve", "demo", "release-1", "--approved-by", "release-approver"),
      /approved by release-approver/,
    );

    assert.match(
      await run(workspace, "generate", "adr", "demo", "adr-1", "Use core", "--context", "Need boundaries", "--decision", "Use a core package", "--consequences", "Adapters depend on core", "--requirement", "req-1", "--proposed-by", "architect"),
      /Created ADR/,
    );
    await assert.rejects(
      run(workspace, "adr", "accept", "demo", "adr-1", "--accepted-by", "architect"),
      /cannot accept their own work/,
    );
    assert.match(await run(workspace, "adr", "accept", "demo", "adr-1", "--accepted-by", "reviewer"), /ADR adr-1 accepted by reviewer/);
    await assert.rejects(
      run(workspace, "adr", "accept", "demo", "adr-1", "--accepted-by", "reviewer"),
      /cannot transition from Accepted to Accepted/,
    );

    assert.match(await run(workspace, "validate", "demo"), /valid/);
    assert.match(
      await run(workspace, "traceability", "demo"),
      /req-1: work-orders=wo-1 adrs=adr-1 reviewed=wo-1 releases=release-1/,
    );
    assert.match(
      await run(workspace, "list"),
      /demo: Demo project \(requirements=1 work-orders=1 reviews=1 releases=1\)/,
    );
  } finally {
    await rm(workspace, { recursive: true, force: true });
  }
});
