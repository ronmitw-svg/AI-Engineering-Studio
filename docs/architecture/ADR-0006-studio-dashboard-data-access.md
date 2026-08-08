# ADR-0006: Studio reads workspace data through a Vite dev-server API, not the browser

**Status:** Accepted · **Date:** 2026-07-26 · **Review date:** 2026-11-26

## Problem

The Studio dashboard milestone needs to show projects, requirements, work
orders, reviews, and traceability - all persisted by `@aes/filesystem` as
JSON under `.aes/projects/`. `@aes/filesystem` uses `node:fs/promises`,
which does not exist in a browser. `apps/studio` is a plain Vite + React
app with no server component. Something has to bridge the persisted,
Node-only data to the browser UI before any dashboard component can be
built, and per CSDS §9.4 that bridge is architecturally significant enough
(affects `apps/studio`, and how future adapters reach `@aes/core`) to
record before writing UI code against it.

## Options

1. Introduce a standalone, deployable server package (e.g. `apps/api`)
   that runs `@aes/core` + `@aes/filesystem` behind HTTP, started
   separately from `pnpm dev`.
2. Give the browser direct filesystem access via the File System Access
   API, with a second `ProjectRepository` implementation built on it.
3. Add a small Vite dev-server middleware inside `apps/studio` (using
   Vite's `configureServer` plugin hook) that wraps `@aes/core` use cases
   and `@aes/filesystem`, exposed only while running `pnpm dev`.

## Evaluation

Option 1 is the right shape once Studio needs to run somewhere persistent
(a shared/deployed instance, `services/` in the reserved workspace
layout), but that need doesn't exist yet, and running a second managed
process just to show a first read-only dashboard is disproportionate
(CSDS proportionality: match ceremony to actual project size). Option 2
would require a second `ProjectRepository` implementation with different
persistence semantics (per-directory permission grants, no path-based
`--workspace` argument like the CLI has), diverging from the
already-established, tested filesystem adapter for no immediate benefit.
Option 3 reuses the exact same `@aes/filesystem` + `@aes/core` the CLI
already depends on, adds no new process to manage, and is the idiomatic
Vite mechanism for exactly this "local API alongside the dev server"
case.

## Decision

Adopt option 3. `apps/studio` gets a Vite plugin (`server/api.ts`) that
registers Express-free `server.middlewares` routes under `/api/*`,
constructing a `FileSystemProjectRepository` rooted at the same
`--workspace`-equivalent directory the CLI uses (defaulting to the
process's working directory, overridable via an environment variable),
and calling the same `@aes/core` use cases (`ListProjects`,
`AnalyzeProjectTraceability`) the CLI calls. No business logic is
duplicated or reimplemented in the middleware or in React components.

## Rationale

This keeps Core First Architecture intact - the middleware is exactly as
thin an adapter as the CLI, calling the same use cases - while deferring
the real cost (a standalone deployable server, auth, multi-user access)
until there's an actual requirement for Studio to run anywhere other than
a contributor's machine next to `pnpm dev`.

## Impact

The dashboard only works under `pnpm dev`; `vite build`'s static output
has no server and cannot serve `/api/*`. This is acceptable for now since
Studio has no deployment target yet (ROADMAP.md is still empty and the
reference project scope in this repository is local-first, matching the
CLI). Revisit this ADR (superseding it, not editing it) if/when Studio
needs to run as a deployed, shared, or multi-user service - at that point
option 1 becomes the right call.

## Requirement References

SRS-0001, STR-0001, RTM-0001.
