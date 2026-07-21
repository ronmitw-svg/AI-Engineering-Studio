# ADR-0002: Establish a typed core-domain foundation

**Status:** Accepted  
**Date:** 2026-07-21

## Context

The bootstrap core represented business concepts with mutable classes and
primitive string IDs. Work-order transitions could bypass review, and the
repository had no executable proof of the intended invariants.

## Decision

`@aes/core` owns typed identifier value objects, domain errors, aggregate
lifecycles, repository contracts, and a traceability graph. Adapters (CLI,
filesystem, UI, and future AI providers) must depend on this public API rather
than reimplementing business rules. Core unit tests use Node's built-in test
runner to keep the initial dependency footprint small.

## Consequences

- Work-order completion requires review approval.
- Business-state violations are typed domain errors, not generic errors.
- The core package has a real `test` script, so the root quality gate executes
  domain tests.
- This is a foundation only: persistence, application use cases, releases,
  human approvals, and AI providers remain future milestones.
