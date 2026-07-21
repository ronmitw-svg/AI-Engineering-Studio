# AI Engineering Studio

AI Engineering Studio is a governed, AI-native engineering workspace. It
models requirements, work orders, reviews, decisions, and traceability before
automation or agents change software.

## Current capabilities

- Typed core-domain aggregates for projects, requirements, work orders, ADRs,
  stakeholders, reviews, and traceability.
- A controlled work-order lifecycle: `Planned → Ready → InProgress → Review →
  Completed`, with explicit blocking and cancellation rules.
- Application use cases for creating projects, requirements, and work orders,
  and for starting, submitting, and approving work orders.
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

See [the architecture decisions](docs/architecture/) and the
[repository audit](docs/reviews/REPOSITORY-AUDIT-001.md) for the implemented
foundation and planned milestones.
