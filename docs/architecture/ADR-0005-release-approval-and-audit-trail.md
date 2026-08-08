# ADR-0005: Require independent human approval and an audit trail for releases

**Status:** Accepted · **Date:** 2026-07-26 · **Review date:** 2026-10-26

## Problem

A `Release` previously carried only an id, version, and creation timestamp.
Once `CreateRelease`'s readiness gate passed, the release existed with no
further checkpoint, no record of who decided to ship it, and no way to tell
later whether "release" meant a reviewed, human-approved decision or just a
timestamp. CSDS requires that security/release-relevant decisions are not
automated without an explicit human-approval model, and that no agent acts as
both implementer/proposer and approver of the same work.

## Options

1. Leave `Release` as a plain record; treat "created" as "released".
2. Add a `status` field (`Draft`/`Approved`/`Rejected`) plus an `approve`/
   `reject` action requiring an explicit actor, but no persisted history.
3. Add the status lifecycle from option 2, and require every proposal and
   every decision to append to a persisted, append-only audit trail on the
   release itself.

## Evaluation

Option 1 requires no new code but leaves release approval undocumented and
unenforceable - exactly the gap CSDS's human-approval and auditability
principles exist to close. Option 2 introduces the approval gate but a
review would still have no way to see the release's history after the fact,
only its current state. Option 3 costs one extra field and a few lines per
transition, and directly produces the "who did what, when" record CSDS
Repository/Quality reviews need, without introducing a separate audit
subsystem.

## Decision

Adopt option 3. `Release` starts in `Draft` with a required `proposedBy`
actor recorded as the first audit entry. `approve(approvedBy)` and
`reject(rejectedBy)` are only valid from `Draft`, are otherwise
irreversible, and each append a timestamped audit entry. `approve` throws
`SeparationOfDutiesError` if the approver is the same actor who proposed the
release.

## Rationale

Keeping the audit trail on the aggregate itself (rather than a separate
event store) matches how `Review.findings` and `WorkOrder.blockedFrom`
already carry their own history, needs no new infrastructure, and survives
the existing filesystem snapshot/rehydrate mechanism unchanged. Rejecting
self-approval directly enforces the "no agent implements, reviews, and
approves the same work" governance rule for the one place it wasn't checked
anywhere yet.

## Impact

`CreateRelease` now requires `proposedBy`; `aes release` became a subcommand
group (`create` / `approve` / `reject`) instead of a single flat command.
Existing persisted release snapshots without `proposedBy`/`status`/
`auditTrail` cannot be rehydrated as-is; none exist yet outside local
development, so no migration was written.

## Requirement References

SRS-0001, STR-0001, RTM-0001.
