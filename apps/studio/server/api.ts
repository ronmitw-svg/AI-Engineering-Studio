import type { IncomingMessage, ServerResponse } from "node:http";
import { AnalyzeProjectTraceability, ListProjects, ProjectId } from "@aes/core";
import { FileSystemProjectRepository } from "@aes/filesystem";

export type Middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => void | Promise<void>;

const PROJECT_DETAIL = /^\/api\/projects\/([^/]+)$/;

export function createApiMiddleware(workspaceRoot: string): Middleware {
  const repository = () => new FileSystemProjectRepository(workspaceRoot);

  return async (req, res, next) => {
    if (!req.url || !req.url.startsWith("/api/")) {
      next();
      return;
    }

    const url = new URL(req.url, "http://localhost");

    try {
      if (req.method === "GET" && url.pathname === "/api/projects") {
        respondJson(res, 200, await new ListProjects(repository()).execute());
        return;
      }

      const detailMatch = PROJECT_DETAIL.exec(url.pathname);
      if (req.method === "GET" && detailMatch) {
        const id = new ProjectId(decodeURIComponent(detailMatch[1]));
        const project = await repository().findById(id);
        if (!project) {
          respondJson(res, 404, { error: `Project ${id.toString()} was not found.` });
          return;
        }
        const traceability = await new AnalyzeProjectTraceability(repository()).execute(id);
        respondJson(res, 200, { project: project.toSnapshot(), traceability });
        return;
      }

      next();
    } catch (error) {
      respondJson(res, 400, { error: error instanceof Error ? error.message : "Unknown error" });
    }
  };
}

function respondJson(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}
