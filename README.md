# AI Engineering Studio

AI Engineering Studio is a governed, AI-native engineering workspace. It
models requirements, work orders, reviews, decisions, and traceability before
automation or agents change software.

## Current capabilities

- Typed core-domain aggregates for projects, requirements, work orders, ADRs,
  stakeholders, reviews, and releases, each with an enforced lifecycle
  rather than a free-form status.
- A controlled work-order lifecycle: `Planned → Ready → InProgress → Review →
  Completed`, with explicit blocking, cancellation, and review-driven
  return-to-implementation. Completion requires an approved, independent
  review — a work order's own implementer cannot review it.
- Requirements traceability across the full Requirement → ADR → WorkOrder →
  Review → Release chain (`aes validate` / `aes traceability`).
- Governed releases: `aes release create` only succeeds once every
  requirement is linked to a completed work order, requires a human
  `approve`/`reject`, and rejects self-approval by the proposer.
- A provider-neutral AI layer (`@aes/ai`, Anthropic-backed): `aes ai
  draft-adr` drafts an ADR from a project's requirements, always landing
  as `Proposed` pending human review.
- A local Studio dashboard (`apps/studio`, `pnpm dev`) showing a
  project's requirements, work orders, ADRs, reviews, releases, and
  traceability findings.
- A workspace diagnostic command: `aes doctor`.

## Prerequisites

- Node.js 24.16.0
- pnpm 11.13.1

## Development

```sh
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build
node packages/cli/dist/index.js doctor --workspace .
```

Persisted projects can be created and inspected with (`aes` is
`packages/cli`'s bin name; run it via `node packages/cli/dist/index.js`
unless you've `npm link`ed it, since pnpm doesn't put it on `PATH` by
itself):

```sh
node packages/cli/dist/index.js init demo "Demo project"
node packages/cli/dist/index.js generate requirement demo req-1 "Traceability" "Track work" --source charter
node packages/cli/dist/index.js generate work-order demo wo-1 "Implement links" "Connect artefacts" --requirement req-1
node packages/cli/dist/index.js traceability demo
```

Run `node packages/cli/dist/index.js --help` for the full command list
(work orders, ADRs, stakeholders, reviews, releases, and AI-assisted ADR
drafting via `ai draft-adr`).

See [the architecture decisions](docs/architecture/), the
[repository audit](docs/reviews/REPOSITORY-AUDIT-001.md), and the
[changelog](CHANGELOG.md) for the implemented foundation, decisions made
along the way, and known gaps.
