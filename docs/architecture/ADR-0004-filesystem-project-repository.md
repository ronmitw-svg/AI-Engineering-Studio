# ADR-0004: Persist projects as versioned filesystem snapshots

**Status:** Accepted · **Date:** 2026-07-24 · **Review date:** 2026-07-26

## Problem

Application use cases need durable local storage without coupling core to the filesystem.

## Options

1. Let core write files. 2. Implement `ProjectRepository` in a filesystem package.

## Evaluation

Option 1 breaks the architecture boundary. Option 2 keeps persistence an adapter
and supports migrations through explicit snapshots.

## Decision

Adopt option 2: `@aes/filesystem` atomically persists schema-versioned project
snapshots under `.aes/projects/`.

## Rationale

The adapter keeps core portable while providing reliable local persistence.

## Impact

All persisted identifiers are restricted to safe filename characters; snapshot
migrations remain explicit when the schema evolves.

## Requirement References

SRS-0001, STR-0001, RTM-0001.
