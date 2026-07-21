# ADR-0003: Put workflows behind application use cases

**Status:** Accepted  
**Date:** 2026-07-21

## Decision

Application workflows are implemented in `@aes/core/src/application` and use
repository interfaces instead of filesystem, UI, or CLI APIs. The CLI is a
thin adapter that performs workspace diagnostics only; it does not implement
domain workflows.

## Consequences

- Project, requirement, and work-order changes are orchestrated through
  explicit use cases.
- A future filesystem repository can implement `ProjectRepository` without
  changing the domain or application layer.
- CLI generation commands remain deferred until the persistent adapter and
  input/output artefact format are defined.
