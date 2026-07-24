# ADR-0004: Persist projects as versioned filesystem snapshots

**Status:** Accepted  
**Date:** 2026-07-24

## Decision

`@aes/filesystem` implements the core `ProjectRepository` contract. Each
project is stored atomically as `.aes/projects/<project-id>.json` using schema
version `1`. Core supplies typed snapshots and rehydrates aggregates; it has
no filesystem dependency.

## Consequences

- CLI and future UI adapters can persist application use-case results locally.
- Snapshot migrations are explicit when the schema changes.
- Filesystem concerns remain outside the domain and application layers.
