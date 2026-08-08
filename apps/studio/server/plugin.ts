import { resolve } from "node:path";
import type { Plugin } from "vite";
import { createApiMiddleware } from "./api.js";

export function aesStudioApiPlugin(): Plugin {
  return {
    name: "aes-studio-api",
    configureServer(server) {
      const workspaceRoot = resolve(process.env.AES_WORKSPACE ?? process.cwd());
      server.middlewares.use(createApiMiddleware(workspaceRoot));
    },
  };
}
