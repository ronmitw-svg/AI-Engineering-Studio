import { mkdir, readdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Project, ProjectId, type ProjectRepository, type ProjectSnapshot } from "@aes/core";

export class FileSystemProjectRepository implements ProjectRepository {
  constructor(private readonly rootDirectory: string) {}

  async findById(id: ProjectId): Promise<Project | null> {
    try {
      const contents = await readFile(this.filePath(id), "utf8");
      return Project.rehydrate(JSON.parse(contents) as ProjectSnapshot);
    } catch (error: unknown) {
      if (isNotFound(error)) return null;
      throw error;
    }
  }

  async findAll(): Promise<Project[]> {
    let entries: string[];
    try {
      entries = await readdir(this.projectsDirectory());
    } catch (error: unknown) {
      if (isNotFound(error)) return [];
      throw error;
    }

    const projects = await Promise.all(
      entries
        .filter((entry) => entry.endsWith(".json") && !entry.endsWith(".json.tmp"))
        .map((entry) => this.findById(new ProjectId(entry.slice(0, -".json".length)))),
    );
    return projects.filter((project): project is Project => project !== null);
  }

  async save(project: Project): Promise<void> {
    await mkdir(this.projectsDirectory(), { recursive: true });
    const target = this.filePath(project.id);
    const temporary = `${target}.tmp`;
    await writeFile(temporary, `${JSON.stringify(project.toSnapshot(), null, 2)}\n`, "utf8");
    await rename(temporary, target);
  }

  private projectsDirectory(): string { return join(this.rootDirectory, ".aes", "projects"); }
  private filePath(id: ProjectId): string { return join(this.projectsDirectory(), `${id.value}.json`); }
}

function isNotFound(error: unknown): error is NodeJS.ErrnoException {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}
