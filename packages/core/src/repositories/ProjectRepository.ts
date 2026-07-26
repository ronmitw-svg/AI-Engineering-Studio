import type { Project } from "../domain/project.js";
import type { ProjectId } from "../value-objects/Ids.js";

export interface ProjectRepository {
  findById(id: ProjectId): Promise<Project | null>;
  findAll(): Promise<Project[]>;
  save(project: Project): Promise<void>;
}
