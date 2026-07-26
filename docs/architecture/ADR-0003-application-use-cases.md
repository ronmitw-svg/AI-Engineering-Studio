# ADR-0003: Put workflows behind application use cases

**Status:** Accepted · **Date:** 2026-07-21 · **Review date:** 2026-07-26

## Problem

CLI and future UI adapters require workflows without owning business logic.

## Options

1. Put orchestration in each adapter. 2. Introduce application use cases.

## Evaluation

Option 1 duplicates behaviour. Option 2 centralizes orchestration over core
repository contracts.

## Decision

Adopt option 2 in `@aes/core/src/application`.

## Rationale

Use cases create a stable boundary for CLI, filesystem, and future UI adapters.

## Impact

Project, requirement, work-order, review, stakeholder, ADR, traceability, and
release workflows are invoked through explicit use cases.

## Requirement References

SRS-0001, WO-0001.
