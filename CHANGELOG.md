# Changelog

All notable changes to this project are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/), versioning follows
[Semantic Versioning](https://semver.org/) as required by CSDS §14.1. No
version has been tagged/released yet, so everything below is grouped
under Unreleased.

## [Unreleased]

### Added

- **Core domain** (`@aes/core`): typed identifiers (path-traversal-safe by
  construction), domain errors, and governed aggregates — `Project`,
  `Requirement`, `WorkOrder`, `ArchitectureDecisionRecord`, `Stakeholder`,
  `Review`, `Release` — each with an explicit, enforced lifecycle rather
  than a free-form status field.
- **Governed work-order lifecycle**: `Planned → Ready → InProgress →
  Review → Completed`, plus `Blocked`/`Cancelled`, plus review-driven
  return to `InProgress` on requested changes. Completion requires an
  `Approved` review; a work order's own `assignedAgent` cannot review it.
- **Requirements traceability**: every ADR and work order must reference
  the requirement(s) it addresses; `AnalyzeProjectTraceability` reports
  the full Requirement → ADR → WorkOrder → Review → Release chain,
  including unlinked requirements and missing ADR/review coverage.
- **Governed ADRs**: every ADR records who proposed it and starts
  `Proposed`; `accept`/`reject` require a human decision, and the
  proposer cannot accept their own ADR (the same rule now applies
  consistently to ADRs, work-order reviews, and releases).
- **Governed releases**: `CreateRelease` only succeeds once every
  requirement is linked to a completed work order; every release records
  which requirements it includes, starts as `Draft`, and requires human
  `approve`/`reject` — self-approval by the proposer is rejected.
- **Application use cases** for all of the above (create/start/submit
  /approve/reject/list/analyze), independent of any adapter.
- **`@aes/filesystem`**: atomic, schema-versioned JSON persistence under
  `.aes/projects/`, with directory listing for `findAll()`.
- **`@aes/cli`** (`aes`): `doctor`, `init`, `list`, `generate
  requirement|work-order|adr|stakeholder|review`, `work-order
  ready|start|submit|approve`, `review start|approve|reject|request-changes
  |finding`, `adr accept|reject`, `release create|approve|reject`,
  `validate`, `traceability`, and `ai draft-adr`.
- **`@aes/ai`**: a provider-neutral `AiProvider` port in `@aes/core`, with
  a real Anthropic-backed implementation and a `DraftAdr` use case that
  drafts an ADR's context/decision/consequences from a project's
  requirements — always landing as `Proposed`, never auto-trusted.
- **Studio dashboard** (`apps/studio`): a local Vite dev-server API
  (`/api/projects`, `/api/projects/:id`) backed by the same use cases the
  CLI uses, and a UI showing requirements, work orders, ADRs, reviews,
  releases, and traceability findings per project — covered by vitest +
  Testing Library component tests, in addition to the API's own tests.
- **CI**: `.github/workflows/ci.yml` runs install/typecheck/lint/test
  /build on every push and PR; `release.yml` runs the same gate on
  version tags and manual dispatch.
- Architecture decisions recorded as ADR-0001 through ADR-0007 under
  `docs/architecture/`, in CSDS §9.3 format from ADR-0002 onward.

### Fixed

- Identifiers used as filesystem paths were not restricted to a safe
  character set, allowing path traversal (e.g. `aes init "../../x"`);
  fixed in the shared `Identifier` base class every ID extends.
- `ReleaseId` bypassed that same fix by duplicating identifier validation
  instead of extending `Identifier`; unified.
- A `Rejected` review had no consequence for its work order (unlike
  `ChangesRequested`); rejection now blocks the work order pending an
  explicit human decision.
- `.github/workflows/documentation.yml`, `quality-gates.yml`, and
  `release.yml` were empty, so every push failed CI with "No event
  triggers defined". `release.yml` now has real content; the other two
  (pure duplicates of `ci.yml`) were removed. `ci.yml` was also missing
  its Lint step.
- `@aes/core`, `@aes/cli`, `@aes/filesystem`, and `@aes/ai` had no `lint`
  script, so `pnpm lint`/CI only ever checked `apps/studio`.
- The Studio dashboard never rendered Architecture Decisions.

### Removed

- `TraceabilityGraph`/`TraceabilityLink` and `Document`/`DocumentStatus`:
  unused scaffolding from the initial bootstrap, never wired into any use
  case.

### Known gaps

- `docs/discovery/`, `docs/stakeholders/STK-0001.md`,
  `docs/requirements/`, `docs/work-orders/WO-0001.md`, and
  `docs/traceability/RTM-0001.md` are still empty placeholders — a real
  Discovery Interview and Stakeholder Analysis (CSDS Chapters 5–6) have
  not been performed for this project itself.
