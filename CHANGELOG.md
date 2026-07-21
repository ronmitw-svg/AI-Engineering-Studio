# Changelog

All notable changes to this project are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/), versioning follows
[Semantic Versioning](https://semver.org/) as required by CSDS §14.1; no
version has been tagged/released yet, so all entries below are grouped
under Unreleased.

## [Unreleased]

### Added
- `feat`: Bootstrap AI Engineering Studio foundation — pnpm/Turborepo
  monorepo (`apps/studio` React+Vite app, `packages/core` domain model,
  `packages/cli` CLI skeleton) (0b984f4).
- CSDS repository governance: wired a minimal CI pipeline
  (typecheck/lint/build/test via `.github/workflows/ci.yml`), added a
  first Repository Health Check record (`docs/reviews/`), and stored the
  governing CSDS v1.5.0 standard under `docs/standards/` for traceability.

### Changed
- `chore`: Clean repository bootstrap (ad77007).

### Known gaps
- Commit `d17c55a` ("Bootstrap monorepo workspace") predates Conventional
  Commits adoption and does not carry a `type:` prefix; left as historical
  record rather than rewritten, per CSDS §14.5 (no history rewriting once
  work may be based on it).
