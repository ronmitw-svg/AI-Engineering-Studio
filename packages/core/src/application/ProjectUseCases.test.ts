import assert from "node:assert/strict";
import test from "node:test";
import { AddReviewFinding, ApproveReview, ApproveWorkOrder, CreateAdr, CreateProject, CreateRelease, CreateRequirement, CreateReview, CreateStakeholder, CreateWorkOrder, MarkWorkOrderReady, RejectReview, RequestReviewChanges, StartReview, StartWorkOrder, SubmitWorkOrderForReview } from "./ProjectUseCases.js";
import { ReviewStatus } from "../domain/Review.js";
import { AdrId, ProjectId, ReleaseId, RequirementId, ReviewId, StakeholderId, WorkOrderId } from "../value-objects/Ids.js";
import { ReleaseNotReadyError } from "./ReleaseNotReadyError.js";
import { MissingRequirementError } from "../errors/MissingRequirementError.js";
import type { Project } from "../domain/project.js";
import type { ProjectRepository } from "../repositories/ProjectRepository.js";
import { Priority } from "../value-objects/Priority.js";
import { RequirementType } from "../value-objects/RequirementType.js";
import { WorkOrderStatus } from "../value-objects/WorkOrderStatus.js";
import { AnalyzeProjectTraceability, ListProjects } from "./ProjectAnalysis.js";

class InMemoryProjectRepository implements ProjectRepository {
  private readonly projects = new Map<string, Project>();
  async findById(id: ProjectId): Promise<Project | null> { return this.projects.get(id.value) ?? null; }
  async findAll(): Promise<Project[]> { return [...this.projects.values()]; }
  async save(project: Project): Promise<void> { this.projects.set(project.id.value, project); }
}

test("application use cases persist controlled project changes", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = new ProjectId("project-1");
  await new CreateProject(repository).execute({ id: projectId, name: "Studio" });
  await new CreateRequirement(repository).execute({
    projectId, id: new RequirementId("req-1"), title: "Traceability", description: "Track changes.",
    type: RequirementType.Functional, priority: Priority.High, acceptanceCriteria: ["A link exists"], source: "Charter",
  });
  await new CreateWorkOrder(repository).execute({
    projectId, id: new WorkOrderId("wo-1"), title: "Implement links", description: "Implement trace links.",
    requirementIds: [new RequirementId("req-1")],
  });
  const start = new StartWorkOrder(repository);
  const stored = await repository.findById(projectId);
  await new MarkWorkOrderReady(repository).execute({ projectId, workOrderId: new WorkOrderId("wo-1") });
  await start.execute({ projectId, workOrderId: new WorkOrderId("wo-1") });
  await new SubmitWorkOrderForReview(repository).execute({ projectId, workOrderId: new WorkOrderId("wo-1") });
  await new CreateReview(repository).execute({ projectId, id: new ReviewId("review-work-order"), target: new WorkOrderId("wo-1"), reviewer: "reviewer" });
  await new StartReview(repository).execute({ projectId, reviewId: new ReviewId("review-work-order") });
  await new ApproveReview(repository).execute({ projectId, reviewId: new ReviewId("review-work-order") });
  await new ApproveWorkOrder(repository).execute({ projectId, workOrderId: new WorkOrderId("wo-1") });
  await new CreateRelease(repository).execute({ projectId, id: new ReleaseId("release-1"), version: "0.1.0", proposedBy: "release-manager" });

  assert.equal(stored?.findWorkOrder(new WorkOrderId("wo-1"))?.statusValue(), WorkOrderStatus.Completed);
  assert.equal(stored?.getReleases()[0]?.version, "0.1.0");
  assert.deepEqual(stored?.getReleases()[0]?.requirementIds.map(String), ["req-1"]);
});

test("list projects use case summarizes persisted projects", async () => {
  const repository = new InMemoryProjectRepository();
  await new CreateProject(repository).execute({ id: new ProjectId("project-a"), name: "Project A" });
  await new CreateProject(repository).execute({ id: new ProjectId("project-b"), name: "Project B" });
  await new CreateRequirement(repository).execute({ projectId: new ProjectId("project-a"), id: new RequirementId("req-a"), title: "Coverage", description: "Must be covered.",
    type: RequirementType.Functional, priority: Priority.Medium, acceptanceCriteria: ["Tracked"], source: "Charter" });

  const summaries = await new ListProjects(repository).execute();
  assert.equal(summaries.length, 2);
  assert.deepEqual(summaries.find((summary) => summary.id === "project-a"), {
    id: "project-a", name: "Project A", requirementCount: 1, workOrderCount: 0, reviewCount: 0, releaseCount: 0,
  });
});

test("stakeholder use case persists stakeholder context", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = new ProjectId("project-stakeholder");
  await new CreateProject(repository).execute({ id: projectId, name: "Stakeholder project" });
  await new CreateStakeholder(repository).execute({ projectId, id: new StakeholderId("stk-1"), name: "Product owner", role: "Sponsor",
    interest: "Delivery", influence: "High", notes: "Approves scope." });
  assert.equal((await repository.findById(projectId))?.getStakeholders()[0]?.name, "Product owner");
});

test("release use case rejects projects with unlinked requirements", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = new ProjectId("project-not-ready");
  await new CreateProject(repository).execute({ id: projectId, name: "Not ready" });
  await new CreateRequirement(repository).execute({ projectId, id: new RequirementId("req-not-ready"), title: "Coverage", description: "Must be covered.",
    type: RequirementType.Functional, priority: Priority.Medium, acceptanceCriteria: ["Linked"], source: "Charter" });
  await assert.rejects(
    new CreateRelease(repository).execute({ projectId, id: new ReleaseId("release-not-ready"), version: "0.1.0", proposedBy: "release-manager" }),
    ReleaseNotReadyError,
  );
});

test("review use case links an independent reviewer to a work order", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = new ProjectId("project-review");
  await new CreateProject(repository).execute({ id: projectId, name: "Review project" });
  await new CreateRequirement(repository).execute({ projectId, id: new RequirementId("req-review"), title: "Review", description: "Review work.",
    type: RequirementType.Functional, priority: Priority.Medium, acceptanceCriteria: ["Review exists"], source: "Charter" });
  await new CreateWorkOrder(repository).execute({ projectId, id: new WorkOrderId("wo-review"), title: "Implement", description: "Implement review.", requirementIds: [new RequirementId("req-review")] });
  await new CreateReview(repository).execute({ projectId, id: new ReviewId("review-1"), target: new WorkOrderId("wo-review"), reviewer: "review-agent" });
  assert.equal((await repository.findById(projectId))?.getReviews()[0]?.reviewer, "review-agent");
});

test("review use cases persist findings and requested changes", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = new ProjectId("project-review-changes");
  await new CreateProject(repository).execute({ id: projectId, name: "Review changes" });
  await new CreateRequirement(repository).execute({ projectId, id: new RequirementId("req-changes"), title: "Review", description: "Review work.",
    type: RequirementType.Functional, priority: Priority.Medium, acceptanceCriteria: ["Review exists"], source: "Charter" });
  await new CreateWorkOrder(repository).execute({ projectId, id: new WorkOrderId("wo-changes"), title: "Implement", description: "Implement review.", requirementIds: [new RequirementId("req-changes")] });
  await new MarkWorkOrderReady(repository).execute({ projectId, workOrderId: new WorkOrderId("wo-changes") });
  await new StartWorkOrder(repository).execute({ projectId, workOrderId: new WorkOrderId("wo-changes") });
  await new SubmitWorkOrderForReview(repository).execute({ projectId, workOrderId: new WorkOrderId("wo-changes") });
  await new CreateReview(repository).execute({ projectId, id: new ReviewId("review-changes"), target: new WorkOrderId("wo-changes"), reviewer: "review-agent" });
  await new StartReview(repository).execute({ projectId, reviewId: new ReviewId("review-changes") });
  await new AddReviewFinding(repository).execute({ projectId, reviewId: new ReviewId("review-changes"), finding: "Add a regression test" });
  await new RequestReviewChanges(repository).execute({ projectId, reviewId: new ReviewId("review-changes") });
  const review = (await repository.findById(projectId))?.findReview(new ReviewId("review-changes"));
  assert.deepEqual(review?.findingsValue(), ["Add a regression test"]);
  assert.equal(review?.statusValue(), ReviewStatus.ChangesRequested);
  assert.equal((await repository.findById(projectId))?.findWorkOrder(new WorkOrderId("wo-changes"))?.statusValue(), WorkOrderStatus.InProgress);
});

test("rejecting a review blocks its work order pending a decision", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = new ProjectId("project-review-rejected");
  await new CreateProject(repository).execute({ id: projectId, name: "Review rejected" });
  await new CreateRequirement(repository).execute({ projectId, id: new RequirementId("req-rejected"), title: "Review", description: "Review work.",
    type: RequirementType.Functional, priority: Priority.Medium, acceptanceCriteria: ["Review exists"], source: "Charter" });
  await new CreateWorkOrder(repository).execute({ projectId, id: new WorkOrderId("wo-rejected"), title: "Implement", description: "Implement review.", requirementIds: [new RequirementId("req-rejected")] });
  await new MarkWorkOrderReady(repository).execute({ projectId, workOrderId: new WorkOrderId("wo-rejected") });
  await new StartWorkOrder(repository).execute({ projectId, workOrderId: new WorkOrderId("wo-rejected") });
  await new SubmitWorkOrderForReview(repository).execute({ projectId, workOrderId: new WorkOrderId("wo-rejected") });
  await new CreateReview(repository).execute({ projectId, id: new ReviewId("review-rejected"), target: new WorkOrderId("wo-rejected"), reviewer: "review-agent" });
  await new StartReview(repository).execute({ projectId, reviewId: new ReviewId("review-rejected") });
  await new RejectReview(repository).execute({ projectId, reviewId: new ReviewId("review-rejected") });
  const review = (await repository.findById(projectId))?.findReview(new ReviewId("review-rejected"));
  assert.equal(review?.statusValue(), ReviewStatus.Rejected);
  assert.equal((await repository.findById(projectId))?.findWorkOrder(new WorkOrderId("wo-rejected"))?.statusValue(), WorkOrderStatus.Blocked);
});

test("ADR use case persists an architectural decision linked to its requirement", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = new ProjectId("project-adr");
  await new CreateProject(repository).execute({ id: projectId, name: "ADR project" });
  await new CreateRequirement(repository).execute({ projectId, id: new RequirementId("req-adr"), title: "Boundaries", description: "Enforce boundaries.",
    type: RequirementType.Functional, priority: Priority.Medium, acceptanceCriteria: ["Core owns rules"], source: "Charter" });
  await new CreateAdr(repository).execute({ projectId, id: new AdrId("adr-1"), title: "Use core", context: "Rules need boundaries.",
    decision: "Use a core package.", consequences: "Adapters depend on core.", requirementIds: [new RequirementId("req-adr")] });
  const adr = (await repository.findById(projectId))?.getAdrs()[0];
  assert.equal(adr?.requirementIds[0]?.value, "req-adr");
});

test("ADR use case rejects references to requirements outside the project", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = new ProjectId("project-adr-missing");
  await new CreateProject(repository).execute({ id: projectId, name: "ADR project" });
  await assert.rejects(
    new CreateAdr(repository).execute({ projectId, id: new AdrId("adr-missing"), title: "Use core", context: "Rules need boundaries.",
      decision: "Use a core package.", consequences: "Adapters depend on core.", requirementIds: [new RequirementId("req-missing")] }),
    MissingRequirementError,
  );
});

test("traceability analysis identifies unlinked requirements", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = new ProjectId("project-analysis");
  await new CreateProject(repository).execute({ id: projectId, name: "Analysis" });
  await new CreateRequirement(repository).execute({ projectId, id: new RequirementId("req-unlinked"), title: "Coverage", description: "Must be covered.",
    type: RequirementType.Functional, priority: Priority.Medium, acceptanceCriteria: ["A work order exists"], source: "Charter" });

  const report = await new AnalyzeProjectTraceability(repository).execute(projectId);
  assert.deepEqual(report.unlinkedRequirementIds, ["req-unlinked"]);
  assert.equal(report.isValid, false);
});

test("traceability analysis reports the full ADR/review/release chain", async () => {
  const repository = new InMemoryProjectRepository();
  const projectId = new ProjectId("project-chain");
  await new CreateProject(repository).execute({ id: projectId, name: "Chain" });
  await new CreateRequirement(repository).execute({ projectId, id: new RequirementId("req-chain"), title: "Chain", description: "Chain work.",
    type: RequirementType.Functional, priority: Priority.Medium, acceptanceCriteria: ["Traced end to end"], source: "Charter" });

  const beforeAdrAndReview = await new AnalyzeProjectTraceability(repository).execute(projectId);
  assert.deepEqual(beforeAdrAndReview.requirementsMissingAdr, ["req-chain"]);

  await new CreateAdr(repository).execute({ projectId, id: new AdrId("adr-chain"), title: "Use core", context: "Rules need boundaries.",
    decision: "Use a core package.", consequences: "Adapters depend on core.", requirementIds: [new RequirementId("req-chain")] });
  await new CreateWorkOrder(repository).execute({ projectId, id: new WorkOrderId("wo-chain"), title: "Implement", description: "Implement chain.", requirementIds: [new RequirementId("req-chain")] });

  const beforeReview = await new AnalyzeProjectTraceability(repository).execute(projectId);
  assert.deepEqual(beforeReview.requirementsMissingAdr, []);
  assert.deepEqual(beforeReview.requirementsMissingApprovedReview, ["req-chain"]);
  assert.equal(beforeReview.isValid, true);

  await new MarkWorkOrderReady(repository).execute({ projectId, workOrderId: new WorkOrderId("wo-chain") });
  await new StartWorkOrder(repository).execute({ projectId, workOrderId: new WorkOrderId("wo-chain") });
  await new SubmitWorkOrderForReview(repository).execute({ projectId, workOrderId: new WorkOrderId("wo-chain") });
  await new CreateReview(repository).execute({ projectId, id: new ReviewId("review-chain"), target: new WorkOrderId("wo-chain"), reviewer: "reviewer" });
  await new StartReview(repository).execute({ projectId, reviewId: new ReviewId("review-chain") });
  await new ApproveReview(repository).execute({ projectId, reviewId: new ReviewId("review-chain") });
  await new ApproveWorkOrder(repository).execute({ projectId, workOrderId: new WorkOrderId("wo-chain") });
  await new CreateRelease(repository).execute({ projectId, id: new ReleaseId("release-chain"), version: "0.1.0", proposedBy: "release-manager" });

  const report = await new AnalyzeProjectTraceability(repository).execute(projectId);
  const [entry] = report.requirementTraceability;
  assert.deepEqual(entry?.adrIds, ["adr-chain"]);
  assert.deepEqual(entry?.workOrderIds, ["wo-chain"]);
  assert.deepEqual(entry?.reviewedWorkOrderIds, ["wo-chain"]);
  assert.deepEqual(entry?.releaseIds, ["release-chain"]);
  assert.deepEqual(report.requirementsMissingAdr, []);
  assert.deepEqual(report.requirementsMissingApprovedReview, []);
});
