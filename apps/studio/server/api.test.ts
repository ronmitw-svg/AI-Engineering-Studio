import assert from "node:assert/strict";
import { createServer } from "node:http";
import type { Server } from "node:http";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { CreateProject, CreateRequirement, ProjectId, Priority, RequirementId, RequirementType } from "@aes/core";
import { FileSystemProjectRepository } from "@aes/filesystem";
import { createApiMiddleware } from "./api.js";

async function withServer(workspaceRoot: string, run: (baseUrl: string) => Promise<void>): Promise<void> {
  const middleware = createApiMiddleware(workspaceRoot);
  const server: Server = createServer((req, res) => {
    void middleware(req, res, () => {
      res.statusCode = 404;
      res.end();
    });
  });
  await new Promise<void>((resolvePromise) => server.listen(0, resolvePromise));
  const address = server.address();
  if (address === null || typeof address === "string") throw new Error("Expected a network address.");
  try {
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise<void>((resolvePromise, reject) => server.close((error) => (error ? reject(error) : resolvePromise())));
  }
}

test("GET /api/projects lists persisted project summaries", async () => {
  const workspaceRoot = await mkdtemp(join(tmpdir(), "aes-studio-api-"));
  try {
    const repository = new FileSystemProjectRepository(workspaceRoot);
    await new CreateProject(repository).execute({ id: new ProjectId("project-a"), name: "Project A" });

    await withServer(workspaceRoot, async (baseUrl) => {
      const response = await fetch(`${baseUrl}/api/projects`);
      assert.equal(response.status, 200);
      const body = await response.json();
      assert.deepEqual(body, [{ id: "project-a", name: "Project A", requirementCount: 0, workOrderCount: 0, reviewCount: 0, releaseCount: 0 }]);
    });
  } finally {
    await rm(workspaceRoot, { recursive: true, force: true });
  }
});

test("GET /api/projects/:id returns project detail with traceability, or 404", async () => {
  const workspaceRoot = await mkdtemp(join(tmpdir(), "aes-studio-api-"));
  try {
    const repository = new FileSystemProjectRepository(workspaceRoot);
    await new CreateProject(repository).execute({ id: new ProjectId("project-b"), name: "Project B" });
    await new CreateRequirement(repository).execute({
      projectId: new ProjectId("project-b"), id: new RequirementId("req-1"), title: "Traceability", description: "Track work.",
      type: RequirementType.Functional, priority: Priority.Medium, acceptanceCriteria: ["Traced"], source: "Charter",
    });

    await withServer(workspaceRoot, async (baseUrl) => {
      const found = await fetch(`${baseUrl}/api/projects/project-b`);
      assert.equal(found.status, 200);
      const body = (await found.json()) as { project: { name: string }; traceability: { unlinkedRequirementIds: string[] } };
      assert.equal(body.project.name, "Project B");
      assert.deepEqual(body.traceability.unlinkedRequirementIds, ["req-1"]);

      const missing = await fetch(`${baseUrl}/api/projects/does-not-exist`);
      assert.equal(missing.status, 404);
    });
  } finally {
    await rm(workspaceRoot, { recursive: true, force: true });
  }
});

test("unrelated paths fall through to the next middleware", async () => {
  const workspaceRoot = await mkdtemp(join(tmpdir(), "aes-studio-api-"));
  try {
    await withServer(workspaceRoot, async (baseUrl) => {
      const response = await fetch(`${baseUrl}/index.html`);
      assert.equal(response.status, 404);
    });
  } finally {
    await rm(workspaceRoot, { recursive: true, force: true });
  }
});
