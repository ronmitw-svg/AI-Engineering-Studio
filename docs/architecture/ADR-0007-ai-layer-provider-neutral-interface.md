# ADR-0007: Provider-neutral AI interface, starting with an Anthropic-backed ADR drafting assistant

**Status:** Accepted · **Date:** 2026-07-26 · **Review date:** 2026-10-26

## Problem

The last open milestone from the implementation handover is an AI layer:
a provider-neutral interface, with structured Work Orders/ADRs as agent
input, and no provider-specific logic in `@aes/core`. Without a first
concrete capability this stays abstract; the handover named ADR drafting
as a good first slice: `@aes/core` already models
`ArchitectureDecisionRecord` starting in `Proposed` status with an
explicit human `accept()`/`reject()` gate, so AI-authored content has
somewhere safe to land without ever being auto-trusted.

## Options

1. Put the Anthropic SDK call directly in `packages/cli`, no shared
   interface.
2. Define an `AiProvider` port in `@aes/core` (mirroring how
   `ProjectRepository` already works for persistence), implement it in a
   new `@aes/ai` package, and add a `DraftAdr` application use case in
   `@aes/core` that depends only on the port.
3. Same as option 2, but skip the real Anthropic adapter for now and only
   ship the interface plus a mock provider.

## Evaluation

Option 1 works for one CLI command but reintroduces exactly what Core
First Architecture forbids elsewhere: business logic (here, how an ADR
gets drafted and validated) living in an adapter instead of `@aes/core`,
and it hard-codes Anthropic everywhere a second provider would need to be
added later. Option 3 is safer to ship blind but the user explicitly
asked for the real integration now, including API key handling; shipping
an interface nobody has exercised against a real model risks discovering
prompt/parsing problems only after they're expensive to fix. Option 2
costs one new package and matches the same port/adapter pattern already
proven for persistence (`ProjectRepository` / `FileSystemProjectRepository`).

## Decision

Adopt option 2. `@aes/core` gets an `AiProvider` port
(`complete(request): Promise<string>`) and a `DraftAdr` use case that
builds a prompt from the project's name and the requirements the
decision addresses, asks the provider for a JSON object with
`context`/`decision`/`consequences` (the fields `ArchitectureDecisionRecord`
actually persists - not the richer 8-field CSDS document template, which
governs the separate `docs/architecture/*.md` files, not this in-app
aggregate), parses and validates that response, and persists the result
through `Project.createAdr()` exactly like a human-authored ADR. A new
`@aes/ai` package implements the port against the real Anthropic Messages
API, reading the API key from an environment variable, never a
committed value (CSDS §11.4).

## Rationale

Every other adapter in this codebase (CLI, filesystem) is a thin shell
around `@aes/core` use cases; the AI layer should be no different; a
provider is just another external system Core doesn't know about. Landing
the AI's output through the existing `createAdr()` validation and
`Proposed` status means no new governance surface had to be invented -
the same human-approval gate every other ADR goes through applies here
unchanged.

## Impact

`@aes/core` gains a dependency-free `AiProvider` interface (no SDK, no
network code). New `@aes/ai` package depends on `@anthropic-ai/sdk`.
`aes ai draft-adr` requires `ANTHROPIC_API_KEY` to be set; the CLI adapter
reads it, not `@aes/core`. The `DraftAdr` use case is tested with a fake
`AiProvider` (deterministic, no network); the real `AnthropicAiProvider`
has its own test that automatically skips unless `ANTHROPIC_API_KEY` is
present in the environment, so CI stays green without secrets configured
until/unless the project decides to add one.

## Requirement References

SRS-0001, STR-0001, RTM-0001.
