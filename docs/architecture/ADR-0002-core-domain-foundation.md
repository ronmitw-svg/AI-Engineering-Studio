# ADR-0002: Establish a typed core-domain foundation

**Status:** Accepted · **Date:** 2026-07-21 · **Review date:** 2026-07-26

## Problem

The bootstrap core used primitive IDs and mutable state without executable invariants.

## Options

1. Keep rules in CLI/UI adapters. 2. Introduce a typed core-domain package.

## Evaluation

Option 1 duplicates rules and prevents reliable governance. Option 2 isolates
invariants and allows all adapters to share one model.

## Decision

Adopt option 2: `@aes/core` owns typed identifiers, domain errors, aggregates,
events, repository contracts, and traceability rules.

## Rationale

The decision enforces the Core First Architecture and makes invalid state
transitions testable.

## Impact

Adapters depend on core; business-state violations use typed errors; quality
gates execute core tests.

## Requirement References

SRS-0001, STR-0001, WO-0001.
