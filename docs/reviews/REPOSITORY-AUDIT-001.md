# Repository Audit 001 — AI Engineering Studio

**Date:** 2026-07-21  
**Scope:** Phase 0 repository audit  
**Branch:** `codex/repository-audit-001`

## Executive Summary

The repository is a small, bootstrapped pnpm/Turborepo workspace. It has a
valid build and the currently defined package-level TypeScript checks pass.
However, it is not yet an engineering foundation suitable for the target
architecture: the core domain is incomplete and permits invalid business
states, there are no automated tests, the declared GitHub Actions workflows
are empty, and several tracked documentation files are empty placeholders.

The existing repository must be evolved, not replaced. The present core code
is useful as a minimal scaffold, but should be **refactored** before it becomes
a dependency of a CLI, UI, or infrastructure layer.

## Current State

### Repository Structure

```text
apps/
  studio/                 React 19 + Vite 8 application (starter screen)
packages/
  core/                   Small TypeScript domain scaffold
  cli/                    Commander-based `aes doctor` prototype
docs/
  architecture/, discovery/, requirements/, reviews/, stakeholders/,
  traceability/, work-orders/   Mostly placeholder artefact locations
.github/workflows/        Four tracked but empty workflow files
```

The configured workspace globs also reserve `services/*` and `plugins/*`, but
there are currently no packages in either location.

### Packages and Apps

| Area | Current implementation | Assessment |
| --- | --- | --- |
| `@aes/core` | `Project`, `Requirement`, `WorkOrder`, `Entity`, and `AggregateRoot`; two status enums | Refactor; valuable scaffold, insufficient domain model and invariants |
| `@aes/cli` | Commander entry point with a fixed-success `aes doctor` command | Keep as a shell, refactor to call application use cases |
| `apps/studio` | Default Vite/React starter UI | Keep isolated; defer product UI work |

### Toolchain and Dependencies

- Node.js: `v24.16.0`
- pnpm: `11.13.1`; root `packageManager` matches the installed version.
- Build orchestration: Turborepo `2.10.5`.
- Root TypeScript: `5.9.2`.
- Studio TypeScript: `~6.0.2`; Vite `8.1.1` is declared (installed build
  reported `8.1.5`).
- Core has no runtime dependencies. CLI uses `commander`, `kleur`, and
  `fs-extra`; the latter two are not used by the current CLI source.

### Build System and TypeScript

The root scripts correctly delegate `build`, `typecheck`, `test`, `lint`, and
`dev` to Turbo. `@aes/core` and `@aes/cli` each define `build` and
`typecheck`. Studio defines `build` and `lint`, but no `typecheck` script.

`tsconfig.base.json` enables strict TypeScript and NodeNext module semantics.
Core and CLI extend it. Studio deliberately uses its own Vite-oriented,
bundler-resolution configuration and does not extend the root base config.
This separation is valid, but the two TypeScript version ranges should be
consolidated or explicitly justified before shared packages are consumed by
the app.

### Existing Source Code

- `Project` currently stores requirements and work orders in arrays, but does
  not protect duplicate IDs, expose a creation factory, or model the required
  domain relationships.
- `Requirement` has only ID, title, and description; it lacks type, priority,
  status, acceptance criteria, source, and timestamps.
- `WorkOrder` has a partial state model. It lacks `Blocked`, dependencies,
  requirement links, acceptance criteria, assigned agent, artefacts, and
  review information. `complete()` permits `InProgress → Completed`, bypassing
  review; `markReady()` permits every state to move to `Ready`; all failures
  are generic `Error` instances.
- `Entity.equals()` compares IDs by JavaScript reference/value equality. That
  will be inadequate once ID value objects are introduced unless their
  equality contract is defined.
- `Document` and `DocumentStatus` are unrelated to the target domain model;
  no decision has yet been documented on their role.
- The core barrel exports only `Project` and `Document`, leaving the other
  existing core types unavailable to consumers.
- The CLI reports success without inspecting the workspace and contains
  business-independent command wiring only.
- The Studio application is the Vite starter interface and is not connected to
  core or CLI packages. This is appropriate to leave untouched during the
  domain-foundation milestone.

### Documentation and Automation

`README.md` contains only the project name, bootstrap status, and a CSDS
reference. `ARCHITECTURE.md`, `PROJECT_CHARTER.md`, `ROADMAP.md`,
`CONTRIBUTING.md`, `SECURITY.md`, and every currently tracked structured
artefact in `docs/` were empty at audit time. The four GitHub Actions workflow
files are likewise empty, so no remote CI, documentation validation, quality
gate, or release workflow exists despite their filenames.

## Verification Results

| Command | Result | Notes |
| --- | --- | --- |
| `pnpm install --frozen-lockfile` | Passed | Dependencies were already current. pnpm emitted a non-fatal metadata-fetch warning for `registry.npmjs.org/pnpm`. |
| `pnpm typecheck` | Passed | Turbo ran two tasks: `@aes/core` and `@aes/cli`. Studio was not typechecked because it has no matching script. |
| `pnpm test` | Passed with no coverage | Turbo executed zero tasks because no package defines `test`. |
| `pnpm build` | Passed | Core, CLI, and Studio built successfully. |

## Problems and Technical Debt

1. No unit tests exist, including tests for the required work-order lifecycle
   invariants.
2. `pnpm test` is a false-positive quality signal: it exits successfully while
   executing no test task.
3. GitHub Actions workflow files are empty. Branch protection cannot currently
   rely on repository-provided CI checks.
4. The `WorkOrder` lifecycle does not enforce the specified sequence and uses
   generic errors rather than domain errors.
5. The core package has primitive string IDs and no value-object, error,
   event, repository, or domain-service boundaries for the proposed model.
6. Required domain concepts are absent: ADR, Stakeholder, Review, Release,
   traceability, audit trail, human approval, and repository interfaces.
7. The package lacks an application layer; neither UI nor CLI can yet call
   stable use cases.
8. Empty documentation files and an almost empty README provide no usable
   onboarding, architecture rationale, contribution, or security guidance.
9. `turbo.json` does not declare `test` outputs/coverage or typecheck task
   dependencies, and no lint script exists in core or CLI.
10. The repository has different root and Studio TypeScript version ranges,
    increasing future compatibility risk for shared types.

## Architecture Gap

| Target architecture | Current state | Gap |
| --- | --- | --- |
| Rich `packages/core` domain | Minimal entities with partial lifecycle | High |
| Application use cases | Absent | High |
| Infrastructure packages/repository implementations | Absent | High |
| Governed CLI | One hard-coded diagnostic command | High |
| Studio UI on stable use cases | Isolated starter UI | Expected/deferred |
| Traceability and quality gates | Placeholder docs and no tests/CI | High |
| AI provider and agents | Absent | Expected/deferred |

## Recommended Next Steps

### P0 — Establish a trustworthy core baseline

1. Add a test runner and package-level `test` scripts. Implement failing and
   passing invariant tests before refactoring the aggregates.
2. Introduce core domain primitives: validated ID value objects, `DomainError`
   subclasses, a clock/ID-generation boundary where needed, and explicit
   exported public API.
3. Refactor `Requirement` and `WorkOrder` as aggregates with factories,
   encapsulated state, and only valid lifecycle transitions. Include
   `Blocked`, review submission, cancellation rules, and typed links to
   requirements.
4. Add a minimal GitHub Actions CI workflow that runs frozen install,
   typecheck, tests, and build on supported Node/pnpm versions.

### P1 — Complete the target-domain foundation

1. Add ADR, Stakeholder, Review, and Traceability domain models with tests.
2. Define repository interfaces in core, without filesystem imports.
3. Decide and document whether `Document`/`DocumentStatus` remain a domain
   abstraction, become a supporting artefact model, or are removed.
4. Create an application package/layer and add the first use cases:
   create project/requirement/work order, start/submit/approve work order,
   and generate traceability.

### P2 — Add controlled delivery interfaces

1. Make `aes doctor` perform real, read-only checks through application or
   infrastructure boundaries; add the planned generation and validation
   commands only after their use cases exist.
2. Implement an initial filesystem infrastructure adapter and artefact format.
3. Replace the Studio starter screen only when the application contracts are
   stable.

### P3 — Governance and AI capabilities

1. Add audit trail, explicit human-approval records, release validation, and
   role separation rules.
2. Add provider-neutral AI contracts and controlled agent execution driven by
   work orders.
3. Expand quality gates for security, compliance, traceability completeness,
   and release readiness.

## Keep / Refactor / Replace Decisions

| Item | Decision | Rationale |
| --- | --- | --- |
| pnpm workspace and Turbo setup | Keep | Correct minimal monorepo basis and matches target layout. |
| Core `Entity` / `AggregateRoot` | Refactor | Good direction, but needs typed ID equality and typed domain events. |
| Core `Project`, `Requirement`, `WorkOrder` | Refactor | Existing code is a useful scaffold but does not meet required invariants/model. |
| `Document` / `DocumentStatus` | Decide before extending | Current role is unclear and disconnected from exports/target model. |
| CLI command registration | Keep and refactor | Appropriate adapter shell; move validation behavior behind use cases. |
| Studio UI | Keep unchanged | UI implementation is intentionally deferred until contracts stabilize. |
| Empty workflows and docs | Replace with actual content | Their current state provides no effective engineering control or guidance. |

## Audit Conclusion

There is no critical build blocker. The next implementation milestone should
be **Core Domain Foundation**, starting with test infrastructure and the
domain primitives plus `Requirement` and `WorkOrder` aggregates. The work
should remain isolated from UI expansion and should be delivered in small,
test-backed commits.
