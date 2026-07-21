# AI Engineering Studio

Status: Bootstrap

Governed by [CSDS](docs/standards/CSDS-v1.5.0.md) v1.5.0.

## Layout

- `apps/studio` — React + Vite front end.
- `packages/core` — domain model (`Project`, `Requirement`, `WorkOrder`, `Document`).
- `packages/cli` — `aes` CLI (`aes doctor`).

## Run / build / test

Requires Node 22 and pnpm 11 (`packageManager` field pins the exact version).

```sh
pnpm install
pnpm dev        # apps/studio dev server
pnpm build      # build all workspace packages
pnpm lint       # lint all workspace packages
pnpm typecheck  # typecheck all workspace packages
pnpm test       # run test suite (none yet — see docs/reviews/QG-0001.md)
```

## Key docs

- [docs/reviews/QG-0001.md](docs/reviews/QG-0001.md) — latest Repository Health Check and open gaps.
- [docs/standards/CSDS-v1.5.0.md](docs/standards/CSDS-v1.5.0.md) — the governing standard.
- `docs/discovery/`, `docs/stakeholders/`, `docs/requirements/`, `docs/architecture/`, `docs/work-orders/`, `docs/traceability/` — CSDS artifact slots (currently placeholders, see QG-0001 for status).
