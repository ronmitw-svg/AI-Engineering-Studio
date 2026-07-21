# Colditz Software Development Standard (CSDS) — v1.5.0

> Reference copy of the governing standard for this project, provided by the
> project owner (Ronny Colditz). Stored here so automated and human Repository
> Health Checks (CSDS Chapter 21) have a durable, in-repo source of truth
> instead of depending on an external upload.
>
> This is a plain-text extraction of the original HTML document. Formatting
> (tables, nested lists) is flattened to sequential text; chapter/section
> numbers are preserved so it can still be cited precisely (e.g. "CSDS
> §21.1"). If a formatting ambiguity ever matters, treat the original HTML as
> authoritative.

---


  Colditz Software Development Standard (CSDS)

Colditz Software Development Standard (CSDS)

Version 1.5.0

Ronny Colditz

00 — Preface

What this is

What this is
not

How to read this document

Provenance

01 — Purpose, Scope and
Principles

1.1 Purpose

1.2 The orchestration model

1.3 Scope

1.4
Governing principles

02 — Standards Landscape

2.1 Orchestrated
(externally governed) concerns

2.2 CSDS
original extensions (no adequate existing standard)

2.3 How to read a “combined
with” cell

2.4 Adding a new
orchestrated standard

03 —
Glossary

3.1 Requirement
keywords (RFC 2119 / RFC 8174 style)

3.2 Core terms

3.3
Exceptions to a MUST

3.4
Numbering conventions

04 —
Software Development Lifecycle

4.1 Selection

4.2 The mandatory phase flow

4.3 Mapping to ISO/IEC/IEEE
12207

4.4 Iteration within the
flow

05 — Project
Bootstrap and Discovery Interview

5.1 Purpose

5.2
Rule: the interview ends on completeness, not on a question
count

5.3 Process

5.4 AI-conducted interviews

5.5
Repository Bootstrap

06 — Stakeholder Analysis

6.1 Purpose

6.2 Required stakeholder
register

6.3 Minimum
stakeholder categories to consider

6.4 Relationship to the
Discovery Interview

6.5 Gate

07 — Requirements
Engineering and the SRS

7.1 Selection

7.2
Precondition

7.3 SRS
structure

7.4 Requirement identity and
quality

7.5
Requirement levels

7.6 Requirements Review gate

7.7 Change
control

7.8
Stakeholder Requirements Specification (StRS) and the two-stage
gate

08 — Requirements
Traceability

8.1 The
mandatory chain

8.2 Minimum recording
mechanism

8.3 Rules

8.4 Traceability and change

8.5 Gate

09 — Software Architecture and
Architecture Decision Records

9.1 Selection

9.2 Minimum architecture
artifacts

9.3 ADR format

9.4 Rules

9.5 Gate

10 — API Design Standard

10.1
Contract-first rule

10.2 Minimum contract content

10.3 Rules

10.4 Gate

11 — Security and
Identity Standard

11.1
ASVS level selection

11.2 Authentication /
authorization

11.3 Combination with API
Design

11.4 Gate

12 — AI Development
and Prompt Engineering Standard

12.1 Scope

12.2 Principles

12.3 Prompt engineering rules

12.4 What this chapter does
not cover

12.5 Gate

13 — Agent, Character,
LLM and MCP Integration Standard

13.1 Agent
engineering

13.2
Character engineering

13.3 LLM
integration

13.4 MCP (Model Context
Protocol) integration

13.5 Gate

14 — Version Control
Standard

14.1
Semantic Versioning

14.2
Conventional Commits

14.3 Combination
rule: commit type → version bump

14.4
Commit documentation

14.5 Minimal branching model

14.6 Gate

15 — Testing Standard

15.1 The pyramid, as enforced

15.2 Rules

15.3 Non-determinism
(LLM/agent components)

15.4 Gate

16 — Quality Model and
Reviews

16.1 ISO/IEC
25010 characteristics, mapped to checks

16.2 Review
types

16.3
Who performs a review

16.4 Chapter-level
self-critique

16.5 Gate

17 — Documentation as Code and
Documentation Impact Analysis

17.1 Docs as
Code

17.2
Documentation Impact Analysis (mandatory, pre-commit)

17.3 Rule

17.4 What counts as “affected”

17.5 Gate

17.6 Documentation
Synchronization

17.7 Gate (Documentation
Synchronization)

18 — Commit Documentation
Standard

18.1 Rule

18.2
Proportionality

18.3
Relationship to the Documentation Impact Analysis

18.4 Where it
lives

18.5 Gate

19 —
Work Orders

19.1 Definition

19.2
Change Impact Analysis (mandatory, before implementation)

19.3 Work
Order content

19.4 Lifecycle of a Work
Order

19.5 Relationship to
Scrum/Kanban

19.6 Gate

20 — Quality Gates
and Definition of Done

20.1 Gates
before merge

20.2
Definition of Done

20.3 Rule:
gates are not negotiable per deadline pressure

20.4 Release
gate

21 — Repository
Governance and Health Checks

21.1 Required repository
layout

21.2 Repository Bootstrap

21.3 Periodic Repository
Health Checks

21.4 Recording a health check

21.5 Gate

22 — Project Management

22.1 Selection

22.2 Combination with Work
Orders

22.3 Scrum specifics under
CSDS

22.4 Kanban specifics under
CSDS

22.5 Gate

23 — Release Management

23.1 Releasing a
CSDS-governed project

23.2
Post-release

23.3 Versioning policy for
CSDS itself

23.4 Chapter numbering
stability

23.5
Publishing v1.0.0

24 — Reference Project

24.1 What it is

24.2 Mapping

24.3 Scope limitations,
stated explicitly

24.4
Keeping it in sync

24.5 Proportional
demonstration for Part IX

Appendix A — Templates
and Checklists

Requirements
Traceability Matrix (RTM) — recommended shape

Using these templates

Appendix B — Standards
Index

Note on
versions

Appendix C — Quality
Mapping Matrix

Using this
table

Appendix D — Master Index

25 — Vision & Mission

25.1 The problem CSDS exists
to solve

25.2 Why an
orchestration standard, not a new one

25.3 Long-term
vision

25.4 The test for
adding anything new to CSDS

26 — Engineering Persona
Model

26.1 Roles

26.2 Role consolidation on
small projects

26.3 Recording role
assignment

26.4 Organizational
scaling for larger teams

26.5 Standing AI role
designation

27 —
AI Governance

27.1 The three
layers

27.2 The
seven domains

27.3 Recording the governance
table

27.4 Gate

28 — Configuration
Management

28.1 Selection

28.2 Environment management

28.3 Configuration strategy

28.4 Secrets

28.5 Feature
flags

28.6 Deployment and
runtime configuration

28.7 Configuration validation

28.8 Configuration versioning

28.9 Gate

29 — Project Health
Dashboard

29.1 Categories

29.2
Per-category fields

29.3 Status
thresholds

29.4 Recording

29.5 Gate

30 — Engineering Interviews

30.1 The
general method

30.2 The
eight instances

30.3 Completeness checklists

30.4 Why fixed
question counts are prohibited

30.5 Gate

31 — Data
Protection, Compliance & Audit Trails

31.1 Selection

31.2 Data protection
by design and by default

31.3 Data Subject Rights (DSR)

31.4 Audit trails (CSDS
original extension)

31.5 Electronic
signatures (lightweight orchestration)

31.6 Retention and deletion
policy

31.7 Data
Protection Impact Assessment (DPIA) trigger

31.8 Gate

32 —
Multi-Tenancy & Service Reliability

32.1 Selection, and
repeal of the prior exclusion

32.2 Tenant isolation model

32.3 Multi-tenant
architecture requirements

32.4
Service Level Objectives, Indicators, and error budgets

32.5
Incident management

32.6 Low-downtime deployment

32.7 Gate

33 — Enterprise
Identity & Integration

33.1 Selection

33.2 Extending
Chapter 11’s flow-selection table

33.3 Provisioning and
deprovisioning

33.4
Attribute/role mapping

33.5 Partner/B2B API
contracts

33.6 Gate

34 — Product
Longevity & Internationalization

34.1 Selection

34.2
Deprecation policy

34.3 Multi-version support
matrix

34.4 Internationalization
(i18n) readiness

34.5 Localization (l10n)
process

34.6 Gate

00 — Preface

Purpose: Orient a first-time reader before they hit
any normative content. Scope: What CSDS is and is not,
how to read it, and its provenance principle.
Responsibilities: Documentation Owner — Chapter 26.
Process: Read once, before any other chapter.
Outputs: A correct mental model of what CSDS is for.
Quality criteria: Maintainability (Usability of the
standard itself) — see Appendix C.
Review criteria: Editorial Review (Chapter 16, §16.4).
Related standards: None. Related
chapters: 1, 3, 25.

What this is

The Colditz Software Development Standard (CSDS) is the binding
engineering standard for Ronny Colditz’s software projects. It is a
meta-standard: a document about how to use standards,
not a replacement for them.

Every serious concern in software engineering — how to write
requirements, how to design an API, how to authenticate a user, how to
structure a commit history — already has a mature, peer-reviewed
international standard behind it. The recurring failure in real projects
is not the absence of these standards; it is the absence of a coherent
decision about which one applies when, how several of them fit
together, and what happens in the gaps between them. CSDS is
that decision, written down once so it does not have to be re-litigated
on every project.

What this is not

CSDS is not a rewrite of ISO/IEC/IEEE 29148,
ISO/IEC 25010, OWASP ASVS, OpenAPI, OAuth 2.1, or any other referenced
standard. Where CSDS discusses one of these, it discusses when and
how it is used — the authoritative content stays in the source
standard, cited in Appendix
B.

CSDS is not a project’s documentation. A project’s
SRS, ADRs, and README belong to that project, produced using
CSDS templates — they are not part of CSDS itself.

CSDS is not a single prompt or a style guide. It is
a versioned document with its own lifecycle, described in Chapter 23.

How to read this document

CSDS is organized as independently versioned chapters (Part 0 through
Part VIII, see the Table of Contents). Read Part
0 first — it defines the vocabulary and the orchestration method every
later chapter relies on. After that, chapters can be consulted
individually; each one names, near the top, which external standard (if
any) it orchestrates and what CSDS adds.

RFC 2119 keywords (MUST, SHOULD,
MAY) are used throughout with the meaning defined in Chapter 3 — Glossary. A
MUST is a gate condition — a project cannot pass a CSDS
review while violating one.

Provenance

CSDS is developed alongside a small reference project that exercises
every mandatory rule in running code. A rule that cannot be demonstrated
in the reference project is treated as unproven and is not published in
a numbered release.

01 — Purpose, Scope and
Principles

Purpose: State the one decision CSDS exists to make
durable, and the method (Selection/Combination/Extension/Application)
every orchestrating chapter follows. Scope: Purpose,
scope boundaries, and the eight governing principles referenced
throughout CSDS. Responsibilities: Product Owner,
Documentation Owner — Chapter 26.
Process: Read once; revisited whenever a new chapter’s
justification is being evaluated (§1.4, principle 2; Chapter 25, §25.4).
Outputs: The orchestration method used to justify every
later chapter’s existence. Quality criteria:
Maintainability — see Appendix C.
Review criteria: Editorial Review (Chapter 16, §16.4).
Related standards: None directly. Related
chapters: 2, 25.

1.1 Purpose

CSDS exists to make one decision durable: for any given
engineering concern, which standard governs it, how it interacts with
the other standards in force, and what CSDS requires beyond
them. Without that decision, every new project either
re-derives it from scratch (slow, inconsistent) or skips it (fast,
unreviewable).

1.2 The orchestration model

CSDS treats every external standard it references through four
operations. Every chapter that orchestrates an external standard
(Chapters 4, 7, 9, 10, 11, 14, 15, 16, 22, 28, 31, 32, 33) is structured
around these four:

Operation
Question it answers
Example

Selection
Which standard applies to this concern, and why this one over
alternatives?
ISO/IEC/IEEE 29148 is selected for requirements over ad-hoc
user-story-only backlogs because CSDS requires traceability to release
(§8).

Combination
How does this standard’s output feed the input of another?
An SRS requirement (29148) becomes a C4 container/component (Chapter
9), which becomes an OpenAPI operation (Chapter 10), which becomes a
test case (Chapter 15).

Extension
Where does the standard stop short of what CSDS needs, and what
original rule fills the gap?
29148 does not define how AI agents may draft requirements on a
human’s behalf — Chapter 12 adds that rule.

Application
What concrete, checkable artifact makes this enforceable in a real
repository?
The SRS template plus the
Requirements Review gate in Chapter 20.

A CSDS chapter that only restated an external standard’s content
would be redundant with that standard and would drift out of sync with
it over time. A CSDS chapter is only justified if it does orchestration
work the source standard does not and cannot do for itself (a standard
cannot know about the other standards a project also has to
satisfy).

1.3 Scope

CSDS applies to all software projects — web, backend service, CLI
tool, or AI/agent system — undertaken for Ronny Colditz from this
standard’s adoption date forward. It covers the full lifecycle from
project idea to release (Chapter 4) and the standard’s own governance
(CONTRIBUTING.md).

CSDS does not cover:

Language- or framework-specific style guides (a project MAY adopt
its own, referenced from its README).

Business/product strategy decisions upstream of “there is a project
to build.”

Infrastructure and platform operations beyond what is needed to
release, observe, and reliably run a project — with one exception:
multi-tenant production services MUST additionally follow Chapter
32 (tenant isolation, SLOs, incident management), which
repeals this exclusion for that project class as of v1.2.0. Deep SRE
practice beyond Chapter 32’s scope (e.g. capacity planning at large
scale) remains a candidate future extension
(ROADMAP.md).

1.4 Governing principles

Orchestrate, don’t reinvent. If an established
standard already answers a question, CSDS points to it instead of
restating it.

Extend only where there is a genuine gap. Original
CSDS rules exist for AI/agent engineering, repository governance, work
orders, and the documentation/commit discipline that ties the
orchestrated standards together — because no existing standard covers
these adequately today.

Simplicity over complexity. Given two ways to
satisfy a requirement, CSDS prefers the one with fewer moving
parts.

Quality over speed. A gate (Chapter 20) is never
skipped to save time; if a gate is too slow, the gate is fixed, not
bypassed.

Every MUST is checkable. A rule that cannot be
verified by a human against a checklist or by tooling in CI is not a
MUST — it is guidance, and is written as SHOULD or MAY instead.

No implementation without approved requirements.
See the mandatory flow in the root README and
Chapter 4.

The standard is dogfooded. CSDS changes itself
using the process it mandates for projects
(CONTRIBUTING.md).

Practical validation before publication. A rule
ships in a numbered release only once the reference project demonstrates
it.

02 — Standards Landscape

Purpose: Provide the single master matrix every
other chapter’s justification is checked against.
Scope: Every orchestrated external standard and every
CSDS-original extension, one row each.
Responsibilities: Software Architect, Documentation
Owner — Chapter 26.
Process: Consulted before adding any new chapter (§2.4;
Chapter 25, §25.4). Outputs: Two tables (§2.1, §2.2)
that between them account for every chapter in the Table of Contents.
Quality criteria: Compatibility, Maintainability — see
Appendix C.
Review criteria: Architecture Review, Editorial Review
(Chapter 16). Related standards: All standards in Appendix B. Related
chapters: 1, 25.

This chapter is the master orchestration matrix. Every row names a
concern, the standard CSDS selects for it, what it must
combine with, the original CSDS
extension (if any), and the CSDS chapter that applies
it. Full citations are in Appendix B.

2.1 Orchestrated
(externally governed) concerns

#
Concern
Standard selected
Combined with
CSDS extension
Chapter

1
Requirements engineering
ISO/IEC/IEEE 29148
Stakeholder analysis (6), traceability (8)
Discovery Interview as mandatory precondition; mandatory freeze gate
between 29148’s StRS and SyRS/SRS document types with a
no-orphaned-requirement rule (§7.8)
7

2
Software lifecycle
ISO/IEC/IEEE 12207
All other rows, sequenced
Concrete mandatory phase gate order
4

3
Software quality characteristics
ISO/IEC 25010
Quality Review gate (20), ADRs (9)
Mapping from quality characteristic to reviewable checklist
item
16

4
Software architecture views
C4 Model
ADRs, requirements traceability (8)
ADR template combining C4 level with decision record
9

5
Architecture layering
Clean Architecture
C4 Model (component level)
Applied only where C4 alone under-specifies dependency direction;
optional per project
9

6
API contracts
OpenAPI 3.1
Requirements (7), architecture (9)
Mandatory contract-first order of operations
10

7
Application security
OWASP ASVS
Quality gates (20), security review
Level selection rule (which ASVS level per project risk)
11

8
Authentication / authorization
OAuth 2.1, OpenID Connect
Security standard (11), API design (10)
Default flow selection per client type
11

9
Versioning of software artifacts
Semantic Versioning
Release management (23)
Applied uniformly to code, API, and CSDS itself
14, 23

10
Commit message format
Conventional Commits
Commit documentation (18)
Commit documentation body appended to the Conventional Commits
header
14, 18

11
Project/iteration management
Scrum, Kanban
Work Orders (19), lifecycle (4)
Work Order as the shared unit of work across both
22

12
Test strategy
Test Pyramid
Traceability (8), quality gates (20)
Minimum coverage shape enforced at the gate, not just
recommended
15

13
Documentation practice
Docs as Code, Markdown, GitHub
Every chapter’s own artifacts
Mandatory pre-commit Documentation Impact Analysis
17

23
Configuration management
The Twelve-Factor App (Config)
Security/secrets (11), Repository governance (21)
Concrete feature-flag, validation, and versioning rules the
methodology leaves open
28

29
Data protection / privacy regulation
GDPR/DSGVO, ISO/IEC 27001 (reference)
Requirements (7), traceability (8), security (11)
Audit trail immutability, retention/deletion policy, DPIA trigger —
the code-level gap neither standard specifies
31

30
Service reliability operations
Site Reliability Engineering (SRE) practice
Quality gates (20), health dashboard (29)
Tenant isolation model selection; incident management folded into
existing Work Order/gate machinery
32

31
Enterprise identity federation
SAML 2.0, SCIM 2.0
Security/identity (11)
Extends Chapter 11’s flow table with the enterprise-IdP case;
mandatory deprovisioning time bound
33

32
Long-term versioning at scale; locale data
Semantic Versioning (extended), Unicode CLDR
Version control (14), release management (23)
Deprecation-stage policy and multi-version support matrix; i18n/l10n
readiness rules
34

2.2 CSDS
original extensions (no adequate existing standard)

These concerns are not orchestration of an external standard — CSDS
defines them directly because no international standard adequately
covers modern AI-assisted and agent-based development, or the specific
governance glue CSDS needs between the rows above.

#
Concern
Why no existing standard suffices
Chapter

14
Project bootstrap & Discovery Interview
29148 assumes requirements elicitation has already started; it does
not define the structured interview that precedes it
5

15
AI development & prompt engineering
No mature, stable international standard yet governs prompt design
and validation
12

16
Agent, character, LLM & MCP integration
Same gap, extended to multi-step agents, persona/character
definitions, and tool-integration protocols
13

17
Commit documentation
Conventional Commits standardizes the header, not the
rationale/impact/rollback body CSDS requires
18

18
Documentation Impact Analysis
Docs as Code says documentation lives with code; it does not mandate
a pre-commit impact check
17

19
Work Orders
Scrum/Kanban define flow, not a concrete artifact linking
requirement → implementation → documentation → commit
19

20
Repository governance & health checks
No external standard defines CSDS’s specific repository layout and
periodic health check
21

21
Quality gates & Definition of Done composition
25010 defines quality characteristics, not which gates a specific
project must pass before merge
20

22
AI-assisted review
Neither 25010 nor ASVS anticipates a reviewer that is itself an
LLM/agent
16

24
Vision/mission articulation for an orchestration standard
No external standard states why an adopting organization should
orchestrate rather than reinvent
25

25
Engineering role accountability
Common practice (Scrum, RACI) covers pieces of this; none covers the
full role set CSDS’s chapters need
26

26
AI governance layering (Policy/Implementation/Operations) plus
Knowledge and Memory Governance
Extends rows 15-16’s gap; no standard yet covers agent
knowledge/memory boundaries
27

27
Cross-cutting project health aggregation
No standard defines a dashboard aggregating other reviews’ output
over time
29

28
Generalized engineering interview method
Extends row 14’s gap (Discovery Interview) to
Requirements/Architecture/Security/Quality/Release/Repository/AI
reviews
30

2.3 How to read a “combined
with” cell

“Combined with” means: the output artifact of one standard’s process
is a required input to another’s. For example, row 6 (OpenAPI) is
combined with row 1 (requirements): CSDS requires that every OpenAPI
operation traces back to a requirement ID (Chapter 8), and forbids
adding an endpoint that exists only in the spec with no corresponding
requirement, or vice versa.

2.4 Adding a new
orchestrated standard

When a future need arises that an existing row does not cover:

Confirm no existing chapter already covers it under a different name
(avoid duplicate orchestration of the same concern).

Add a row to §2.1 or §2.2 as appropriate.

Add or extend the corresponding chapter, following the
four-operation structure in Chapter 1.

Add the standard’s citation to Appendix B.

This is a MINOR version change to CSDS
(CONTRIBUTING.md).

03 — Glossary

Purpose: Fix one meaning per term so no chapter has
to redefine it. Scope: RFC 2119 keywords, core CSDS
terms, exception handling, and ID/numbering conventions.
Responsibilities: Documentation Owner — Chapter 26.
Process: Updated whenever a new chapter introduces a
term used outside that chapter. Outputs: The single
definition every other chapter links back to. Quality
criteria: Maintainability — see Appendix C.
Review criteria: Editorial Review, Consistency Review
(Chapter 16, §16.4). Related standards: RFC 2119 / RFC
8174. Related chapters: All — this chapter is
referenced throughout.

3.1 Requirement
keywords (RFC 2119 / RFC 8174 style)

Keyword
Meaning in CSDS

MUST / MUST NOT
A gate condition. A project fails the relevant CSDS review (Chapter
20) while it is violated. Not negotiable per-project without a recorded
exception (see 3.3).

SHOULD / SHOULD NOT
A strong default. Deviating is allowed but MUST be justified in an
ADR (Chapter 9) or the relevant review record.

MAY
Optional. Left to project judgment with no justification
required.

3.2 Core terms

Term
Definition

CSDS
Colditz Software Development Standard — this document.

Meta-standard / orchestration standard
A standard whose subject matter is the selection, combination,
extension, and application of other standards, rather than a technical
concern in its own right (Chapter 1).

Chapter
A single numbered, independently versionable file under
docs/ that is a complete unit of the standard.

Project
A discrete piece of software governed by CSDS, with its own
repository, SRS, and release history.

Reference project
The one project that exists purely to demonstrate CSDS rules in
running code (Chapter 24); not itself a product.

Work Order
The atomic unit of planned work in CSDS: one requirement or coherent
group of requirements, carried from acceptance through implementation,
test, documentation, and commit (Chapter 19).

Gate
A checkable condition that MUST pass before a project may proceed to
the next lifecycle phase (Chapter 20).

Review
A structured evaluation against a checklist, producing a pass/fail
record. CSDS defines Requirements, Architecture, Documentation, Quality,
Security, Repository, and AI reviews (Chapter 16, 20).

ADR (Architecture Decision Record)
A record of one architecturally significant decision: problem,
options, evaluation, decision, rationale, impact, review date (Chapter
9).

StRS (Stakeholder Requirements Specification)
The frozen, reviewed baseline of Business/Stakeholder/System-level
requirements (STR-xxx), approved before SRS drafting may
begin (Chapter 7, §7.8).

SRS (Software Requirements Specification)
The authoritative Software/Derived-Requirements/Acceptance-Criteria
document for a project, structured per ISO/IEC/IEEE 29148 (Chapter 7),
drafted only after the StRS is approved and frozen.

Traceability
The maintained link from a requirement ID through architecture,
implementation, and test, to the release that satisfies it (Chapter
8).

Documentation Impact Analysis (DIA)
The mandatory pre-commit check of which documents a change affects,
and why others do not need to change (Chapter 17).

Commit documentation
The structured body (goal, motivation, changes, impact, risks,
rollback, lessons learned, follow-ups) attached to a non-trivial commit
(Chapter 18).

Discovery Interview
The structured, open-ended interview that precedes SRS drafting and
ends only when requirements, risks, assumptions, and open points are
understood — not after a fixed number of questions (Chapter 5).

Agent
An LLM-driven actor that plans and executes multi-step work with
some autonomy, as distinct from a single prompt/response interaction
(Chapter 13).

Character engineering
The deliberate design of an AI agent’s persona, tone, and behavioral
boundaries as a first-class engineering artifact (Chapter 13).

MCP (Model Context Protocol)
The protocol used to connect an LLM/agent to external tools and data
sources (Chapter 13).

Definition of Done (DoD)
The complete checklist that MUST be satisfied before a Work Order is
declared complete (Chapter 20).

Requirements Traceability Matrix (RTM)
The table recording, per requirement, its architecture element,
implementation, test, documentation location, and release (Chapter 8,
Appendix A).

Derived Requirement
A requirement produced by an architecture/design decision made in
service of a Software Requirement, itself given a REQ-xxx
ID and traced (Chapter 7, §7.5).

Change Impact Analysis
The mandatory pre-implementation assessment of a Work Order’s effect
on Requirements, Architecture, Implementation, Tests, Documentation,
Deployment, and Operations (Chapter 19, §19.2).

Documentation Synchronization
The canonical list of document kinds a Documentation Impact Analysis
must explicitly consider (Chapter 17, §17.6).

Engineering Interview
The general, completeness-gated (never fixed-question-count) method
behind the Discovery Interview and seven other review-preceding
interview instances (Chapter 30).

Persona / Role
One of the eleven named responsibility sets (Product Owner,
Stakeholder, Requirements Engineer, Software Architect, Lead Developer,
Quality Manager, Security Reviewer, Documentation Owner, Release
Manager, AI Agent, Repository Maintainer) defined in Chapter 26.

AI Governance layers
Policy / Implementation / Operations — the three-layer structure
applied to AI, Prompt, Knowledge, Memory, Character, Tool, and Agent
Governance (Chapter 27).

Project Health Dashboard
The consolidated, dated snapshot of
Repository/Requirements/Architecture/Documentation/Quality/Security/Technical
Debt/AI Readiness health (Chapter 29).

3.3 Exceptions to a MUST

A MUST MAY be waived for a specific project only via
a recorded exception: an ADR (Chapter 9) stating which rule is waived,
why, the risk accepted, and a review date. An unrecorded deviation from
a MUST is a standard violation, not an implicit exception.

3.4 Numbering conventions

Stakeholder Requirement IDs:
STR-<3-digit number>, e.g. STR-001
(Chapter 7, §7.8).

Requirement IDs: REQ-<3-digit number>,
e.g. REQ-001 (Chapter 7).

ADR IDs: ADR-<4-digit number>,
e.g. ADR-0001 (Chapter 9).

Chapter numbers are stable once published; see Chapter 23 for the renumbering
policy.

04 — Software Development Lifecycle

Purpose: Fix one phase order every project follows,
so “what comes next” is never a per-project debate.
Scope: The mandatory phase flow and its mapping to
ISO/IEC/IEEE 12207 process groups. Responsibilities:
Product Owner, Release Manager — Chapter 26.
Process: This chapter defines the process every other
chapter’s content slots into. Outputs: The phase
sequence gating when later chapters’ work may begin. Quality
criteria: Reliability, Maintainability — see Appendix C.
Review criteria: Checked implicitly by every gate in
Chapter 20. Related standards: ISO/IEC/IEEE 12207.
Related chapters: 5, 20, 22.

Orchestrates: ISO/IEC/IEEE 12207 (Software Life
Cycle Processes). Combined with: every other chapter,
sequenced into one phase order. CSDS extension: a
single, concrete, mandatory phase sequence with named gates, rather than
12207’s menu of processes a project may combine freely.

4.1 Selection

ISO/IEC/IEEE 12207 defines a comprehensive set of life cycle
processes (agreement, organizational, technical, and supporting
processes) but deliberately leaves it to each organization to select and
sequence them. CSDS makes that selection once, for all projects, so it
never has to be re-decided per project.

4.2 The mandatory phase flow

Project Idea
  → Discovery Interview            (Chapter 5)
  → Stakeholder Analysis           (Chapter 6)
  → Stakeholder Requirements Specification (StRS), reviewed and frozen
                                    (Chapter 7, §7.8)
  → Software Requirements Specification (SRS, ISO/IEC/IEEE 29148, Chapter 7)
  → Requirements Review → Approval (Chapter 20)
  → Software Architecture          (Chapter 9)
  → Technical Design               (Chapter 9, 10)
  → Repository Bootstrap           (Chapter 21)
  → Implementation                 (Chapters 12-14)
  → Testing                        (Chapter 15)
  → Review                         (Chapter 16, 20)
  → Release                        (Chapter 23)
Rules:

MUST NOT begin Implementation before the
Requirements Review gate has passed. An approved SRS is a precondition,
not a formality.

MUST NOT skip a phase. A trivial project still
passes through every phase, but a phase MAY be completed in minutes
rather than days (e.g. a one-paragraph Discovery Interview record for a
five-requirement project) — proportionality applies to depth,
not to presence.

Phases MAY iterate (e.g. new requirements
discovered during Implementation re-enter at Requirements Engineering
for that increment) but MUST NOT retroactively bypass
the gate that already passed for the requirements already
implemented.

4.3 Mapping to ISO/IEC/IEEE
12207

CSDS phase
12207 process group
Primary 12207 process

Discovery Interview, Stakeholder Analysis
Agreement / Organizational Project-Enabling
Stakeholder Needs and Requirements Definition

Requirements Engineering, SRS
Technical
Requirements Analysis

Software Architecture, Technical Design
Technical
Architecture Definition, Design Definition

Repository Bootstrap
Technical / Supporting
Configuration Management (setup)

Implementation
Technical
Implementation

Testing
Technical
Integration, Verification, Validation

Review
Supporting
Quality Assurance, Verification

Release
Technical
Transition, Release Management

CSDS does not require every 12207 process by name in project
artifacts; it requires the outcome of the relevant process
group, achieved through the CSDS phase and its gate.

4.4 Iteration within the flow

CSDS is compatible with iterative delivery (Chapter 22):
“Implementation” above is not one monolithic phase but a sequence of
Work Orders (Chapter 19), each of which still individually passes
through Testing and Review before being counted as done. The phase flow
describes the shape of the process; Scrum/Kanban (Chapter 22)
describe its cadence.

05 — Project
Bootstrap and Discovery Interview

Purpose: Ensure no project starts implementing
before it has been understood, and that “understood” means something
checkable. Scope: The Discovery Interview’s
completeness rule and Repository Bootstrap. The interview method itself
is generalized to other review types in Chapter 30 — this chapter
keeps the original, most detailed instance.
Responsibilities: Requirements Engineer, Repository
Maintainer (Bootstrap) — Chapter 26.
Process: Project idea → Discovery Interview (§5.2-5.4)
→ Stakeholder Analysis (Chapter 6) → … → Repository Bootstrap (§5.5).
Outputs: A Discovery Interview record; a bootstrapped
repository. Quality criteria: Functional Suitability,
Maintainability — see Appendix C.
Review criteria: Requirements Review, conducted as the
Project Discovery interview instance (Chapter 30, §30.2).
Related standards: None directly (fills a gap in
ISO/IEC/IEEE 29148’s scope, per §2.2 below). Related
chapters: 6, 21, 30.

CSDS original extension (see Chapter 2, §2.2, row 14).
ISO/IEC/IEEE 29148 assumes requirements elicitation is already under
way; it does not define what happens before the first requirement is
written down. CSDS fills that gap.

5.1 Purpose

No implementation, and no requirements specification (StRS or SRS,
Chapter 7, §7.8), begins before a Discovery Interview has been
conducted. Its purpose is to convert a project idea — however vague —
into enough shared understanding to start structured requirements
engineering (Chapter 7) responsibly.

5.2
Rule: the interview ends on completeness, not on a question count

The Discovery Interview MUST NOT be treated as
complete after a fixed number of questions. It is complete when the
interviewer (human or AI agent conducting it under CSDS) has actively
identified, for the project at hand:

Missing information — what is needed to specify the
system that has not yet been stated.

Contradictions — statements from the same or
different stakeholders that cannot both be true.

Risks — technical, schedule, or organizational
risks visible at this stage.

Assumptions — things being taken for granted that
should be stated explicitly and confirmed.

Constraints — technical, legal, budgetary, or
timeline boundaries.

Non-functional requirements — performance,
security, availability, accessibility, compliance expectations, even if
the stakeholder did not volunteer them.

Open points — questions that remain genuinely
unresolved and must be carried forward explicitly rather than silently
assumed.

An interview that has not produced an explicit statement for each of
the seven items above (even if the statement is “none identified,
checked explicitly”) MUST NOT be considered done.

5.3 Process

Start from the project idea as given, however informal.

Ask open questions; follow up on vague or conflicting answers rather
than accepting the first answer at face value.

After each round, re-check the seven items in §5.2. If any is not
yet covered, continue the interview.

When all seven are covered, produce a Discovery Interview
record (see the checklist)
summarizing findings under each of the seven headings.

Proceed to Stakeholder
Analysis, which may surface a need to reopen the interview (this is
normal and not a process failure).

5.4 AI-conducted interviews

Where an AI agent conducts the Discovery Interview (the common case
under CSDS), Chapter 12/13 rules apply in addition: the agent
MUST surface its own uncertainty rather than silently
filling gaps with plausible-sounding assumptions, and
MUST record any assumption it made explicitly under
item 4, not bury it in generated requirements text.

The interviewer MAY use adversarial, interrogative
interview tooling — asking follow-up questions until every item in §5.2
is actually covered, rather than accepting a first answer — instead of
an unstructured conversation; one example is Matt Pocock’s
grill-me Claude Code skill (mattpocock/skills). This
is a non-normative tooling suggestion, not a CSDS-orchestrated standard
(Chapter 2): whatever conducts the interview, its output
MUST still be distilled into a Discovery Interview
record satisfying §5.2/§5.3 — a raw transcript is not itself the
record.

5.5 Repository Bootstrap

Once requirements are approved (Chapter 20) and
architecture/technical design (Chapter 9) exist, Repository
Bootstrap creates the project’s initial structure before
Implementation starts:

Repository created per Chapter 21’s
required layout.

StRS.md and SRS.md (or equivalent, per Chapter 7)
committed as the frozen stakeholder and approved software requirements
baselines.

CI pipeline stub wired to at least run build + lint on push (Chapter
20).

First ADR recorded for the foundational architecture choice (Chapter
9).

Bootstrap is itself a Work Order (Chapter 19) and is subject to the
same Definition of Done as any other (Chapter 20).

06 — Stakeholder Analysis

Purpose: Fix whose needs a requirement traces back
to before any requirement is written. Scope: The
required stakeholder register and its minimum categories.
Responsibilities: Requirements Engineer, Stakeholder —
Chapter 26.
Process: Runs during/after the Discovery Interview
(§6.4), before SRS drafting. Outputs: A stakeholder
register. Quality criteria: Functional Suitability,
Usability — see Appendix C.
Review criteria: Requirements Review (Chapter 16,
§16.2). Related standards: ISO/IEC/IEEE 29148’s
stakeholder needs concept. Related chapters: 5, 7.

Orchestrates: ISO/IEC/IEEE 29148’s stakeholder needs
concept. Combined with: Discovery Interview (Chapter 5)
output; feeds Requirements Engineering (Chapter 7). CSDS
extension: a required, lightweight stakeholder register — 29148
requires stakeholder needs to be captured but does not mandate a
specific artifact shape; CSDS fixes one so every project produces the
same table.

6.1 Purpose

Requirements have no meaning without knowing whose needs they satisfy
and who can approve, block, or be affected by them. Stakeholder Analysis
makes that explicit before requirements are drafted, so the SRS (Chapter
7) can state, for each requirement, whose need it traces back to.

6.2 Required stakeholder
register

For every project, a stakeholder register MUST exist
listing, at minimum:

Field
Description

Name / role
Who or what role (may be a role rather than a named individual for
small projects)

Interest
What they need from the system

Influence
Their ability to change requirements or block release
(Low/Medium/High)

Approval authority
Do they hold sign-off power over the Requirements Review gate
(Chapter 20)?

Communication need
How and how often they need to be informed or consulted

This register MAY be a short section inside the SRS
for small projects, or a separate STAKEHOLDERS.md for
larger ones — CSDS does not mandate the file, only the content and the
fact that it precedes the SRS.

6.3 Minimum
stakeholder categories to consider

Every project MUST explicitly consider, even if the
answer is “not applicable,” the following categories before declaring
the register complete:

Sponsor — who initiated and funds the project (for
Ronny Colditz projects, typically Ronny Colditz himself).

End users — who directly uses the resulting
system.

Operators/maintainers — who runs and maintains it
after release.

Security/compliance — whoever’s constraints bind
the project (even if informal for internal tools).

Downstream/integrating systems — other systems or
projects that consume this project’s output (relevant for API-first
projects, Chapter 10).

6.4 Relationship to the
Discovery Interview

Stakeholder Analysis typically starts during the Discovery Interview
(Chapter 5) and is finalized immediately after it. If Stakeholder
Analysis surfaces a stakeholder whose needs were not covered in the
interview, the interview MUST be reopened for that
stakeholder’s perspective before Requirements Engineering (Chapter 7)
proceeds.

6.5 Gate

The Requirements Review gate (Chapter 20) MUST NOT
pass unless the stakeholder register exists and every requirement in the
SRS can be traced to at least one stakeholder’s stated interest (Chapter
8).

07 — Requirements
Engineering and the SRS

Purpose: Fix one authoritative requirements document
per project, written at the right level, only after enough context
exists to write it responsibly — and never lose a stakeholder-raised
requirement between elicitation and the frozen SRS.
Scope: The two-stage specification process (Stakeholder
Requirements Specification, StRS, §7.8, followed by the Software
Requirements Specification, SRS), requirement identity and quality
rules, the six requirement levels (§7.5), and the Requirements Review
gate. Traceability beyond the SRS is Chapter 8’s scope.
Responsibilities: Requirements Engineer (drafts,
maintains), Product Owner (approves both StRS and SRS) — Chapter 26.
Process: Discovery Interview and Stakeholder Analysis
complete → draft and freeze StRS (§7.8) → draft SRS → Requirements
Review interview (Chapter 30) → approval. Outputs: An
approved, frozen StRS; an approved SRS with unique, verifiable, traced
requirements, each traced back to the StRS item it satisfies.
Quality criteria: Functional Suitability, Performance
Efficiency, Usability, Reliability, Security — see Appendix C.
Review criteria: Requirements Review (Chapter 16,
§16.2). Related standards: ISO/IEC/IEEE 29148
(Requirements Engineering). Related chapters: 5, 6, 8, 9, 30.

CSDS extension: a fixed, minimal SRS structure (the
SRS template), a mandatory
precondition (Discovery Interview + Stakeholder Analysis complete), the
six-level requirement hierarchy (§7.5), and a mandatory freeze gate
between 29148’s two recognized requirements document types — the
Stakeholder Requirements Specification (StRS) and the System/Software
Requirements Specification (SyRS/SRS) — with a no-orphaned-requirement
rule so that a requirement raised during elicitation can never be
silently dropped before it reaches the SRS (§7.8). 29148 names both
document types; it does not mandate that a project actually use both, or
checkably prevent loss between them — CSDS closes that gap.

7.1 Selection

ISO/IEC/IEEE 29148 is selected as the authority for requirements
content, structure, and quality characteristics (necessity, unambiguity,
verifiability, and so on). CSDS does not restate 29148’s requirements
quality criteria; it adopts them and adds the operational scaffolding
(when specification drafting may start, what ID scheme to use, how it
connects to architecture and test) needed to apply them in a real
repository.

7.2 Precondition

Requirements specification (StRS drafting, §7.8) MUST
NOT begin before:

The Discovery Interview record exists and is complete (Chapter 5,
§5.2).

The stakeholder register exists (Chapter 6).

SRS drafting MUST NOT begin before the StRS is
approved and frozen (§7.8.3).

7.3 SRS structure

Every project’s SRS MUST contain, at minimum, the
sections in the SRS template:
introduction/scope, stakeholder references, functional requirements,
non-functional requirements, constraints, assumptions, and open issues —
consistent with 29148’s recommended content, reduced to what a
small-to-mid-size CSDS project actually needs. Every functional and
non-functional requirement row MUST additionally cite
the STR-xxx Stakeholder Requirement (§7.8) it
satisfies.

7.4 Requirement identity and
quality

Every requirement MUST have a unique, stable ID:
REQ-<3-digit   number> (Chapter 3, §3.4). IDs are
never reused, even if the requirement is later removed (mark it
Superseded or Removed, do not delete the
ID).

Every requirement MUST be verifiable — stated such
that a test (Chapter 15) can pass or fail against it. “The system should
be fast” is not a valid requirement; “The system MUST respond to
GET /resource in under 300ms at p95 under 50 rps” is.

Every requirement MUST state which stakeholder need
it satisfies (Chapter 6).

Every requirement SHOULD be classified as
functional or non-functional; non-functional requirements
MUST further state which ISO/IEC 25010 quality
characteristic they relate to (Chapter 16).

7.5 Requirement levels

29148 recognizes that requirements exist at more than one level of
abstraction but leaves an adopting organization to fix the exact levels
and how they connect. CSDS fixes six, each narrowing the one before
it:

Level
Answers
Example
Owner

Business Requirements
Why does the organization need this at all?
“Reduce manual task tracking overhead.”
Product Owner (Chapter 25’s vision is the ultimate anchor)

Stakeholder Requirements
What does each stakeholder need from it?
“An operator needs to see all open tasks at a glance.”
Stakeholder, Requirements Engineer (Chapter 6)

System Requirements
What must the system as a whole do, independent of
implementation?
“The system must let a user create, view, and close tasks.”
Requirements Engineer

Software Requirements
What must this specific software component do?
REQ-001: “The system MUST allow creating a task with a
title.”
Requirements Engineer — this is the REQ-xxx level used
throughout CSDS (§7.4)

Derived Requirements
What does a design/architecture choice made in service of a Software
Requirement itself require?
Choosing JWT bearer tokens (ADR) derives a requirement that tokens
be verifiable without a database round-trip.
Software Architect (Chapter 9)

Acceptance Criteria
How is a Software or Derived Requirement’s satisfaction
verified?
“POST /tasks with a valid title returns
201 and the created task.”
Requirements Engineer, Quality Manager

A Derived Requirement MUST carry its own
REQ-xxx ID and reference the Software Requirement and ADR
it was derived from, so it enters the traceability chain (Chapter 8)
exactly like any other requirement — CSDS does not treat derived
requirements as a lesser, untracked category.

Not every project needs all six levels stated as separately
structured documents; Business/Stakeholder/System levels are captured
together in the StRS (§7.8), which even a small project (e.g. the
reference project, Chapter 24) MAY keep as a short, single-section
document — proportionality applies to the StRS’s length, not to
whether it exists, is reviewed, and is frozen before SRS drafting
(§7.8.5). Software Requirements, Derived Requirements, and Acceptance
Criteria MUST remain explicit and traceable in the SRS
regardless of project size — collapsing the upper levels’ document
structure loses little; skipping the StRS gate itself, or
collapsing the lower levels, breaks Chapter 8.

7.6 Requirements Review gate

Before approval, the SRS MUST pass a Requirements
Review (Chapter 20), conducted as a Requirements Review interview
(Chapter 30) verifying:

The StRS (§7.8) is approved and frozen — a Requirements Review MUST
NOT proceed against an unapproved or still-changing StRS.

Every requirement has an ID, a stakeholder reference, is traced to
an STR-xxx item (§7.8.4), and is verifiable.

No two requirements contradict each other.

Assumptions and open issues from the Discovery Interview are either
resolved or explicitly carried into the SRS as stated assumptions/open
issues (not silently dropped).

Non-functional requirements cover, at minimum, the quality
characteristics relevant to the project’s risk profile (Chapter
16).

Derived Requirements introduced since the last review are traced to
the Software Requirement and ADR that produced them (§7.5).

No STR-xxx item in the frozen StRS is an orphan
(§7.8.4) — every item is either traced to at least one
REQ-xxx, or explicitly marked
Deferred/Rejected with a recorded reason.

Only after this gate passes is the SRS approved —
the point at which Chapter 4’s mandatory flow permits Software
Architecture to begin.

7.7 Change control

Once approved, a change to the SRS (adding, modifying, or removing a
requirement) is itself a Work Order (Chapter 19): it MUST update the
traceability chain (Chapter 8) for any requirement it touches, and MUST
NOT be applied by directly editing implementation without updating the
SRS first — the SRS is authoritative, not descriptive of what the code
happens to do. A change that adds or modifies a stakeholder-level need
MUST update the frozen StRS first (§7.8.6), then the SRS — never the SRS
alone, or the new STR-xxx item is itself an orphan on
arrival.

7.8
Stakeholder Requirements Specification (StRS) and the two-stage
gate

7.8.1 Purpose

Requirements raised in the Discovery Interview or Stakeholder
Analysis are easy to lose between elicitation and a frozen SRS —
restated informally in a meeting, assumed obvious, or deprioritized
without a record — especially across a long-running or AI-assisted
requirements process. §7.8 exists to make that loss structurally
difficult rather than relying on drafting diligence alone: every
stakeholder-level need is captured with a stable ID, frozen as a
reviewed baseline, and checked for orphans before the SRS is
approved.

7.8.2 StRS structure

The Stakeholder Requirements Specification (StRS)
captures the Business, Stakeholder, and System requirement levels (§7.5)
— what stakeholders need, independent of how the software will satisfy
it. Use the StRS template.
Every item MUST have a unique, stable ID:
STR-<3-digit number>, e.g. STR-001
(Chapter 3, §3.4), and MUST state which stakeholder
(Chapter 6) it originates from. IDs are never reused, even if the item
is later marked Superseded.

7.8.3 The freeze gate

Before SRS drafting may begin, the StRS MUST pass a
Requirements Review (Chapter 20), conducted as a Requirements Review
interview (Chapter 30), checking:

Every item from the Discovery Interview record’s seven-point
checklist (Chapter 5, §5.2) that constitutes a stakeholder need is
represented as an STR-xxx item — nothing carried forward
from Discovery is missing without an explicit, recorded reason.

No two StRS items contradict each other.

Every item states its originating stakeholder and is stated at the
Business/Stakeholder/System level, not already narrowed to a software
design choice (that narrowing happens in the SRS, §7.4).

Only after this review passes is the StRS approved and
frozen. A frozen StRS MUST NOT be edited
directly; a further change follows §7.8.6.

Before freezing, the reviewer MAY use tooling that
cross-references each StRS item’s terminology against the project’s
Glossary (Chapter 3) and existing ADRs (Chapter 9), flagging fuzzy or
contradictory wording; one example is Matt Pocock’s
grill-with-docs Claude Code skill (mattpocock/skills). As
with §5.4’s note, this is a non-normative tooling suggestion, not a
CSDS-orchestrated standard — the review checklist above is what the gate
actually requires, regardless of what tool assists it.

7.8.4 No orphaned
Stakeholder Requirement

Every STR-xxx item in the frozen StRS
MUST, by the time the SRS is approved (§7.6), be traced
to at least one REQ-xxx Software Requirement that satisfies
it, or be explicitly marked Deferred (with
a target release or “not yet scheduled”) or Rejected (with
a documented reason), signed off by the Product Owner. An
STR-xxx item with neither a trace nor an explicit
disposition MUST NOT be considered — this is the
condition an orphan check (Chapter 8) exists to catch, applied one level
higher than the existing REQ-xxx orphan rule.

7.8.5 Proportionality for
small projects

A small project (e.g. the reference project, Chapter 24)
MAY keep the StRS as a short, single-section document —
a handful of STR-xxx items is a complete StRS if the
project is that small. Proportionality applies to length and
ceremony, never to whether the StRS exists as a distinct, reviewed,
frozen artifact, or to the no-orphan check (§7.8.4): a one-line StRS
review record (“3 items, all traced, no orphans”) is sufficient process
for a three-requirement project; skipping the review is not.

7.8.6 StRS change control

A stakeholder-level need discovered after the StRS is frozen
(e.g. during Implementation, per Chapter 4, §4.2’s iteration rule)
MUST be added to the StRS as a new STR-xxx
item (or a recorded amendment to an existing one) before the
corresponding REQ-xxx is added to the SRS — the SRS change
(§7.7) and the StRS change happen in the same Work Order (Chapter 19),
StRS first, so the traceability chain (Chapter 8) never has a
REQ-xxx with no STR-xxx behind it.

7.8.7 Compatibility

Projects with an SRS approved before this rule existed are not
retroactively non-compliant for that already-approved baseline: a
pre-existing single-stage SRS remains a valid historical record. The
StRS → SRS two-stage gate applies to any StRS/SRS drafted, or any
substantive requirements change (§7.7, §7.8.6), from the point a project
adopts this version of CSDS onward.

08 — Requirements
Traceability

Purpose: Make “is this requirement actually
implemented, tested, documented, and shipped” answerable by lookup, not
investigation. Scope: The mandatory traceability chain,
its minimum recording mechanism (the Requirements Traceability Matrix,
Appendix A), and the no-orphan-requirements rule.
Responsibilities: Requirements Engineer, Quality
Manager — Chapter 26.
Process: Updated whenever a requirement is implemented,
tested, documented, or released. Outputs: A current
Requirements Traceability Matrix (RTM). Quality
criteria: Reliability, Maintainability — see Appendix C.
Review criteria: Quality Review, Repository Review
(Chapter 16). Related standards: Traceability concept
from ISO/IEC/IEEE 29148. Related chapters: 7, 9, 15, 17, Appendix A.

CSDS extension: one concrete, uniform traceability
chain and its minimum recording mechanism, the Requirements Traceability
Matrix (RTM, Appendix A) — 29148 requires traceability to exist; it does
not fix the chain’s exact links for a CSDS project.

8.1 The mandatory chain

Every requirement MUST be traceable through:

Stakeholder Requirement (STR-xxx, Chapter 7, §7.8)
  → Software Requirement (REQ-xxx)
  → Architecture element (C4 component / ADR, Chapter 9)
  → Implementation (source file(s) / API operation, Chapter 9-10)
  → Test (Chapter 15)
  → Documentation (where it is described, Chapter 17)
  → Release (Chapter 23)
No requirement may be an orphan at either level:

An STR-xxx item with no REQ-xxx tracing to
it, and no recorded Deferred/Rejected
disposition, past the point the SRS should be approved (Chapter 7,
§7.8.4) — this is the check that stops a stakeholder-raised requirement
from being silently forgotten mid-process.

A REQ-xxx present in the SRS with no architecture
element, or implemented with no requirement behind it.

The RTM (Appendix A) is where this is checked — a row with a blank
StRS-trace, architecture, implementation, or test cell, past the point
that phase should be complete (Chapter 4), is an orphan and a Quality
Gate failure (Chapter 20).

A requirement missing any link in this chain MUST
NOT be considered implemented, regardless of whether code
exists that happens to satisfy it.

8.2 Minimum recording
mechanism

CSDS does not mandate a specific traceability tool. It mandates that,
at minimum, the link is recoverable by one of:

The Requirements Traceability Matrix (RTM, see Appendix A) mapping
STR-xxx → REQ-xxx → architecture element →
source path(s) → test path(s) → documentation location → release
version.

Consistent referencing (e.g. REQ-003 cited in the
relevant ADR, in a code comment or commit at the implementing change,
and in the test name or description, itself traced back to the
STR-xxx it satisfies in the SRS).

The reference project (Chapter 24) demonstrates the table form for
its small requirement set — see
reference-project/docs/SRS.md.

8.3 Rules

A commit that implements a requirement MUST
reference its REQ-xxx ID in the commit documentation
(Chapter 18).

A test that verifies a requirement SHOULD name or
tag the REQ-xxx ID it covers.

An ADR that materially affects how a requirement is satisfied
MUST reference the REQ-xxx ID(s)
affected.

Before Release (Chapter 23), every requirement in the approved SRS
MUST be traceable to a release version, or explicitly
marked as deferred to a later release (not silently absent).

8.4 Traceability and change

When a requirement changes (Chapter 7, §7.7), its trace links
MUST be re-verified: an architecture element or test
that no longer matches the updated requirement is stale documentation
and MUST be updated in the same Work Order (Chapter
19), not deferred as follow-up.

8.5 Gate

The Quality Review and Repository Review (Chapter 20)
MUST sample the traceability chain for at least a
subset of requirements before any release; missing or broken links are
release blockers.

09 — Software Architecture and
Architecture Decision Records

Purpose: Make a system’s structure and the reasoning
behind it legible to someone who wasn’t there when it was decided.
Scope: The required C4 diagram set, the relationship
between C4, Clean Architecture, and Domain-Driven Design (§9.1), and the
ADR format. Responsibilities: Software Architect — Chapter 26.
Process: Requirements approved → C4 views drafted →
ADR(s) recorded → Architecture Review interview (Chapter 30) →
Implementation may begin. Outputs: C4 diagrams
(Context/Container/Component; Code optional) and ADRs. Quality
criteria: Maintainability, Compatibility, Portability,
Reliability — see Appendix C.
Review criteria: Architecture Review (Chapter 16,
§16.2). Related standards: C4 Model, Clean Architecture
(optional). Related chapters: 7, 8, 10, 26.

CSDS extension: the mandatory ADR as the durable
record connecting a C4 view to a requirement — C4 describes notation,
not decision history.

9.1 Selection

The C4 Model (Context, Container, Component, Code) is selected
because it scales down cleanly to small projects (a Context + Container
diagram may be sufficient) while still scaling up to complex systems,
and it maps directly onto CSDS’s traceability chain (Chapter 8): a
requirement is realized by one or more Containers/Components.

Clean Architecture (dependency rule: dependencies point inward,
toward domain logic) is selected as optional guidance
within a Component, applied where a project’s complexity justifies
strict layering. It is not mandatory for small projects where the
overhead would outweigh the benefit (Chapter 1, Principle 3: simplicity
over complexity) — the choice to adopt or skip it is itself recorded as
an ADR.

9.1.1
Relationship between C4, Clean Architecture, and Domain-Driven Design
(DDD)

These three operate at different, complementary levels and are not
alternatives to choose between:

C4 answers “what are the pieces and how do they
connect” — a structural view, at four zoom levels (Context down
to Code).

Clean Architecture answers “which direction do
dependencies point within a piece” — a dependency rule, applied
inside a C4 Component.

DDD (Domain-Driven Design) answers “how is the
domain itself modeled” — bounded contexts, aggregates, ubiquitous
language. CSDS does not mandate DDD; where a project’s domain is complex
enough to warrant it, a DDD bounded context typically maps to one or
more C4 Containers or Components, and the resulting domain model is
exactly what Clean Architecture’s innermost layer holds. A project MAY
adopt C4 alone, C4 + Clean Architecture, or all three — never DDD alone
in place of C4, since C4 is what CSDS’s traceability chain (Chapter 8)
attaches to.

9.2 Minimum architecture
artifacts

Every project MUST produce, before Repository
Bootstrap (Chapter 5):

A C4 Context diagram (or equivalent Mermaid/text
description) showing the system and its external actors/systems.

A C4 Container diagram for anything beyond a
single-container system.

A C4 Component diagram for any Container with more
than one internally meaningful component (e.g. the reference project’s
routes → service → store layering, Chapter 24) — a single-component
Container MAY state this explicitly instead of drawing a diagram with
one box.

At least one ADR for the foundational architecture
decision (e.g. “why this container split,” “why Clean Architecture
layering is/isn’t used”).

A C4 Code diagram (e.g. a class diagram)
MAY be added where complexity warrants; CSDS does not
require it where a well-organized source tree already makes the
code-level structure obvious.

9.3 ADR format

Every Architecture Decision Record MUST use the ADR template and contain:

Field
Content

ID
ADR-<4-digit number> (Chapter 3, §3.4), never
reused

Problem
The decision that had to be made and why

Options
The alternatives genuinely considered

Evaluation
How the options were compared (criteria, trade-offs)

Decision
What was chosen

Rationale
Why, referencing the evaluation

Impact
What this changes for the system, its requirements, or later
decisions

Requirement references
REQ-xxx IDs affected (Chapter 8)

Review date
When this decision should be revisited

9.4 Rules

An ADR MUST NOT be edited after acceptance to
change its recorded decision; a changed decision is a
new ADR that supersedes the old one (link both
ways).

A decision that is architecturally significant (affects more than
one component, is expensive to reverse, or affects a non-functional
requirement) MUST be recorded as an ADR before
implementation proceeds on it.

Every exception to a CSDS MUST (Chapter 3, §3.3)
MUST be recorded as an ADR.

9.5 Gate

The Architecture Review (Chapter 16, 20) MUST verify
that every Container/Component in the C4 diagrams traces to at least one
requirement, and that no requirement lacks an architectural home.

10 — API Design Standard

Purpose: Make the API contract the source of truth,
written and reviewed before the code that implements it.
Scope: Contract-first ordering, minimum contract
content, and per-operation requirement traceability.
Responsibilities: Software Architect, Lead Developer —
Chapter 26.
Process: Requirements approved → OpenAPI operations
drafted → implementation → contract tests. Outputs: A
versioned OpenAPI 3.1 document matching shipped behavior.
Quality criteria: Compatibility, Usability,
Maintainability — see Appendix C.
Review criteria: Quality Review (Chapter 16, §16.2).
Related standards: OpenAPI 3.1. Related
chapters: 8,
9, 11.

Orchestrates: OpenAPI 3.1. Combined
with: Requirements/SRS (7), Traceability (8), Architecture (9),
Security/Identity (11). CSDS extension: contract-first
ordering and mandatory requirement traceability per operation — OpenAPI
defines the contract format, not when in the process it must be written
or how it ties back to requirements.

10.1 Contract-first rule

For any project exposing an HTTP API, the OpenAPI 3.1 document
MUST be written and reviewed before the corresponding
implementation code. The contract is the source of truth; hand-written
route handlers that implicitly define the contract by their behavior are
not compliant.

Order:

Requirement(s) (REQ-xxx)
  → OpenAPI operation(s)
  → Implementation
  → Contract test (Chapter 15)
10.2 Minimum contract content

Every OpenAPI document MUST specify:

info.version following Semantic Versioning (Chapter 14)
and matching the API’s own release line (which MAY differ from the
overall project version).

Every operation’s request/response schemas, including error
responses (at minimum 400 and 500 classes, plus any domain-specific
4xx).

security schemes used, cross-referencing Chapter 11.

An x-requirement-ids (or equivalent vendor extension /
description convention) on each operation, listing the
REQ-xxx IDs it satisfies (Chapter 8).

10.3 Rules

An operation MUST NOT exist in the implementation
without a corresponding OpenAPI operation, and MUST NOT
exist in the OpenAPI document without a corresponding
REQ-xxx reference.

Breaking changes to a published operation (removing a field,
narrowing a type, changing a status code’s meaning)
MUST follow the versioning rule in Chapter 14 — a breaking API
change is a MAJOR change to the API’s version line.

The OpenAPI document MUST be validated in CI
(schema-valid, lint-clean) as part of the Build gate (Chapter 20).

Naming: resource paths SHOULD use plural nouns
(/tasks, not /task or /getTasks);
CSDS does not mandate a specific naming convention beyond internal
consistency within one project.

10.4 Gate

The Quality Review (Chapter 20) MUST verify that the
deployed API’s actual behavior (via contract tests, Chapter 15) matches
the committed OpenAPI document — a passing test suite against a contract
that has since drifted from the document is treated as a documentation
defect (Chapter 17), not a pass.

11 — Security and
Identity Standard

Purpose: Fix which ASVS level and which auth flow
apply, so security posture is a documented decision, not an accident.
Scope: ASVS level selection, OAuth 2.1/OIDC flow
selection by client type, and the prohibited-flow list.
Responsibilities: Security Reviewer, Software Architect
— Chapter 26.
Process: ASVS level and flow decided during
Requirements Engineering, recorded as an ADR before Implementation.
Outputs: A recorded ASVS level, a selected auth flow, a
passing Security Review. Quality criteria: Security —
see Appendix C.
Review criteria: Security Review (Chapter 16, §16.2).
Related standards: OWASP ASVS, OAuth 2.1, OpenID
Connect. Related chapters: 9, 10, 28, 31, 33.

Orchestrates: OWASP ASVS (Application Security
Verification Standard), OAuth 2.1, OpenID Connect (OIDC).
Combined with: API Design (10), Quality Gates (20).
CSDS extension: an ASVS level-selection rule and a
default authentication-flow selection rule — ASVS defines verification
requirements per level but leaves level selection to the adopter; OAuth
2.1/OIDC define flows but not which flow a given client type must
default to under CSDS.

11.1 ASVS level selection

ASVS defines three verification levels (L1: opportunistic, L2:
standard, L3: critical). CSDS selects the level per project based on
data sensitivity and exposure, decided during Requirements Engineering
(Chapter 7) and recorded as an ADR (Chapter 9):

Project profile
Default ASVS level

Internal tool, no personal/sensitive data, not internet-facing
L1

Internet-facing, handles personal data or authentication
L2

Handles payment, health, or otherwise regulated/high-harm data
L3

A project MUST record its selected ASVS level as an
ADR before Implementation begins, and MUST NOT silently
default to a lower level than its data sensitivity warrants. A lower
level than the table suggests MAY be chosen only with
an explicit, reviewed exception (Chapter 3, §3.3).

11.2 Authentication /
authorization

OAuth 2.1 (which folds in the security best practices formerly spread
across OAuth 2.0 BCPs) and OpenID Connect are selected as the default
authentication/authorization stack for any project requiring user
identity.

Default flow selection by client type:

Client type
Default flow

Server-side web app (confidential client)
Authorization Code with PKCE

Single-page app / mobile app (public client)
Authorization Code with PKCE (mandatory under 2.1 — implicit flow is
removed)

Machine-to-machine / service
Client Credentials

Command-line tool without a browser
Device Authorization Grant

Enterprise customer via their own identity provider
See Chapter
33 — SAML 2.0 or OIDC, customer’s IdP governs

Resource Owner Password Credentials grant MUST NOT
be used (removed in OAuth 2.1; treated as a hard prohibition in CSDS
regardless of project ASVS level).

Access tokens MUST be short-lived; refresh tokens,
where used, MUST be rotated (sender-constrained where
the client type supports it).

OIDC MUST be used (rather than bare OAuth 2.1)
whenever the project needs to establish end-user identity (as opposed to
pure API authorization without identity).

11.3 Combination with API
Design

Every OpenAPI security scheme (Chapter 10, §10.2)
MUST name the OAuth 2.1 flow and scopes it expects, and
MUST correspond to an ASVS requirement category
actually verified for the project’s selected level (e.g. session/token
handling requirements under ASVS V3/V7 families).

11.4 Gate

A Security Review (Chapter 16, 20) MUST verify,
before release, that:

The selected ASVS level’s requirements applicable to the project’s
features have been checked (via the review checklist).

No prohibited flow (§11.2) is present in code or configuration.

Secrets (client secrets, signing keys) are not committed to the
repository (verified as part of Repository Health Checks, Chapter
21).

12 — AI Development
and Prompt Engineering Standard

Purpose: Hold AI-assisted work to the same bar as
any other work, with provenance and uncertainty made explicit.
Scope: Base AI-assistance principles and prompt
engineering rules. Governance layering
(Policy/Implementation/Operations) is Chapter 27, which extends rather
than duplicates this chapter. Responsibilities: AI
Agent, Lead Developer — Chapter 26.
Process: Applies to any Work Order involving
AI-generated content. Outputs: Verified,
provenance-noted AI contributions. Quality criteria:
Reliability, Maintainability — see Appendix C.
Review criteria: AI Review (Chapter 16, §16.2).
Related standards: None (Chapter 2, §2.2, row 15).
Related chapters: 13, 27.

CSDS original extension (Chapter 2, §2.2, row 15).
No mature, stable international standard yet governs prompt design and
AI-assisted development practice; CSDS defines the minimum discipline
directly.

12.1 Scope

This chapter governs any use of an LLM as part of building or
operating a CSDS project: AI-assisted coding, AI-conducted Discovery
Interviews (Chapter 5), AI-generated documentation, and AI
code/architecture review (Chapter 16). Chapter 13 extends
these rules to multi-step agents, persona design, and tool
integration.

12.2 Principles

AI assistance is not an exception to the standard.
Work produced with AI assistance passes through the same gates (Chapter
20) as human-authored work — there is no separate, lighter review track
for “AI-generated” changes.

Provenance is explicit. A commit whose content was
substantially AI-generated SHOULD note that in its
commit documentation (Chapter

— not to assign blame, but so future readers know the origin when
debugging generated-code idiosyncrasies.

Uncertainty is surfaced, not hidden. An AI agent
operating under CSDS MUST NOT present a guess as a
fact, or silently fill a gap in its instructions with an unstated
assumption (Chapter 5, §5.4).

Verification is mandatory, not optional. An AI
agent MUST verify its own output against the applicable
gate (tests pass, contract matches, lint is clean) before declaring a
Work Order (Chapter 19) complete — “the code looks right” is not
verification.

12.3 Prompt engineering rules

For prompts that are reused, versioned, or embedded in a project
(e.g. system prompts for an application feature, prompts driving a
review pipeline):

A reusable prompt MUST be stored as a versioned
artifact in the project (not only in an ephemeral chat), so it is
reviewable and traceable to a requirement like any other component
(Chapter 8).

A prompt MUST state its intended scope and
constraints explicitly (what it is for, what it must not do) rather than
relying on implicit context that may not transfer between models or
sessions.

A prompt change that affects behavior visible to end users or other
systems MUST go through the same
Requirements/Traceability chain (Chapters 7-8) as a code change — a
prompt is part of the system’s behavior, not outside it.

Prompts SHOULD be tested with representative inputs
before being considered done (a lightweight test pyramid for prompts: a
handful of fixed-input/expected-behavior checks), proportionate to the
prompt’s criticality.

12.4 What this chapter does
not cover

Model selection, pricing, and API mechanics are operational details,
not standard content; consult current provider documentation at
implementation time. This chapter governs process discipline
around AI use, not which model or API to call.

12.5 Gate

The AI Review (Chapter 16) MUST check, for any Work
Order involving material AI-generated content: provenance was noted
where required (§12.2), no unstated assumption was found in generated
requirements/code, and verification (§12.2 item 4) was actually
performed, not merely claimed.

13 — Agent, Character,
LLM and MCP Integration Standard

Purpose: Bound what an agent may do, how its persona
is designed, and how it integrates with tools and models, so autonomy
never exceeds reviewability. Scope: Agent authority,
character engineering, LLM integration architecture, and MCP tool
integration. Chapter 27 layers governance
(Policy/Implementation/Operations) on top of this chapter’s base rules.
Responsibilities: AI Agent, Software Architect — Chapter 26.
Process: Agent scope documented at design time; checked
at every AI Review. Outputs: Documented agent scope,
persona spec, LLM/MCP dependency list. Quality
criteria: Security, Reliability, Maintainability — see Appendix C.
Review criteria: AI Review (Chapter 16, §16.2).
Related standards: None (Chapter 2, §2.2, row 16).
Related chapters: 12, 26, 27.

CSDS original extension (Chapter 2, §2.2, row 16),
extending Chapter
12 to multi-step agents, persona design, and tool-integration
protocols.

13.1 Agent engineering

An agent (Chapter 3) plans and executes multi-step
work with some autonomy, as distinct from a single prompt/response
call.

Every agent used in a project MUST have a
documented scope: what tasks it is authorized to perform, and —
explicitly — what it is not authorized to do (e.g. “may
open pull requests; may not merge them,” “may read the database; may not
run migrations”). Where an agent is the standing default executor for
most of a project’s Engineering Persona Model roles (Chapter 26, §26.5 —
the common case for Ronny Colditz’s projects), that section’s role table
is the documented scope for those roles; this chapter’s
rules still apply on top of it.

An agent’s authority MUST NOT exceed what a human
reviewer could meaningfully review after the fact. If an agent’s actions
are irreversible or high-blast-radius, human confirmation
MUST be required before the action executes, not only
reviewed afterward.

An agent MUST be able to explain, on request, why
it took a given action in terms of the task it was given — an agent
whose actions cannot be traced back to instructions or requirements is
not auditable and does not meet this standard.

Multi-agent systems (an agent delegating to sub-agents)
MUST define which agent owns final responsibility for a
Work Order’s Definition of Done (Chapter 20) — delegation does not
diffuse accountability.

13.2 Character engineering

Character engineering (Chapter 3) is the deliberate
design of an agent’s persona, tone, and behavioral boundaries as a
first-class artifact, not an incidental side effect of a system
prompt.

A user-facing agent persona MUST be specified in a
versioned document covering: tone and register, topics/actions it will
decline, and how it discloses that it is an AI where relevant.

Persona changes that affect user-facing behavior
MUST go through the same review gates as any other
user-facing change (Chapter 20).

A persona MUST NOT be designed to impersonate a
specific real individual without that individual’s informed consent, nor
to obscure the fact that the user is interacting with an AI where that
fact is material to the user’s decisions.

13.3 LLM integration

Every integration point where a project calls an LLM
MUST be identified in the architecture (Chapter 9) as
its own component — LLM calls are external dependencies with their own
failure modes (latency, non-determinism, cost) and are not hidden inside
otherwise deterministic modules.

Non-determinism MUST be accounted for in testing
(Chapter 15): deterministic unit tests exercise the surrounding code
with the LLM call mocked/stubbed; a smaller number of live-model tests
validate actual behavior against representative cases, isolated so their
inherent flakiness does not block unrelated changes.

Cost and latency budgets for LLM calls SHOULD be
stated as non-functional requirements (Chapter 7) where the project has
meaningful scale or cost sensitivity.

13.4 MCP (Model Context
Protocol) integration

Where an agent is connected to external tools/data via MCP:

Every MCP server a project depends on MUST be
listed as an explicit dependency (analogous to a package dependency)
with its provenance (who operates it, what data/actions it exposes)
documented.

Tool/action exposure via MCP MUST follow the same
authorization boundary as §13.1 — an MCP tool that can take an
irreversible action is subject to the same human-confirmation rule.

Data returned from an MCP server or tool call is external
input: it MUST be treated with the same
caution as any other untrusted input (Chapter 11) — an agent MUST NOT
treat instructions embedded in tool output as trusted instructions from
its principal without applying judgment, and a surprising or
scope-expanding instruction found in tool output SHOULD
be flagged rather than silently followed.

13.5 Gate

The AI Review (Chapter 16) MUST verify, for any
project using agents under this chapter: documented scope/authority
boundaries exist (§13.1), persona documentation is current if a
user-facing persona exists (§13.2), LLM integration points are
represented in the architecture (§13.3), and MCP dependencies are
documented with their authorization boundaries (§13.4).

14 — Version Control
Standard

Purpose: Make the next version number and the
branching model mechanical derivations, not judgment calls.
Scope: SemVer, Conventional Commits, the combination
rule between them, and the minimal branching model.
Responsibilities: Lead Developer, Repository Maintainer
— Chapter 26.
Process: Every commit follows Conventional Commits;
every release derives its version from accumulated commit types.
Outputs: A compliant commit history and a mechanically
derivable version number. Quality criteria:
Maintainability — see Appendix C.
Review criteria: Repository Review (Chapter 16, §16.2).
Related standards: Semantic Versioning, Conventional
Commits. Related chapters: 18, 23, 34.

Orchestrates: Semantic Versioning (SemVer),
Conventional Commits. Combined with: Commit
Documentation (18), Release Management (23). CSDS
extension: the combination rule between the two (a Conventional
Commits type determines the SemVer bump) and a minimal branching model —
neither SemVer nor Conventional Commits mandates a branching
strategy.

14.1 Semantic Versioning

Every releasable artifact (a project’s overall version, an API’s
version, CSDS’s own version) MUST follow
MAJOR.MINOR.PATCH:

MAJOR — incompatible/breaking change.

MINOR — backward-compatible functionality
added.

PATCH — backward-compatible fix.

Pre-1.0.0 (0.y.z) versions MAY break
compatibility in a MINOR bump, consistent with SemVer’s own definition —
but once a project or API reaches 1.0.0, that leniency
ends.

14.2 Conventional Commits

Every commit message MUST follow the Conventional
Commits format:

<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
Types used under CSDS: feat, fix,
docs, refactor, test,
chore, build, ci,
perf. A breaking change MUST be marked
with ! after the type/scope or a
BREAKING CHANGE: footer.

14.3 Combination
rule: commit type → version bump

Commit type / marker
SemVer impact

fix:
PATCH

feat:
MINOR

Any type with ! or BREAKING CHANGE:
footer
MAJOR

docs:, chore:, test:,
ci:, build:, refactor: (no
behavior change)
No version bump by itself

Automated or manual release tooling MUST derive the
next version from the accumulated commit types since the last release,
not from ad-hoc judgment at release time.

14.4 Commit documentation

Every non-trivial commit MUST also carry the
structured commit documentation body defined in Chapter 18, appended
after the Conventional Commits header/body. “Non-trivial” excludes
single-line typo fixes and pure formatting changes with no behavioral
effect.

14.5 Minimal branching model

main is always releasable; direct pushes to
main that bypass review MUST NOT occur for
non-trivial changes.

Work happens on short-lived feature branches, named descriptively
(e.g. feat/requirement-id-short-description), merged via
reviewed pull request.

A branch MUST NOT be force-pushed or have its
history rewritten once another party has based work on it, without
explicit coordination.

Release branches/tags follow Chapter 23.

14.6 Gate

The Repository Review (Chapter 20) MUST verify that
recent commit history is Conventional-Commits-compliant and that the
current version number is consistent with the accumulated commit types
since the last tagged release.

15 — Testing Standard

Purpose: Enforce a fast-feedback test shape rather
than merely recommending one. Scope: The Test Pyramid
shape rules and non-determinism handling for LLM-backed components.
Responsibilities: Lead Developer, Quality Manager — Chapter 26.
Process: Tests are part of the same Work Order as the
code they verify. Outputs: A passing, correctly-shaped
deterministic test suite. Quality criteria: Functional
Suitability, Reliability — see Appendix C.
Review criteria: Quality Review (Chapter 16, §16.2).
Related standards: The Test Pyramid. Related
chapters: 8,
13, 20.

Orchestrates: the Test Pyramid. Combined
with: Traceability (8), API Design (10), Quality Gates (20).
CSDS extension: a minimum enforced shape (not just a
recommended one) and the rule connecting tests back to requirement
IDs.

15.1 The pyramid, as enforced

        /  E2E  \        few — critical user journeys only
      /Integration\      moderate — component/API boundaries
    /   Unit Tests   \   many — fast, isolated, the bulk of the suite

Unit tests verify a single function/module in
isolation (dependencies mocked/stubbed). They MUST run
in milliseconds and require no network, filesystem, or external
service.

Integration tests verify that two or more real
components work together correctly (e.g. a request handler + real
database against a test instance; an OpenAPI contract test, Chapter 10,
§10.4).

End-to-end (E2E) tests verify a full user-facing
journey through the deployed or near-deployed system. They
MUST be kept few in number — each covers a critical
path, not every edge case (edge cases belong at the unit level, where
they are cheap).

15.2 Rules

The shape MUST NOT invert: a suite with more E2E
tests than unit tests is a Quality Gate failure (Chapter 20), regardless
of overall coverage percentage — it indicates slow, brittle feedback,
not thorough testing.

Every requirement (REQ-xxx) classified as functional
MUST have at least one test at the appropriate pyramid
level tracing to it (Chapter 8). Non-functional requirements
(performance, security) MUST have a corresponding
verification method even where it is not a conventional automated test
(e.g. a load test run, an ASVS checklist item, Chapter 11).

Tests MUST be part of the same Work Order (Chapter
19) as the code they verify — “tests to follow in a later PR” is not
permitted for anything beyond a documented, time-boxed exception
(Chapter 3, §3.3).

Flaky tests (pass/fail inconsistently with no code change)
MUST NOT be worked around by retries-until-green; the
flake MUST be fixed or the test quarantined with a
tracked follow-up, not silently ignored.

15.3 Non-determinism
(LLM/agent components)

Where a component under test calls an LLM (Chapter 13, §13.3): the
deterministic surrounding logic is unit/integration tested with the LLM
call mocked; a small, separately-tagged set of live-model tests
validates actual model behavior against representative cases and
MAY be run less frequently than the deterministic suite
(e.g. not on every commit) without that being treated as skipping the
gate — this exception is stated here explicitly rather than left as an
implicit workaround.

15.4 Gate

The Build/Test gate (Chapter 20) MUST run the full
deterministic suite (unit + integration + E2E, excluding tagged
live-model tests) on every change and MUST block merge
on any failure.

16 — Quality Model and
Reviews

Purpose: Turn ISO/IEC 25010’s quality
characteristics into concrete, assignable checks, and define the seven
review types every gate in Chapter 20 relies on. Scope:
The characteristic-to-check mapping (§16.1), the seven review types
(§16.2), and who may perform them (§16.3).
Responsibilities: Quality Manager — Chapter 26.
Process: A review runs, conducted as the matching
Engineering Interview instance (Chapter 30), before its corresponding
gate. Outputs: A pass/fail record per review type.
Quality criteria: All eight ISO/IEC 25010
characteristics — see Appendix C.
Review criteria: This chapter defines review criteria
for all others. Related standards: ISO/IEC 25010.
Related chapters: 20, 30.

Orchestrates: ISO/IEC 25010 (Software Quality
Model). Combined with: Architecture (9), Testing (15),
Quality Gates (20). CSDS extension: the mapping from
each ISO/IEC 25010 characteristic to a concrete, checkable review item,
and the definition of the seven review types CSDS uses at its gates —
25010 defines what quality is, not who checks it, when, or
how.

16.1 ISO/IEC
25010 characteristics, mapped to checks

25010 characteristic
What CSDS checks
Primarily verified in

Functional suitability
Requirements are implemented and traced (Chapter 8)
Requirements Review, Quality Review

Performance efficiency
Non-functional requirements with measurable thresholds are met
Testing (15), Quality Review

Compatibility
API contracts (10) don’t break consumers without a MAJOR bump
(14)
Quality Review

Usability
Stakeholder/end-user needs (6) are reflected in acceptance
criteria
Requirements Review

Reliability
Test pyramid shape (15), error handling paths covered
Quality Review

Security
ASVS level requirements met (11)
Security Review

Maintainability
Architecture traceability (9), documentation currency (17)
Architecture Review, Documentation Review

Portability
Dependencies and environment assumptions documented
Architecture Review

A project does not need to exhaustively audit every 25010
sub-characteristic for every change — it needs the relevant row
checked, determined by which non-functional requirements (Chapter 7) the
change touches.

16.2 Review types

CSDS defines seven review types. Each produces a pass/fail record; a
fail blocks the corresponding gate (Chapter 20).

Review
Checks
Uses

Requirements Review
SRS completeness, verifiability, stakeholder traceability (Chapter
7, §7.6)
SRS template

Architecture Review
C4/ADR completeness, requirement-to-component traceability (Chapter
9, §9.5)
ADR template

Documentation Review
Documentation Impact Analysis was performed and acted on (Chapter
17)
DIA
template

Quality Review
25010 characteristics relevant to the change (§16.1), test pyramid
shape (15), traceability (8)
Review checklist

Security Review
ASVS level requirements, prohibited auth flows, secret hygiene
(Chapter 11)
Review checklist

Repository Review
Repository structure, commit history compliance, health checks
(Chapters 14, 21)
Review checklist

AI Review
AI/agent provenance, uncertainty handling, authority boundaries
(Chapters 12-13)
Review checklist

16.3 Who performs a review

CSDS does not require every review to be performed by a different
human. On a small project (including the reference project, Chapter 24),
one person — or one AI agent acting under Chapter 12-13 rules, with
human sign-off on the Quality and Security reviews at minimum — may
conduct all seven for a given Work Order, provided each is genuinely
performed against its checklist, not rubber-stamped. Self-review is
permitted; skipping a review is not.

16.4 Chapter-level
self-critique

Independently of project reviews above, CSDS’s own chapters are
subject to the self-critique process in CONTRIBUTING.md
(editorial, architecture, quality, consistency) after every chapter is
drafted or materially changed. This is a review of the
standard, not of a project governed by it.

16.5 Gate

All seven reviews MUST pass (or have a recorded
exception, Chapter 3 §3.3) before the Quality Gates in Chapter 20 are
satisfied and a merge or release may proceed.

17 — Documentation as Code and
Documentation Impact Analysis

Purpose: Guarantee documentation never silently
drifts from what the system actually does, by making the check for drift
part of the commit itself rather than a periodic cleanup task.
Scope: Docs as Code practice, the mandatory pre-commit
Documentation Impact Analysis, and Documentation Synchronization (§17.6)
— the canonical list of document kinds checked for currency. The broader
Change Impact Analysis spanning requirements/architecture/tests/
deployment is Chapter 19, §19.2 — this chapter’s scope stays
documentation-specific to avoid duplicating that.
Responsibilities: Documentation Owner — Chapter 26.
Process: Before any non-trivial commit: DIA (§17.2) →
Documentation Synchronization check (§17.6) → commit.
Outputs: A DIA record per Work Order; no known-stale
document at commit time. Quality criteria:
Maintainability — see Appendix C.
Review criteria: Documentation Review (Chapter 16,
§16.2). Related standards: Docs as Code, Markdown,
GitHub. Related chapters: 14, 18, 19.

CSDS extension: the mandatory pre-commit
Documentation Impact Analysis (DIA) and Documentation Synchronization
check — Docs as Code says documentation lives with code and is versioned
the same way; it does not mandate a check that documentation actually
stayed in sync with a given change, nor fix which document kinds must be
considered every time.

17.1 Docs as Code

Documentation MUST live in the same repository as
the code it describes, in Markdown, reviewed via the same pull-request
process as code (no separate wiki-of-record for anything that describes
how the system works or how to work on it). Diagrams
SHOULD be text-based (Mermaid or equivalent) so they
diff and review like code.

17.2
Documentation Impact Analysis (mandatory, pre-commit)

Before any commit beyond a trivial one (Chapter 14, §14.4), the
author MUST perform a Documentation Impact Analysis
using the DIA
template, determining:

Which documents are affected by this change (SRS,
ADRs, README, OpenAPI spec, this standard’s own chapters, etc.).

Which of those MUST be updated in this same
commit/Work Order.

Which MUST be newly created (e.g. a new ADR for a
decision just made).

Which remain unchanged, with a stated reason — not
just “none,” but why the change doesn’t touch them (e.g. “internal
refactor, no change to public contract, external docs unaffected”).

This DIA is the sole authoritative
documentation-impact analysis for a Work Order. The Documentation row in
Chapter 19, §19.2’s Change Impact Analysis is a same-Work-Order forward
pointer only (“documentation likely affected: yes/no”), not a second
instance of this analysis — see Chapter 19, §19.2’s rule. A Work Order
MUST NOT substitute the planning-time pointer for this
pre-commit analysis; only this DIA, performed once the actual change is
known, satisfies the Documentation Review gate (Chapter 16, §16.2).

17.3 Rule

A commit MUST NOT be made until the Documentation
Impact Analysis for that change is complete and any documents identified
in items 2-3 above are updated in the same commit or Work Order.
Deferring documentation to a “follow-up” is only acceptable as a
recorded, time-boxed exception (Chapter 3, §3.3), not a default.

17.4 What counts as “affected”

A document is affected if, after the change, a reader following it
would be misled: a stale requirement, an ADR describing a decision that
no longer holds, a README instruction that no longer works, an OpenAPI
operation that no longer matches implementation (Chapter 10, §10.4).
Cosmetic code changes with no behavioral or structural effect typically
affect no documents — the DIA records that determination rather than
skipping it silently.

17.5 Gate

The Documentation Review (Chapter 16) MUST verify
that a DIA record exists for the Work Order under review and that its
conclusions were acted on, not merely written down.

17.6 Documentation
Synchronization

§17.2’s DIA determines which documents are affected in
general terms. Documentation Synchronization fixes the canonical list of
document kinds a DIA MUST explicitly consider (not necessarily update —
consider), so “which documents are affected” is never answered from
memory:

README

Architecture documentation (C4 views, ADRs — Chapter 9)

Requirements documentation (SRS — Chapter 7)

API documentation (OpenAPI — Chapter 10)

Configuration documentation (Chapter 28)

Runbooks (operational procedures, where the project has any)

User documentation (where the project has end users beyond its own
team)

Developer documentation (setup/contribution instructions)

Release notes (Chapter 23)

CHANGELOG.md

Work Order records (Chapter 19)

Commit documentation (Chapter 18)

A project MAY have “N/A, this project has none” for a kind that
genuinely doesn’t apply (e.g. no Runbooks for a stateless library) — the
DIA records that explicitly rather than omitting the kind from
consideration. This list is Chapter 17’s contribution to Documentation
Synchronization; it does not replace the DIA’s own judgment about
this specific change, it bounds what that judgment must at
least scan.

17.7 Gate (Documentation
Synchronization)

The Documentation Review MUST verify the DIA record
addressed every kind in §17.6, not only the ones the change’s author
found top of mind.

18 — Commit Documentation
Standard

Purpose: Make the rationale behind a change as
durable as the diff itself. Scope: The mandatory
eight-field commit documentation body and its proportionality rule.
Responsibilities: Lead Developer, Repository Maintainer
— Chapter 26.
Process: Written as part of every non-trivial commit or
its pull request. Outputs: A commit/PR carrying
Goal/Motivation/Changes/Impact/Risks/ Rollback/Lessons Learned/Follow
Ups. Quality criteria: Maintainability — see Appendix C.
Review criteria: Repository Review (Chapter 16, §16.2).
Related standards: None (Chapter 2, §2.2, row 17).
Related chapters: 14, 17.

CSDS original extension (Chapter 2, §2.2, row 17).
Conventional Commits (Chapter 14) standardizes the commit
header; it says nothing about the rationale, impact, or
rollback plan behind a change. CSDS requires that body directly.

18.1 Rule

Every non-trivial commit (Chapter 14, §14.4) MUST
carry commit documentation, either in the commit body/footer or in the
associated pull request description, using the commit
documentation template, containing at minimum:

Field
Content

Goal
What this commit achieves, in one or two sentences

Motivation
Why this change is needed now — the problem or requirement
(REQ-xxx) driving it

Changes
What actually changed, at a level useful to a future reader (not a
restatement of the diff)

Impact
What this affects: other components, requirements, APIs, running
behavior

Risks
What could go wrong because of this change, and how
likely/severe

Rollback
How to undo this change if it turns out to be wrong

Lessons Learned
What was learned while making this change, if anything
non-obvious

Follow Ups
Any deferred work, with enough context to pick it back up later

18.2 Proportionality

The depth of each field MUST scale with the change’s
risk and size. A one-line dependency bump with no behavioral change may
state each field in a single short clause. A field MUST
NOT be omitted, but “None” is a valid, honest value for Risks
or Follow Ups when genuinely true.

18.3
Relationship to the Documentation Impact Analysis

Commit documentation and the DIA (Chapter 17) serve different
purposes and are both required: the DIA asks “which documents need to
change,” commit documentation asks “what did this commit do, and what do
future readers need to know about it.” A DIA record MAY be referenced
from the commit documentation’s Changes field rather than
duplicated.

18.4 Where it lives

For a single commit, this belongs in the commit message body, after
the Conventional Commits header. For a Work Order landing as a
squashed/merged pull request, it MAY live in the pull
request description instead, provided the merge commit references it
(e.g. by PR number) so it remains discoverable from
git log.

18.5 Gate

The Repository Review (Chapter 20) MUST verify that
recent non-trivial commits carry complete commit documentation; a commit
with an empty or templated-but-unfilled body fails this check.

19 — Work Orders

Purpose: Give every unit of implementation work one
artifact that carries it from approved requirement to Done, so nothing
is “just a quick fix” outside the standard’s reach.
Scope: The Work Order artifact, the mandatory Change
Impact Analysis (§19.2) preceding implementation, its lifecycle, and its
relationship to Scrum/Kanban. Responsibilities: Lead
Developer, Product Owner — Chapter 26.
Process: Requirement approved → Change Impact Analysis
→ Plan → Implementation → Review → Done. Outputs: A
Work Order record with a satisfied Definition of Done. Quality
criteria: Functional Suitability, Maintainability — see Appendix C.
Review criteria: All seven review types converge on the
Work Order (Chapter 16, §16.2). Related standards: None
directly orchestrated. Related chapters: 17, 20, 22, 26.

CSDS original extension (Chapter 2, §2.2, row 19).
Scrum and Kanban (Chapter 22) define flow and cadence but not a concrete
artifact that ties a requirement to its implementation, tests,
documentation, and commit. CSDS defines that artifact as the
Work Order.

19.1 Definition

A Work Order is the atomic unit of planned work in CSDS: one
requirement, or a small coherent group of requirements, carried from
acceptance through implementation, test, documentation, and commit as a
single tracked unit (Chapter 3).

Every piece of implementation work MUST belong to a
Work Order — there is no “just fixing this quickly” outside the
framework, though a Work Order for a trivial fix may be correspondingly
small (Chapter 14, §14.4 on what counts as trivial still applies to
whether commit documentation depth is required).

19.2
Change Impact Analysis (mandatory, before implementation)

Before Plan execution begins, a Work Order MUST
record a Change Impact Analysis: the effect of the intended change
across seven dimensions. This is broader than Chapter 17’s Documentation
Impact Analysis (which is documentation-specific and runs pre-commit);
Change Impact Analysis runs earlier, at planning time, and covers:

Dimension
Question

Requirements
Does this change any REQ-xxx, or introduce a Derived
Requirement (Chapter 7, §7.5)?

Architecture
Does this affect any C4 element or require a new/amended ADR
(Chapter 9)?

Implementation
Which components does this touch?

Tests
Which existing tests does this affect; what new tests are needed
(Chapter 15)?

Documentation
Forward pointer only — see rule below.

Deployment
Does this change deployment or runtime configuration (Chapter
28)?

Operations
Does this change what an operator needs to know or do (runbooks,
monitoring)?

A dimension with no impact is recorded as “None” explicitly —
omission is not permitted. This analysis is a short, proportionate
exercise for small Work Orders (Chapter 24’s reference project shows a
worked example) and a more thorough one for Work Orders touching
multiple components.

Rule — the Documentation row is a pointer, not a second
analysis. The Documentation dimension MUST NOT
be filled in with the same which-documents-are-affected detail Chapter
17’s DIA produces — doing so would duplicate that analysis before the
diff even exists to analyze accurately. It MUST contain
only a one-line flag of whether documentation is likely affected at all
(e.g. “yes — SRS and README” or “no — internal refactor”), used to set
expectations at planning time. The authoritative, detailed analysis
happens once, later, in Chapter 17’s DIA at commit time, when the actual
change is known. A Work Order MUST NOT treat its Change
Impact Analysis’s Documentation row as satisfying Chapter 17’s DIA
requirement — they are not interchangeable, and doing both in full would
be redundant process weight for no added value.

19.3 Work Order content

Using the Work Order
template:

Field
Content

ID
Stable identifier, referencing the REQ-xxx ID(s) it
implements

Goal
What done looks like

Requirement references
REQ-xxx IDs (Chapter 7)

Architecture references
Relevant ADR/C4 elements (Chapter 9)

Plan
The intended approach, before starting

Status
Open / In Progress / In Review / Done

Definition of Done checklist
Instance of Chapter 20’s
DoD, checked off

Linked commit(s)
Commits/PRs implementing it

19.4 Lifecycle of a Work Order

Open (requirement approved, Chapter 7 §7.6)
  → Change Impact Analysis (§19.2)
  → In Progress (implementation + tests + docs, Chapters 12-15, 17)
  → In Review (Chapter 16's seven reviews)
  → Done (Definition of Done satisfied, Chapter 20)
A Work Order MUST NOT move to Done while any
Definition of Done item is unchecked. A Work Order MAY
be split into smaller Work Orders if scope grows beyond what one
coherent commit/PR should contain — CSDS prefers several small,
fully-done Work Orders over one large, partially-done one.

19.5 Relationship to
Scrum/Kanban

A Work Order is compatible with either a Scrum backlog item/task or a
Kanban card (Chapter 22): the ceremony and cadence around it are chosen
per project, but the Work Order’s own required content (§19.3) and
lifecycle (§19.4) do not change based on that choice.

19.6 Gate

A Work Order MUST NOT be marked Done until it has
passed the Requirements, Architecture, Documentation, Quality, Security,
Repository, and (where applicable) AI reviews relevant to its content
(Chapter 16), and its commit(s) carry commit documentation (Chapter
18).

20 — Quality Gates
and Definition of Done

Purpose: Compose every prior chapter’s checks into
one non-negotiable bar a change must clear before merge, and one bar a
Work Order must clear before Done. Scope: The ten
pre-merge gates (§20.1), the canonical Definition of Done (§20.2), and
the Release gate (§20.4). Responsibilities: Quality
Manager, Release Manager — Chapter 26.
Process: Every gate runs on every non-trivial change;
the DoD is checked once per Work Order before it is marked Done.
Outputs: A pass/fail record per gate, and a completed
DoD checklist. Quality criteria: All eight ISO/IEC
25010 characteristics — see Appendix C.
Review criteria: This chapter defines the review
criteria other chapters are checked against (Chapter 16).
Related standards: ISO/IEC 25010 (characteristics being
gated). Related chapters: 16, 19, 21, 29.

CSDS original extension (Chapter 2, §2.2, row 21).
ISO/IEC 25010 defines quality characteristics; it does not say which
gates a specific project must pass before merge, nor when a unit of work
counts as finished. CSDS defines both, composed from the chapters that
precede this one.

20.1 Gates before merge

Before any non-trivial change may merge to main (Chapter
14, §14.5), the following MUST all pass:

Gate
Verifies
Chapter

Requirements Review
SRS completeness/traceability for touched requirements
7

Architecture Review
C4/ADR consistency and traceability
9

Documentation Review
DIA performed and acted on
17

Quality Review
25010 characteristics relevant to the change; test pyramid
shape
16, 15

Security Review
ASVS level requirements; no prohibited auth flow; no committed
secrets
11

Repository Review
Structure, commit compliance, health checks
21

Build
Compiles/builds cleanly
—

Tests
Full deterministic suite passes
15

Lint
Static analysis clean per project configuration
—

Documentation Impact Analysis
Completed for this change
17

A gate MAY be automated (CI) or manual (human/agent
checklist); either is acceptable as long as it is actually performed and
its result is recorded (a green CI run counts as a recorded result; a
verbal “looks fine” does not).

20.2 Definition of Done

A Work Order (Chapter 19) is Done only when
all of the following hold — this is the canonical
Definition of Done referenced throughout CSDS:

A Change Impact Analysis was completed before implementation began
(Chapter 19, §19.2).

All requirements in scope for this Work Order are implemented.

All tests for those requirements pass (Chapter 15).

All documentation affected is current, including the Documentation
Synchronization scan (Chapter 17, §17.6).

All architecture decisions made are recorded (Chapter 9).

All seven reviews relevant to the change have passed (Chapter
16).

Commit documentation has been produced (Chapter 18).

Repository Health (Chapter 21, §29 Health Dashboard) is unchanged or
improved relative to the last recorded snapshot — a Work Order that
leaves the repository measurably less healthy (new lint suppressions, a
newly stale document, a dependency left more out of date) is not Done
merely because its own requirements pass.

This list mirrors the founding mandate’s Definition of Done directly;
see the DoD
checklist for the fillable, per-Work-Order instance of it.

20.3 Rule:
gates are not negotiable per deadline pressure

A gate MUST NOT be skipped to meet a deadline. If a
gate is discovered to be miscalibrated for a project (too strict,
testing the wrong thing), the gate itself is changed via an ADR (Chapter
9) and this chapter is updated accordingly — it is not silently bypassed
for one change.

20.4 Release gate

Release (Chapter 23) additionally requires that the Definition of
Done holds for every Work Order included in the release, and that
requirements traceability (Chapter 8) accounts for every requirement in
the approved SRS as implemented, deferred, or explicitly out of scope
for this release.

21 — Repository
Governance and Health Checks

Purpose: Fix the minimum repository shape and catch
slow decay between releases, not just at each individual gate.
Scope: Required repository layout, Repository
Bootstrap, and periodic Repository Health Checks. Feeds the Project
Health Dashboard (Chapter 29). Responsibilities:
Repository Maintainer — Chapter 26.
Process: Layout established at Bootstrap (Chapter 5,
§5.5); health checked at a stated cadence thereafter.
Outputs: A compliant repository layout and dated health
check records. Quality criteria: Security,
Maintainability — see Appendix C.
Review criteria: Repository Review (Chapter 16, §16.2).
Related standards: None (Chapter 2, §2.2, row 20).
Related chapters: 5, 29.

CSDS original extension (Chapter 2, §2.2, row 20).
No external standard defines CSDS’s specific repository layout or a
periodic health check cadence; CSDS defines both directly.

21.1 Required repository layout

Every CSDS-governed project MUST contain, at
minimum:

README.md              purpose, how to run/build/test, links to key docs
docs/SRS.md             (or equivalent) the approved requirements baseline
docs/adr/               Architecture Decision Records
CHANGELOG.md            version history (Chapter 14, 23)
.github/workflows/      CI pipeline (build, lint, test gates, Chapter 20)
A project MAY add to this structure (a
templates/ directory of its own, additional
docs/ subfolders) but MUST NOT omit any of
the above.

21.2 Repository Bootstrap

Repository Bootstrap (Chapter 5, §5.5) is when this structure is
first created. It is itself a Work Order (Chapter 19) with its own
Definition of Done (Chapter 20).

21.3 Periodic Repository
Health Checks

Independent of per-change gates (Chapter 20), an active project
SHOULD undergo a Repository Health Check at a regular
cadence proportional to its activity (e.g. monthly for actively
developed projects), verifying:

Dependency currency — no dependency is critically
outdated or carries a known unpatched vulnerability.

CI health — the pipeline itself still runs and its
gates still reflect Chapter 20 (gates rot silently if never
revisited).

Documentation drift — spot-check that README
instructions still work and the SRS/ADRs still describe the system as it
actually is.

Traceability integrity — spot-check the
requirement→release chain (Chapter 8) for gaps introduced since the last
check.

Secret hygiene — no credentials, keys, or tokens
have been committed (Chapter 11, §11.4).

Branch hygiene — no long-abandoned branches
carrying unmerged, unclear work sit indefinitely without
disposition.

21.4 Recording a health check

A Repository Health Check MUST produce a short
record (pass/fail per item above, findings, and follow-up Work Orders
for anything failing) — informal enough to be low-overhead, but written
down rather than only performed in someone’s head, so degradation over
time is visible.

21.5 Gate

The Repository Review (Chapter 16, 20) at merge time checks the
current change; the Health Check in this chapter checks the
project over time. A project overdue for its health check by a
significant margin (e.g. more than double its stated cadence)
SHOULD treat the next release as blocked until one is
performed.

22 — Project Management

Purpose: Pick a cadence without letting it compete
with the Work Order as the source of truth. Scope:
Scrum/Kanban selection guidance and their combination with Work Orders.
Responsibilities: Product Owner — Chapter 26.
Process: Cadence selected at Repository Bootstrap; Work
Orders flow through it. Outputs: A stated cadence and a
board/sprint structure that mirrors the Work Order lifecycle.
Quality criteria: Maintainability — see Appendix C.
Review criteria: Repository Review (Chapter 16, §16.2).
Related standards: Scrum, Kanban. Related
chapters: 4, 19.

Orchestrates: Scrum, Kanban. Combined
with: Lifecycle (4), Work Orders (19). CSDS
extension: the rule for selecting between them per project, and
the requirement that either sits on top of Work Orders rather than
replacing them with a framework-specific artifact.

22.1 Selection

Scrum and Kanban are both selected as acceptable cadences; CSDS does
not mandate one project-wide. Selection guidance:

Project characteristic
Preferred cadence

Fixed, predictable scope delivered in coherent increments; benefits
from a regular review/demo rhythm
Scrum (sprints)

Continuous flow of independent, variably-sized items; benefits from
strict WIP limits over fixed timeboxes
Kanban

Solo or very small team, low ceremony overhead desired
Kanban (lighter process weight)

A project MAY mix elements (e.g. Kanban flow with a
Scrum-style regular review) but MUST state its choice
explicitly rather than leaving cadence ad hoc.

22.2 Combination with Work
Orders

Regardless of cadence chosen, the unit that moves through the board
or sprint MUST be a Work Order (Chapter 19) — a Scrum
backlog item or Kanban card is a view onto a Work Order, not a
separate artifact with its own competing content. This avoids the common
failure mode of a project tracker and the actual
requirements/traceability chain drifting apart.

22.3 Scrum specifics under CSDS

Sprint planning selects Work Orders whose requirements are already
approved (Chapter 7, §7.6) — a sprint MUST NOT plan
implementation of unapproved requirements.

Sprint review demonstrates Work Orders that have met the Definition
of Done (Chapter 20), not merely “code complete.”

Retrospective findings that imply a process change to CSDS itself
SHOULD be raised as a proposed CSDS change
(CONTRIBUTING.md), not just a private team agreement that
drifts from the written standard.

22.4 Kanban specifics under
CSDS

WIP limits SHOULD be set such that a Work Order in
progress can realistically receive all seven reviews (Chapter 16) before
the next one starts, rather than accumulating a backlog of unreviewed
“done” items.

Board columns MUST map onto the Work Order
lifecycle (Chapter 19, §19.3): Open / In Progress / In Review / Done,
though a project MAY add finer-grained columns within that mapping.

22.5 Gate

Neither Scrum nor Kanban ceremony is itself a CSDS gate (Chapter 20)
— the gates are the seven reviews and Definition of Done, which apply
regardless of cadence. Project management practice is checked only for
the two rules above (approved requirements before planning; board state
matching Work Order lifecycle) as part of the Repository Review.

23 — Release Management

Purpose: Fix what “ready to release” means, for
CSDS-governed projects and for CSDS itself. Scope: The
release checklist, post-release rules, and CSDS’s own
versioning/chapter-numbering-stability policy.
Responsibilities: Release Manager — Chapter 26.
Process: Release Gate (Chapter 20, §20.4) passes →
version derived (Chapter 14) → tagged and changelogged.
Outputs: A tagged release with an accurate CHANGELOG
entry. Quality criteria: Compatibility, Maintainability
— see Appendix C.
Review criteria: Release Readiness interview (Chapter
30, §30.2). Related standards: Semantic Versioning,
ISO/IEC/IEEE 12207 (Transition/Release process). Related
chapters: 8,
14, 20, 34.

Orchestrates: Semantic Versioning (applied at
release scope, Chapter 14), ISO/IEC/IEEE 12207 (Transition/Release
process, Chapter 4). Combined with: Quality Gates (20),
Requirements Traceability (8). CSDS extension: the
concrete release checklist and, separately, the versioning/renumbering
policy for CSDS itself as a document.

23.1 Releasing a
CSDS-governed project

A release MUST NOT proceed until:

The Release gate (Chapter 20, §20.4) passes: every requirement in
the approved SRS is implemented, deferred, or explicitly out of scope
for this release, with no silent gaps.

The version number is derived from accumulated commit types since
the last release (Chapter 14, §14.3), not chosen arbitrarily.

CHANGELOG.md is updated with the release’s changes,
grouped by Added/Changed/Deprecated/Removed/Fixed.

A release is tagged in version control
(vMAJOR.MINOR.PATCH).

For a product in scope of Chapter
34 (external customers on more than one concurrent version): the
multi-version support matrix is updated to reflect the new release
before the release is considered complete.

23.2 Post-release

A released version’s behavior is what its OpenAPI spec, SRS, and
documentation say it is at the tagged commit — retroactively editing
those documents to describe a later version without bumping the
version is not permitted (this would break traceability, Chapter
8).

Rollback: the commit documentation (Chapter 18) for changes in a
release provides the rollback plan; a release found to be broken
MUST either be rolled back to the prior tag or
immediately followed by a PATCH release fixing the issue — it MUST NOT
be left in a known-broken state without a documented remediation
timeline.

23.3 Versioning policy for
CSDS itself

CSDS follows Semantic Versioning as a document, per the change
categories in CONTRIBUTING.md:

Change
Version impact

Editorial fix (typo, broken link, rewording without meaning
change)
PATCH

Clarification, new example, new appendix entry, new checklist
item
MINOR

New chapter or template added
MINOR

A mandatory gate removed, renamed, or its meaning changed such that
a previously-compliant project would no longer be compliant
MAJOR

23.4 Chapter numbering
stability

Once a chapter number is published in a numbered release (starting at
1.0.0), it MUST NOT be reassigned to
different content. A chapter that is removed MUST be
marked [Removed in vX.Y.Z, see CHANGELOG] rather than
deleted outright, and a new chapter MUST take the next
free number rather than reusing a retired one. This keeps historical
cross-references (from project SRS/ADRs citing a CSDS chapter)
valid.

23.5 Publishing v1.0.0

CSDS reaches 1.0.0 only when:

Every chapter in the Table of Contents has
moved from “Stub” to drafted content.

The final consistency pass (redundancy/contradiction/terminology
check across all chapters) has been completed.

The reference project
demonstrates every mandatory rule in running code, per Chapter 00’s
provenance principle.

Before 1.0.0, versions are 0.y.z and MAY
change more freely as the standard’s own shape is still settling
(consistent with SemVer’s own definition of the 0.y.z
line).

24 — Reference Project

Purpose: Prove every mandatory rule in running code,
not just prose. Scope: What the reference project is,
the chapter-to-demonstration mapping, and its explicit scope
limitations. Responsibilities: Lead Developer, Quality
Manager — Chapter 26.
Process: Kept in sync with every chapter change that
affects what it demonstrates (§24.4). Outputs: A small,
running, tested Task API. Quality criteria: Functional
Suitability, Reliability, Security, Maintainability — see Appendix C.
Review criteria: All seven review types, exercised on
its own Work Orders (Chapter 16). Related standards:
None directly — demonstrates every chapter’s orchestrated/original
rules. Related chapters: All.

Per Chapter 00’s provenance principle,
a rule that cannot be demonstrated in running code is not treated as
proven. This chapter maps every preceding chapter to where the reference
project demonstrates it.

24.1 What it is

A small Node.js/TypeScript REST API (reference-project/)
managing a single resource — tasks — with just enough surface area
(list, create, read, update, delete, plus one non-trivial non-functional
requirement) to exercise the full CSDS lifecycle without becoming a
maintenance burden in its own right. It is not a product; it exists to
prove the standard.

24.2 Mapping

CSDS chapter
Demonstrated by

5 — Discovery Interview
reference-project/docs/discovery-interview.md

6 — Stakeholder Analysis
Stakeholder section in
reference-project/docs/SRS.md

7 — Requirements/StRS/SRS
reference-project/docs/StRS.md
(STR-001..STR-005, frozen),
reference-project/docs/SRS.md
(REQ-001..REQ-00N, each traced to an
STR-xxx)

8 — Traceability
Traceability table in reference-project/docs/SRS.md,
including the StRS→SRS trace in
reference-project/docs/StRS.md §5

9 — Architecture/ADR
reference-project/docs/adr/0001-*.md,
0002-*.md + C4 description in project README

10 — API Design
reference-project/openapi.yaml, written before
src/routes

11 — Security/Identity
Bearer-token auth middleware demonstrating the OAuth 2.1 Client
Credentials shape (§24.3)

12/13 — AI/Agent
Provenance note in the project’s own commit documentation where
applicable

14 — Version Control
Conventional Commits history of reference-project/, its
own package.json version

15 — Testing
tests/unit, tests/integration,
tests/e2e in Test Pyramid shape

16 — Quality/Reviews
reference-project/docs/reviews/ review records for the
initial Work Order

17 — Documentation as Code / DIA
DIA record accompanying the bootstrap Work Order

18 — Commit Documentation
Commit messages in the reference project’s own history

19 — Work Orders
reference-project/docs/work-orders/WO-0001-bootstrap.md

20 — Quality Gates/DoD
.github/workflows/ci.yml implementing Build/Lint/Test
gates

21 — Repository Governance
The reference project’s own layout matches Chapter 21, §21.1

22 — Project Management
Noted as Kanban (single small backlog, WIP-limited) in the project
README

23 — Release Management
reference-project’s own CHANGELOG.md and
version tag

25 — Vision & Mission
Not code-demonstrable (articulates intent, no MUST rules of its
own); validated indirectly by every other chapter’s adherence to its
four-question test (ROADMAP.md’s Considered/Rejected
sections)

26 — Engineering Persona Model
Role assignment recorded in
reference-project/README.md

27 — AI Governance
reference-project/docs/ai-governance.md

28 — Configuration Management
reference-project/src/config.ts

29 — Project Health Dashboard
reference-project/docs/health/

30 — Engineering Interviews
reference-project/docs/discovery-interview.md (Project
Discovery instance) plus
reference-project/docs/reviews/WO-*.md (the other interview
instances, conducted as the reviews they precede)

31 — Data Protection, Compliance & Audit Trails
reference-project/src/audit/, REQ-010; DPIA trigger
check recorded as “not triggered” (§24.5)

Chapters 32-34 are not demonstrated by the reference
project — see §24.5.

24.3 Scope limitations,
stated explicitly

The reference project demonstrates the shape of each rule at
a scale proportionate to a small API — it is not a production
system:

Authentication demonstrates the OAuth 2.1 Client Credentials flow
shape (Chapter 11, §11.2) against an in-process token issuer for
demonstration purposes; it is not a hardened identity provider and MUST
NOT be reused as one in a real project without a proper IdP.

The ASVS level demonstrated is L1 (Chapter 11, §11.1), consistent
with an internal, non-sensitive-data reference project.

E2E tests cover one critical path (create → read → update → delete a
task through the real HTTP layer), not exhaustive scenario coverage —
consistent with the Test Pyramid’s E2E scarcity rule (Chapter 15,
§15.1).

24.4 Keeping it in sync

Because the reference project is how CSDS proves itself, a chapter
change that invalidates something the reference project demonstrates
MUST update the reference project in the same Work
Order (Chapter 19) — this chapter’s mapping table is itself subject to
the Documentation Impact Analysis (Chapter 17) for any such change.

24.5 Proportional
demonstration for Part IX

Part IX (Chapters 31-34) governs enterprise-scale concerns —
multi-tenancy, enterprise SSO, internationalization — that a
single-tenant, single-locale reference API cannot trigger without
abandoning Chapter 1, Principle 3 (simplicity over complexity) and
Chapter 24, §24.1’s stated purpose of staying small. CSDS resolves this
tension as follows, rather than either silently skipping proof or
bloating the reference project to force a demonstration:

Chapter 31’s core rule (append-only audit trails)
is demonstrated (§24.2) because it applies regardless
of scale — a single-tenant API still mutates records that may need an
audit trail.

Chapters 32 (Multi-Tenancy & Service Reliability), 33
(Enterprise Identity & Integration), and 34 (Product Longevity &
Internationalization) are not demonstrated here: their
scope triggers (more than one tenant, an enterprise IdP customer, more
than one supported locale) do not apply to this project. This is a
scope-inapplicability, not an unproven rule — Chapter 00’s provenance
principle requires proof where a rule’s precondition is met, not proof
of every rule regardless of applicability.

Full validation of Chapters 32-34 MUST happen
against a real project that actually triggers their scope before those
chapters are treated as proven at that scale. Until such a case study
exists, they remain reviewed for internal consistency (Chapter 16’s
Editorial/ Consistency Review) but not for runtime proof — this is
recorded honestly rather than implied otherwise.

Appendix A — Templates
and Checklists

Purpose: One index of every fillable artifact CSDS
chapters reference, so none has to be hunted down chapter by chapter.
Scope: Template index and the Requirements Traceability
Matrix shape. Responsibilities: Documentation Owner —
Chapter 26.
Related chapters: All chapters citing a template.

Index of all fillable templates referenced throughout CSDS. Each is a
standalone Markdown file under templates/ meant to be copied into
a project and filled in, not edited in place here.

Template
Used by
Purpose

StRS template
Chapter 7,
§7.8
Stakeholder Requirements Specification structure and freeze
gate

SRS template
Chapter
7
Software Requirements Specification structure

ADR template
Chapter 9
Architecture Decision Record structure

Commit
documentation template
Chapter 18
Structured body for non-trivial commits

Work Order
template
Chapter 19
Unit-of-work tracking

Discovery
Interview checklist
Chapter
5
Completeness check before SRS drafting

Definition of
Done checklist
Chapter
20
Per-Work-Order completion check

Documentation
Impact Analysis template
Chapter 17
Pre-commit documentation impact record

Review checklist
Chapter 16
Combined
Requirements/Architecture/Documentation/Quality/Security/Repository/AI
review

DPIA checklist
Chapter
31
Data Protection Impact Assessment trigger and record

Postmortem
template
Chapter
32
Blameless incident postmortem with tracked follow-ups

Support matrix
template
Chapter
34
Multi-version deprecation/support tracking

Requirements
Traceability Matrix (RTM) — recommended shape

Referenced by Chapter
8 as “the traceability table”; this is its full name. Not a separate
file — projects may inline it in their SRS or maintain it alongside:

Stakeholder Requirement
Requirement
Architecture element
Implementation
Test
Documentation
Release

STR-001
REQ-001
ADR-0001 / Container X
src/path/to/file.ts
tests/unit/x.test.ts
docs/SRS.md §4
v0.1.0

The Documentation column closes the loop with Chapter 17: a requirement’s
row names where it is described, not only where it is
implemented and tested, so a reader can verify the SRS entry, the ADR,
and the shipped behavior all still agree.

Using these templates

Copy the template file into the project
(e.g. docs/SRS.md, docs/adr/0001-*.md).

Fill in every field — an empty or placeholder field left in place is
a Documentation Review failure (Chapter 16), not an acceptable
stub.

Keep the template’s field names; do not rename them per-project, so
reviewers and tooling can rely on consistent structure across all CSDS
projects.

Appendix B — Standards
Index

Purpose: One bibliography for every standard CSDS
orchestrates. Scope: Full citations, cross-referenced
to the chapter that orchestrates each.
Responsibilities: Documentation Owner — Chapter 26.
Related chapters: 2.

Full citations for every external standard CSDS orchestrates (Chapter
2). CSDS references these by name and version; readers needing
authoritative detail should consult the source directly rather than this
appendix, which only records what is cited and where.

Standard
Full name
Orchestrated in

ISO/IEC/IEEE 29148
Systems and software engineering — Life cycle processes —
Requirements engineering
Chapter
7

ISO/IEC/IEEE 12207
Systems and software engineering — Software life cycle
processes
Chapter 4

ISO/IEC 25010
Systems and software Quality Requirements and Evaluation (SQuaRE) —
Quality models
Chapter 16

C4 Model
Software architecture visualization: Context, Container, Component,
Code (Simon Brown)
Chapter 9

Clean Architecture
Dependency-direction architectural style (Robert C. Martin)
Chapter 9
(optional)

OpenAPI Specification 3.1
OpenAPI Initiative / Linux Foundation
Chapter 10

OWASP ASVS
OWASP Application Security Verification Standard
Chapter
11

OAuth 2.1
IETF draft consolidating OAuth 2.0 security best current
practice
Chapter
11

OpenID Connect (OIDC)
OpenID Foundation — identity layer on top of OAuth 2.0/2.1
Chapter
11

Semantic Versioning (SemVer)
semver.org — MAJOR.MINOR.PATCH versioning
Chapter 14, 23

Conventional Commits
conventionalcommits.org — structured commit message format
Chapter 14

Scrum
Scrum Guide (Schwaber & Sutherland)
Chapter 22

Kanban
Kanban Method (Anderson)
Chapter 22

Test Pyramid
Testing strategy heuristic (popularized by Mike Cohn)
Chapter 15

Docs as Code
Documentation-as-code practice (version-controlled, reviewed docs
alongside source)
Chapter 17

RFC 2119 / RFC 8174
Key words for use in RFCs to indicate requirement levels
Chapter 3

The Twelve-Factor App (Config)
Application methodology, Factor III: strict config/code
separation
Chapter 28

GDPR / DSGVO
Regulation (EU) 2016/679 — General Data Protection Regulation
Chapter
31

ISO/IEC 27001
Information security management systems — Requirements (reference
framework, not certified against)
Chapter
31

eIDAS Regulation
Regulation (EU) 910/2014 — electronic identification and trust
services, incl. signature levels
Chapter
31 (lightweight orchestration)

Site Reliability Engineering (SRE)
Practice popularized by Google’s SRE book — SLOs, error budgets,
blameless postmortems
Chapter
32

SAML 2.0
OASIS Security Assertion Markup Language 2.0
Chapter
33

SCIM 2.0
System for Cross-domain Identity Management 2.0 (IETF)
Chapter
33

Unicode CLDR
Common Locale Data Repository — locale-specific formatting data
Chapter
34

Note on versions

Where a cited standard is itself versioned (e.g. OpenAPI 3.1, ASVS’s
numbered releases), a CSDS project SHOULD state which
specific version it targets in its own documentation (e.g. the OpenAPI
document’s own openapi: 3.1.x field), since CSDS does not
pin these versions on the project’s behalf.

Appendix C — Quality
Mapping Matrix

Complements Chapter 16,
§16.1, which maps each ISO/IEC 25010 characteristic to what is
checked and where. This appendix inverts the view: for every CSDS
chapter, which characteristics it primarily supports — the per-chapter
“Quality criteria” header field (introduced in v1.1.0) cites rows from
this table.

Legend: FS Functional Suitability ·
PE Performance Efficiency · Co
Compatibility · U Usability · R
Reliability · Se Security · M
Maintainability · Po Portability. A chapter is listed
only for the characteristics it primarily affects — most
chapters touch Maintainability at least indirectly by existing at all;
this table records where a chapter’s rules make a direct, checkable
difference to that characteristic, not every conceivable secondary
effect.

Chapter
FS
PE
Co
U
R
Se
M
Po

00 Preface

●

01 Purpose/Scope/Principles

●

02 Standards Landscape

●

●

03 Glossary

●

04 Lifecycle

●

●

05 Discovery Interview/Bootstrap
●

●

06 Stakeholder Analysis
●

●

07 Requirements/SRS
●
●

●
●
●

08 Requirements Traceability

●

●

09 Architecture/ADR

●

●

●
●

10 API Design

●
●

●

11 Security/Identity

●

12 AI/Prompt Engineering

●

●

13 Agent/Character/LLM/MCP

●
●
●

14 Version Control

●

15 Testing
●

●

16 Quality Model & Reviews
●
●
●
●
●
●
●
●

17 Docs as Code / DIA

●

18 Commit Documentation

●

19 Work Orders
●

●

20 Quality Gates & DoD
●
●
●
●
●
●
●
●

21 Repository Governance/Health

●
●

22 Project Management

●

23 Release Management

●

●

24 Reference Project
●

●
●
●

25 Vision & Mission

●

26 Engineering Persona Model

●

27 AI Governance

●
●
●

28 Configuration Management

●
●

●

29 Project Health Dashboard
●
●
●
●
●
●
●
●

30 Engineering Interviews
●

●

●

31 Data Protection/Compliance/Audit Trails

●
●
●

32 Multi-Tenancy & Service Reliability

●

●
●

33 Enterprise Identity & Integration

●

●

34 Product Longevity & Internationalization

●
●

●

Chapters 16, 20, and 29 legitimately span all eight characteristics:
they are the standard’s own aggregation points (the review taxonomy, the
gate composition, and the health dashboard respectively), not an
indication that “everything supports everything” elsewhere.

Using this table

When drafting or reviewing a chapter, its “Quality criteria” header
field should match its row here; if it doesn’t, one of the two is wrong
and should be corrected in the same change (Chapter 17, Documentation
Impact Analysis).

When a Quality Review (Chapter 16) needs to decide which
characteristics are relevant to a given change, start from the rows for
the chapters the change touches.

Appendix D — Master Index

Alphabetical keyword index across the whole standard, complementing
Chapter 3 — Glossary (which defines
terms) and Appendix B
(which cites external standards). Use this to find where a
concept is governed, not what it means.

Term
Chapter(s)

Acceptance criteria
7

ADR (Architecture Decision Record)
9, 26

Agent authority / scope
13, 27

AI Governance
27

AI Readiness
27, 29, 30

API design / OpenAPI
10

ASVS (OWASP Application Security Verification Standard)
11

Audit trail (append-only, tamper-evident)
31

C4 Model
9

Character engineering
13, 27

Chief Architect (naming convention)
26

Clean Architecture
9

Commit documentation
18

Configuration management
28

Conventional Commits
14

COO-equivalent (naming convention)
26

CTO-equivalent (naming convention)
26

Data Protection Impact Assessment (DPIA)
31

Data Subject Rights (DSR)
31

Definition of Done
20

Deprecation policy
34

Discovery Interview
5,
30

Documentation Impact Analysis (DIA)
17

Documentation Synchronization
17

Engineering Interviews (general method)
30

Enterprise SSO (SAML 2.0 / SCIM 2.0)
33

Feature flags
28

Gate (Quality Gate)
20

GDPR / DSGVO
31

Health Dashboard
29

Incident management / postmortem
32

Internationalization (i18n) / Localization (l10n)
34

Interview tooling (non-normative implementation aid)
5,
§5.4, 7,
§7.8.3, 30

Kanban
22

Knowledge Governance
27

MCP (Model Context Protocol)
13, 27

Memory Governance
27

Multi-tenancy / tenant isolation model
32

OAuth 2.1 / OpenID Connect
11

Organizational scaling (roles at team/department scale)
26

Persona (Engineering Persona Model)
26

Prompt engineering / Prompt Governance
12, 27

Quality Mapping Matrix
Appendix
C

Repository Bootstrap
5

Repository Health Check
21,
29

Requirement ID (REQ-xxx)
7

Requirements levels
(Business/Stakeholder/System/Software/Derived)
7

Requirements Traceability
8

Stakeholder Requirement ID (STR-xxx)
7, §7.8

StRS (Stakeholder Requirements Specification) / two-stage
requirements gate
7, §7.8

Retention and deletion policy
31

Reviews (seven types)
16

SAML 2.0 / SCIM 2.0
33

Scrum
22

Secrets management
11, 28

SemVer (Semantic Versioning)
14, 23

Service Level Objective (SLO) / error budget
32

SRS (Software Requirements Specification)
7

Stakeholder register
6

Standing AI Role Designation
26

Support matrix (multi-version)
34

Technical debt
28, 29

Test Pyramid
15

Tool Governance
27

Twelve-Factor App (Config)
28

Vision & Mission
25

Work Order
19, 26

25 — Vision & Mission

Purpose: State why CSDS exists, which engineering
problems it solves, and where it is going, so every later chapter can be
read against a single stated intent rather than reconstructed from rules
alone. Scope: The problem CSDS solves, why
orchestration over replacement, and the standard’s long-term direction.
Not a restatement of Chapter 1’s operating principles — this chapter is
the why, Chapter 1 is the how.
Responsibilities: Product Owner (owns this chapter’s
accuracy as the standard evolves) — see Chapter 26.
Process: Reviewed at every MAJOR version of CSDS
(Chapter 23) to confirm it still matches the standard’s actual
trajectory. Outputs: The stated mission new chapters
are checked against before being added (§25.4). Quality
criteria: N/A — this chapter is not a technical control; it is
the interpretive frame for all others. See Appendix C.
Review criteria: Editorial Review only (Chapter 16,
§16.4). Related standards: None directly — this chapter
motivates why Chapter 2’s orchestration of external standards exists at
all. Related chapters: 1, 2, 23.

25.1 The problem CSDS exists
to solve

Software engineering does not lack standards. It lacks a decision
about which standard governs which concern, on a given project, right
now — and a mechanism for keeping that decision current as the standards
themselves, and the practice of AI-assisted development, keep
changing.

In practice, this absence produces three recurring failures,
independent of any single team’s skill:

Re-derivation cost. Every new project re-litigates
which requirements format, which architecture notation, which auth flow
to use — expensive, and inconsistent across projects done by the same
organization.

Silent gaps. Concerns that no mainstream standard
covers well yet — AI/agent behavior, prompt versioning, repository
health over time — are left to ad hoc judgment, inconsistently applied
and rarely reviewed.

Standards drift apart. Two correctly-applied
standards (e.g. a requirements format and an API contract format) can
each be followed to the letter while still disagreeing with each other,
because neither was designed with the other in mind.

25.2 Why an
orchestration standard, not a new one

CSDS could have tried to define its own requirements notation, its
own architecture notation, its own security checklist. It does not, for
a concrete reason: any of those would either duplicate a standard
already maintained by domain experts (ISO working groups, OWASP, the
OpenAPI Initiative) with more scrutiny than one organization’s internal
standard can match, or drift out of sync with it over time as the source
standard updates and CSDS does not.

Orchestration avoids both failure modes: CSDS’s own content is small
(selection rules, combination rules, gaps, gates), so it stays
maintainable, while the depth of domain knowledge stays with the
standards built to hold it, updated on their own schedule.

25.3 Long-term vision

CSDS is intended to remain, indefinitely:

Current — when an orchestrated standard changes
materially (e.g. a new OWASP ASVS major version, a new OpenAPI major
version), the relevant CSDS chapter is updated to reference it within
one MINOR release cycle (Chapter 23).

Minimal — CSDS grows only to close a demonstrated
gap (Chapter 2, §2.2), never to restate what an orchestrated standard
already says adequately.

Proven — every mandatory rule remains demonstrated
in the reference project (Chapter 24); a rule that stops being
demonstrable is a defect in the standard, not an acceptable gap.

The default, not an option — CSDS’s ambition is to
be the automatic starting point for every Ronny Colditz software
project, to the point that not following it is the exception
requiring justification (Chapter 3, §3.3), not the other way
around.

25.4 The test for
adding anything new to CSDS

Before a new chapter, rule, or artifact is added to CSDS (as this
v1.1.0 release does in Part VIII), it must answer, in the affirmative,
all of:

Does an orchestrated standard already cover this adequately? (If
yes, reference it — do not add a new CSDS rule.)

Is the gap genuinely being hit in practice, not merely
hypothetical?

Can the new rule be made checkable (Chapter 1, Principle 5)?

Can it be demonstrated in the reference project (Chapter 24)?

A proposed addition that fails any of these is not ready, regardless
of how well-intentioned it is — consistent with Chapter 1’s principle
that simplicity outranks complexity.

26 — Engineering Persona
Model

Purpose: Define who is accountable for each CSDS
obligation, so “the team” is never the answer to “who approved this” or
“who reviews this.” Scope: Eleven roles used throughout
CSDS; a role is a responsibility set, not a headcount — one person or
agent MAY hold several roles on a small project (§26.2), or several
people/a department may share one role on a larger one (§26.4). §26.5
states the standing default AI role designation across projects, since
Ronny Colditz’s projects are developed with an AI agent (currently
Claude Code) as the default executor, not as a per-project exception.
Responsibilities: Product Owner (maintains this chapter
as roles evolve). Process: A role is assigned per
project at Repository Bootstrap (Chapter 5, §5.5) and recorded in the
project’s README.md. Outputs: A named (or
role-only, for small projects) owner for every gate and artifact in
Chapters 5-24. Quality criteria: Maintainability (clear
ownership reduces coordination cost) — see Appendix C.
Review criteria: Repository Review (Chapter 16) checks
that every role required for the project’s Work Orders is actually
assigned. Related standards: None directly
orchestrated; informed by common practice in Scrum (Product Owner) and
RACI-style accountability models. Related chapters: 5, 13, 16, 19, 22, 27.

26.1 Roles

Each role is defined by six fields: Responsibilities
(what it owns), Authority (what it can approve or
block), Inputs (what it needs to act),
Outputs (what it produces),
Deliverables (the concrete artifacts, cross-referenced
to their template), Interactions (which other roles it
depends on or hands off to).

Product Owner

Responsibilities: Owns the project’s mission and
priority; final arbiter of scope.

Authority: Approves the SRS (Chapter 7); approves
release scope (Chapter 23).

Inputs: Stakeholder needs (Chapter 6), business
context.

Outputs: Prioritized, approved requirements.

Deliverables: SRS approval record
(templates/srs-template.md §10).

Interactions: Receives from Stakeholder; hands
approved requirements to Requirements Engineer and Software
Architect.

Stakeholder

Responsibilities: States needs, constraints, and
acceptance expectations.

Authority: Can raise a contradiction or veto during
Requirements Review (Chapter 7, §7.6) for their own stated need.

Inputs: The project idea; the Discovery Interview
(Chapter 5).

Outputs: Stated needs, interests, constraints.

Deliverables: Entries in the stakeholder register
(Chapter 6, §6.2).

Interactions: Consulted by Requirements Engineer;
informed by Release Manager at release.

Requirements Engineer

Responsibilities: Conducts/oversees the Discovery
Interview (Chapter 5) and Stakeholder Analysis (Chapter 6); drafts and
maintains the SRS (Chapter 7); owns requirements traceability (Chapter
8).

Authority: Can block progression to Architecture if
the SRS fails Requirements Review.

Inputs: Project idea, stakeholder register.

Outputs: Approved SRS.

Deliverables: docs/SRS.md
(templates/srs-template.md).

Interactions: Hands approved requirements to
Software Architect; supplies requirement IDs to Lead Developer and
Quality Manager.

Software Architect

Responsibilities: Produces C4 views and ADRs
(Chapter 9); selects the API contract shape (Chapter 10) and security
posture (Chapter 11) in cooperation with the Security Reviewer.

Authority: Approves architecturally significant
decisions; can require an ADR before implementation proceeds.

Inputs: Approved SRS.

Outputs: C4 diagrams, ADRs, OpenAPI contract
skeleton.

Deliverables: docs/adr/*.md
(templates/adr-template.md),
openapi.yaml.

Interactions: Hands design to Lead Developer;
consults Security Reviewer for auth/ASVS decisions (Chapter 11).

Lead Developer

Responsibilities: Implements Work Orders (Chapter
19) against the approved architecture and contract; writes commit
documentation (Chapter 18).

Authority: Can split a Work Order that has grown
beyond one coherent change (Chapter 19, §19.4).

Inputs: ADRs, OpenAPI contract, Work Order.

Outputs: Implementation, tests (Chapter 15), commit
documentation.

Deliverables: Source code,
templates/commit-documentation-template.md instances.

Interactions: Requests review from Quality Manager
and Security Reviewer; coordinates with Repository Maintainer on
branch/CI state.

Quality Manager

Responsibilities: Owns the Quality Review (Chapter
16); tracks the Test Pyramid shape (Chapter 15) and ISO/IEC 25010
characteristics (Appendix C); owns the Project Health Dashboard’s
Quality Health category (Chapter 29).

Authority: Can fail the Quality Gate (Chapter 20)
regardless of schedule pressure (Chapter 1, Principle 4).

Inputs: Implementation, test results.

Outputs: Quality Review pass/fail record.

Deliverables:
templates/review-checklist.md (Quality Review
section).

Interactions: Blocks Release Manager from releasing
on failure; works with Lead Developer to remediate.

Security Reviewer

Responsibilities: Selects and verifies the ASVS
level (Chapter 11, §11.1); reviews auth flows and secret hygiene.

Authority: Can fail the Security Gate (Chapter 20)
unconditionally.

Inputs: Architecture, implementation, dependency
manifest.

Outputs: Security Review pass/fail record.

Deliverables:
templates/review-checklist.md (Security Review
section).

Interactions: Consulted by Software Architect
during design; reports into the Health Dashboard’s Security Health
category (Chapter 29).

Documentation Owner

Responsibilities: Owns Docs as Code practice
(Chapter 17); performs or verifies the Documentation Impact Analysis and
Documentation Synchronization check (Chapter 17, §17.6) for every
non-trivial change.

Authority: Can block a commit whose DIA is missing
or incomplete (Chapter 17, §17.3).

Inputs: The change under review, the current
documentation set.

Outputs: DIA records, updated documentation.

Deliverables:
templates/documentation-impact-analysis-template.md
instances.

Interactions: Works with Lead Developer on every
Work Order; feeds the Health Dashboard’s Documentation Health category
(Chapter 29).

Release Manager

Responsibilities: Owns the release checklist
(Chapter 23); derives the version bump from commit history (Chapter 14,
§14.3).

Authority: Can block a release until the Release
Gate (Chapter 20, §20.4) passes.

Inputs: All passing Work Orders for the release
scope.

Outputs: A tagged, changelogged release.

Deliverables: CHANGELOG.md entry,
version tag.

Interactions: Coordinates with every other role at
release time; informs Stakeholders and Product Owner of what
shipped.

AI Agent

Responsibilities: Executes Work Orders and/or
reviews under Chapters 12-13 and 27’s authority boundaries; surfaces
uncertainty rather than guessing (Chapter 12, §12.2).

Authority: Bounded by its documented scope (Chapter
13, §13.1); MUST escalate for human confirmation on
irreversible/high-blast-radius actions.

Inputs: A Work Order, requirement, or review
request.

Outputs: Implementation, documentation, or review
findings, with explicit provenance.

Deliverables: Commits with AI provenance noted
(Chapter 12, §12.2); AI Review records (Chapter 16).

Interactions: Reports to whichever human role owns
the Work Order (typically Lead Developer or Requirements Engineer);
reviewed by Quality Manager and Security Reviewer like any other
contributor.

Repository Maintainer

Responsibilities: Owns repository structure
(Chapter 21, §21.1), CI pipeline health, and periodic Repository Health
Checks (Chapter 21, §21.3).

Authority: Can require a health check before the
next release (Chapter 21, §21.5).

Inputs: Repository state over time.

Outputs: Health check records; CI
configuration.

Deliverables: Health check records (Chapter 21,
§21.4), Project Health Dashboard’s Repository Health category (Chapter
29).

Interactions: Informs Release Manager of any
overdue health check that should block release.

26.2 Role consolidation on
small projects

CSDS does not require eleven distinct people. On a small project
(including the reference project, Chapter 24), one person, or one AI
agent operating under Chapter 12-13 with human sign-off at minimum on
Quality Manager and Security Reviewer decisions, MAY hold multiple
roles. What MUST NOT collapse:

The role that approves a gate (e.g. Security
Reviewer) SHOULD be a distinct check from the role that
produced the work being gated (e.g. Lead Developer),
even if the same individual performs both acts at different times with
the checklist in hand — self-review is permitted (Chapter 16, §16.3),
self-skipping is not.

26.3 Recording role assignment

Every project records its role assignment (named individuals, or role
names alone for a solo/AI-assisted project) in its
README.md, following Chapter 21,
§21.1’s required layout.

26.4 Organizational
scaling for larger teams

§26.2 covers consolidating roles onto fewer people; the
inverse problem appears once a project is built by an organization large
enough to have multiple people per role (e.g. several Lead Developers, a
dedicated Security team, a Support/Customer-Success function interacting
with enterprise customers per Chapter 33).
CSDS does not add new roles for this — it adds two rules so the eleven
roles keep meaning something at scale:

Where multiple individuals share one role (e.g. several Lead
Developers), exactly one MUST be identifiable as
accountable for a given Work Order’s role-obligations at any time — “the
team” is not a valid answer to “who approved this” (Chapter 26’s own
stated purpose) even when the team is large.

A department or sub-team that exists around a role (e.g. a
Support team escalating incidents per Chapter 32,
§32.5) MUST map onto exactly one of the eleven
roles as its point of accountability into the CSDS process — CSDS
governs the interface between organizational structure and engineering
process, not the organizational chart itself, which is out of CSDS’s
scope (Chapter 1, §1.3).

26.5 Standing AI role
designation

§26.2 covers an AI agent consolidating roles for one
project, decided case by case. In practice, Ronny Colditz’s
projects are developed with an AI agent (currently Claude Code) as the
default executor across nearly every role, on every project — that is a
standing operating fact, not a per-project exception, and this standard
should say so directly rather than leaving it to be re-derived from
§26.2 each time.

26.5.1 Default role holders

Unless a project’s Discovery Interview (Chapter 5) or role assignment
record (§26.3) states otherwise, the following holds by default:

Role
Default holder
Notes

Product Owner
Human (Ronny Colditz)
Never AI by default — mission, priority, and scope authority stay
human (§26.5.2).

Stakeholder
Human(s), as applicable
Stakeholders are external to the engineering process by
definition.

Requirements Engineer
AI, drafts
Product Owner still approves the SRS (Chapter 7, §7.6).

Software Architect
AI, standing
See the “Chief Architect” naming convention, §26.5.3.

Lead Developer
AI, standing

Quality Manager
AI drafts; human sign-off required
Per §26.2 — unchanged by this section.

Security Reviewer
AI drafts; human sign-off required
Per §26.2 — unchanged by this section.

Documentation Owner
AI, standing

Release Manager
AI drafts; human gives final release sign-off
Ronny Colditz approves the actual release action (Chapter 23), even
though the AI prepares the checklist/CHANGELOG.

AI Agent
AI, by definition
Chapter 13.

Repository Maintainer
AI, standing

This is a default, not a ceiling or a floor: a
project MAY assign a human to any AI-default role instead
(e.g. retaining a human security consultant for a high-risk Ambuliq
deployment, Chapter 31), recorded per §26.3 with the reason noted (an
ADR, Chapter 9, if the reason is itself an architecturally significant
decision).

26.5.2 What never defaults to AI

Regardless of how much of the role table above the AI holds, the
following MUST NOT default to the AI, consistent with
Chapter 13, §13.1’s rule that agent authority must not exceed what a
human reviewer can meaningfully review after the fact:

Product Owner’s mission/priority authority — what
to build and why is a human decision the AI executes against, not one it
makes for itself.

Final release sign-off — the AI MAY prepare
everything the Release Manager role produces (Chapter 23), but the
decision to actually ship MUST be a human action, not an autonomous
one.

Anything already requiring human confirmation under Chapter 13,
§13.1 (irreversible or high-blast-radius actions) regardless of which
role is nominally “held.”

26.5.3 Naming
convention for external communication

CSDS’s eleven roles are precise but not always the vocabulary a
customer, auditor, or new hire expects. The following labels
MAY be used purely as a communication
convenience when describing the standing AI role designation
externally — they rename groups of existing CSDS roles, they do
not create new authority, new legal standing, or a
corporate-officer relationship beyond what Chapters 13 and 26 already
define:

External label
Maps to (CSDS roles)

Chief Architect
Software Architect

CTO-equivalent
Software Architect + Lead Developer + Repository Maintainer, plus
the drafting (not approving) capacity for Quality Manager and
Security Reviewer

COO-equivalent
Documentation Owner + Release Manager (drafting) + the Chapter 22
project-management cadence

A project MUST NOT use these labels to imply the AI
holds Product Owner authority or final release sign-off (§26.5.2) — the
labels describe execution capacity, never the retained human
decision authority.

26.5.4 Gate

The Repository Review (Chapter 16) MUST verify,
where this section’s default is in effect, that the project’s role
assignment record (§26.3) either states the default applies as-is or
documents its deviations — “undocumented, assume the default” is not
itself a valid record; the default must still be stated, not
merely true.

27 — AI Governance

Purpose: Separate AI/agent rules into Policy (what
is allowed), Implementation (how it is built), and Operations (how it is
run and checked) so each can be reviewed by the right role without
re-deriving the other two. Scope: Governance structure
across seven domains: AI, Prompt, Knowledge, Memory, Character, Tool,
Agent. Does not restate the base rules already in Chapter 12 and Chapter 13 — it
organizes them, and adds Knowledge and Memory Governance, which Chapters
12-13 did not yet cover. Responsibilities: AI Agent
(implements within policy), Security Reviewer (approves Policy layer for
each domain) — Chapter
26. Process: A project completes the governance
table (§27.2) once at Repository Bootstrap (Chapter 5) for any project
using AI/agents beyond incidental coding assistance, and revisits it at
each Repository Health Check (Chapter 21). Outputs: A
per-project AI Governance record stating policy, implementation, and
operational check for each applicable domain. Quality
criteria: Security, Maintainability, Reliability — see Appendix C.
Review criteria: AI Review (Chapter 16, §16.2).
Related standards: None directly orchestrated (Chapter
2, §2.2, row 15-16 — no mature external standard yet). Related
chapters: 12, 13, 26, 29.

27.1 The three layers

Layer
Question
Owner

Policy
What is this domain allowed and forbidden to do?
Security Reviewer, Product Owner

Implementation
How is the policy built into the system (code, config,
prompts)?
Lead Developer, AI Agent

Operations
How is adherence checked while running, and what happens on
violation?
Quality Manager, Repository Maintainer

Separating these means a policy change (e.g. tightening what data an
agent may access) does not require touching implementation code review
sign-off twice — the Policy layer is reviewed and approved
independently, then Implementation and Operations are checked against
it.

27.2 The seven domains

AI Governance (umbrella)

Policy: Chapter 12’s principles (§12.2) apply
project-wide; this row records any project-specific tightening (e.g. “no
AI-generated code merges without human review” for a high-risk
project).

Implementation: CI/review configuration enforcing
the policy (e.g. a required human-reviewer check on PRs, Chapter
20).

Operations: AI Review (Chapter 16) at every
relevant gate.

Prompt Governance

Policy: Which prompts are versioned system
artifacts (Chapter 12, §12.3) vs. ephemeral; who may change a production
prompt.

Implementation: Prompts stored in the repository,
referenced by requirement ID where they affect user-facing behavior
(Chapter 12, §12.3).

Operations: Prompt changes tested against
representative inputs before merge (Chapter 12, §12.3); regressions
tracked like any other defect.

Knowledge Governance

Policy: What data sources an AI/agent may read
(e.g. project repository, specific MCP-connected systems, Chapter 13
§27.6) and, where relevant, what it may not be given
(secrets, other customers’ data, data outside the project’s stated
scope).

Implementation: Access scoped by the same mechanism
as human access control where possible (same credentials, same
boundaries) rather than a separate, harder-to-audit AI-only access
path.

Operations: Any expansion of an agent’s data access
is itself a reviewable change (Security Review, Chapter 16), not a
runtime-only configuration toggle that bypasses review.

Memory Governance

Policy: Whether an agent retains information across
sessions/runs, for how long, and what categories of information
(e.g. task state) vs. what it MUST NOT retain (secrets, one-off
sensitive user input) absent explicit need.

Implementation: Persistent agent memory (where
used) is stored in a location subject to the same Repository/Security
Review as any other persisted data — not an opaque store outside CSDS’s
review reach.

Operations: Retained memory is periodically
reviewable (e.g. as part of a Repository Health Check, Chapter 21) so
accumulated context does not silently drift from what the project
believes the agent knows.

Character Governance

Policy: Chapter 13, §13.2’s persona rules;
project-specific tone, disclosure, and refusal boundaries.

Implementation: Persona specification stored as a
versioned document (Chapter 13, §13.2).

Operations: Persona-affecting changes go through
the same review gates as user-facing behavior changes (Chapter 13,
§13.2).

Tool Governance

Policy: Chapter 13, §13.4’s MCP rules; which
tools/actions an agent may invoke, and which require human confirmation
(Chapter 13, §13.1).

Implementation: Tool/action authorization
boundaries enforced in code or MCP server configuration, not only
documented intent.

Operations: New tool/MCP dependencies are reviewed
before being wired in (Chapter 13, §13.5), and audited at Repository
Health Check time for ones no longer in active, justified use.

Agent Governance

Policy: Chapter 13, §13.1’s authority and
delegation rules. Where the agent is the standing default executor
across most Engineering Persona Model roles (Chapter 26, §26.5 — the
default for Ronny Colditz’s projects), that section’s role table and its
“what never defaults to AI” boundary (§26.5.2) is this domain’s
policy.

Implementation: Agent scope documented per Chapter
13, §13.1; multi-agent ownership assigned per the same section.

Operations: AI Review verifies documented scope
matches observed agent actions (Chapter 16, §16.2), including that
Product Owner authority and final release sign-off were not silently
assumed by the agent (Chapter 26, §26.5.2).

27.3 Recording the governance
table

Projects using AI/agents beyond incidental coding assistance MUST
record the table in §27.2, filled in per project, alongside their
architecture documentation (Chapter 9). A domain that is genuinely not
applicable (e.g. no persistent memory is used) is recorded as “N/A”
explicitly, not omitted.

27.4 Gate

The AI Review (Chapter 16) MUST verify the governance table exists
and is current for any project using AI/agents beyond incidental coding
assistance, and MUST check that Knowledge and Memory Governance in
particular have not been left as an implicit default (§27.2).

28 — Configuration
Management

Purpose: Fix where configuration lives, how it is
validated, and how it changes, so environment-specific behavior is never
a guess. Scope: Environment management, configuration
strategy, secrets, feature flags, deployment/runtime configuration,
validation, and versioning. Responsibilities: Lead
Developer (implementation), Repository Maintainer (secrets/CI
configuration) — Chapter
26. Process: Configuration strategy is decided at
Repository Bootstrap (Chapter 5, §5.5) and recorded as an ADR if it
deviates from §28.1’s default. Outputs: A documented,
validated configuration surface with no undocumented
environment-dependent behavior. Quality criteria:
Reliability, Portability, Security — see Appendix C.
Review criteria: Security Review (secrets), Repository
Review (structure) — Chapter 16. Related standards: The
Twelve-Factor App methodology (Factor III: Config), orchestrated per
§28.1. Related chapters: 11 (secret hygiene),
21.

28.1 Selection

The Twelve-Factor App methodology’s Config factor is selected: strict
separation of configuration (anything that varies between deploy
environments) from code, sourced from the environment rather than baked
into source or committed files.

28.2 Environment management

Every project MUST define its deploy environments explicitly (e.g.
local, staging, production) and MUST NOT rely on implicit, undocumented
differences between them.

Environment-specific values MUST come from environment variables or
an equivalent externalized source (secret manager, deploy-time
injection), never from environment-conditional code branches encoding
the actual values.

28.3 Configuration strategy

A project states, once, its configuration source of truth (e.g.
.env files for local development plus a named secret
manager for deployed environments) and applies it consistently — CSDS
does not mandate a specific tool, only that one strategy is picked and
followed.

Default values MAY ship in code for genuinely non-sensitive settings
(e.g. a default port); anything sensitive or environment-varying MUST
NOT have a committed default that would work unmodified in production
(Chapter 11, §11.4’s secret-hygiene rule extends here directly — see the
reference project’s CSDS_REF_JWT_SECRET handling, Chapter
24).

28.4 Secrets

Secrets (credentials, signing keys, tokens) MUST NOT be committed to
version control under any circumstance, including in test fixtures — use
clearly-fake, documented placeholder values for tests/demos (Chapter 11,
§11.4).

Secret rotation MUST be possible without a code change — secrets are
referenced by name/location, not hardcoded.

28.5 Feature flags

A feature flag MUST be traceable to the requirement it gates
(Chapter

and MUST have a stated removal plan — a flag left in place after its
feature is fully rolled out and stable is technical debt, tracked at the
next Repository Health Check (Chapter 21, §29 Health Dashboard).

Flags MUST NOT be used to silently bypass a Quality Gate (Chapter
20) for code that is otherwise incomplete.

28.6 Deployment and
runtime configuration

Deployment configuration (how a build is deployed) and runtime
configuration (how a running instance behaves) are kept distinct and
each documented in the project’s README or a dedicated
CONFIGURATION.md.

A configuration change that affects running behavior MUST go through
the same Documentation Impact Analysis as a code change (Chapter 17) —
configuration is part of the system’s behavior, not outside it.

28.7 Configuration validation

A project SHOULD validate required configuration at startup (fail
fast with a clear error if a required value is missing or malformed)
rather than failing unpredictably deep in request handling.

28.8 Configuration versioning

Breaking changes to a configuration schema (a required variable
renamed, removed, or its accepted values narrowed) follow the same
SemVer discipline as code (Chapter 14) — a breaking config change is at
least a MINOR bump with a documented migration note, and a MAJOR bump if
it affects a published contract (Chapter 10).

28.9 Gate

The Security Review MUST verify no secrets are committed (§28.4); the
Repository Review MUST verify the project’s configuration strategy is
documented and its environment variables/settings are consistent with
that documentation (Chapter 20).

29 — Project Health
Dashboard

Purpose: Give a project one place to see whether it
is getting healthier or degrading over time, across every dimension CSDS
already reviews individually. Scope: A consolidated
snapshot format aggregating existing review and health-check outputs
(Chapters 16, 21) — this chapter does not define new checks, it defines
how existing ones are summarized and tracked over time.
Responsibilities: Quality Manager (compiles),
Repository Maintainer (Repository Health category) — Chapter 26.
Process: Compiled at every Repository Health Check
(Chapter 21, §21.3) and before every release (Chapter 23).
Outputs: A dated dashboard record with a score, status,
and trend per category. Quality criteria: All eight
ISO/IEC 25010 characteristics, viewed in aggregate — see Appendix C.
Review criteria: Repository Review (Chapter 16) checks
the dashboard is current, not stale. Related standards:
None directly — aggregates Chapters 7, 8, 9, 15, 16, 17, 21, 27.
Related chapters: 21, 16.

29.1 Categories

Category
Sourced from
What “healthy” looks like

Repository Health
Chapter 21, §21.3
Dependencies current, CI green, no secret hygiene findings

Requirements Health
Chapter 7, 8
No orphan requirements (§8), no stale/contradictory SRS entries

Architecture Health
Chapter 9
Every component traces to a requirement; no overdue ADR review
dates

Documentation Health
Chapter 17
No known-stale document; DIA performed for all recent changes

Quality Health
Chapters 15, 16
Test Pyramid shape intact; no long-quarantined flaky tests

Security Health
Chapter 11, 28
ASVS-level checks current; no committed secrets; no overdue
rotations

Technical Debt
Chapter 28, §28.5; general
Tracked, not accumulating silently (e.g. flagged feature flags,
deferred Work Order follow-ups)

AI Readiness
Chapter 27
Governance table (Chapter 27, §27.3) current; agent scope matches
observed behavior

29.2 Per-category fields

Each category, at each compilation, records:

Field
Meaning

Status
Green / Yellow / Red

Score
A number or simple count meaningful for that category (e.g. “0
broken links,” “3 overdue ADR reviews”) — CSDS does not mandate a single
numeric scale across categories, since forcing dissimilar things onto
one scale would obscure more than it reveals

Trend
Improving / Stable / Degrading, relative to the previous
compilation

Recommended actions
Concrete next steps, or “None” if genuinely healthy

29.3 Status thresholds

Green — no open findings in that category since the
last check.

Yellow — findings exist but are tracked with owners
and no gate (Chapter 20) currently fails because of them.

Red — a finding in that category would fail, or has
failed, a Quality Gate (Chapter 20). A Red category MUST block the next
release (Chapter 23) until it returns to at least Yellow with a
documented remediation plan.

29.4 Recording

The dashboard is a short, dated Markdown record (see the reference
project’s docs/health/ for a worked example, Chapter 24) —
it is a summary view, not a new source of truth; each row cites the
underlying review or health check record it summarizes rather than
re-deriving findings independently.

29.5 Gate

The Repository Review (Chapter 16, 20) MUST verify a dashboard record
exists dated within the project’s stated health-check cadence (Chapter
21, §21.3) before release, and that no category is Red without a
documented remediation plan.

30 — Engineering Interviews

Purpose: Generalize the Discovery Interview’s
completeness-gated method (Chapter 5) to every other point in the
lifecycle where a structured conversation — human-to-human or
AI-conducted — determines whether a project is actually ready to
proceed. Scope: Reusable interview workflows for
Project Discovery, Requirements Review, Architecture Review, Security
Review, Quality Review, Release Readiness, Repository Health, and AI
Readiness. Chapter 5 retains the specific Discovery Interview content;
this chapter is the general method plus the seven additional instances.
Responsibilities: Requirements Engineer (Discovery,
Requirements), Software Architect (Architecture), Security Reviewer
(Security), Quality Manager (Quality, Release Readiness, Repository
Health), AI Agent (AI Readiness) — Chapter 26.
Process: Run at the corresponding gate (Chapter 20)
before that gate is declared passed. Outputs: A
completeness-gated interview record per instance, not a fixed-length
Q&A transcript. Quality criteria: All
characteristics relevant to the interview’s subject — see Appendix C.
Review criteria: The review type each interview
instance precedes (Chapter 16, §16.2). Related
standards: None directly; generalizes the method already
selected in Chapter 5 for ISO/IEC/IEEE 29148’s elicitation gap.
Related chapters: 5, 16, 20.

30.1 The general method

Every Engineering Interview instance follows the same shape as
Chapter 5, §5.2’s Discovery Interview:

It is conducted by whichever role owns the corresponding review
(§30.2’s table).

It MUST NOT be considered complete after a fixed
number of questions or a fixed time box. It is complete only when the
interviewer has actively checked, and can state findings for, every item
in that instance’s completeness checklist (§30.3).

Findings are recorded, including explicit “none identified, checked”
entries — a blank item is not a valid completion state (Chapter 5,
§5.2).

The interview MAY be conducted by an AI agent under Chapter 12’s
rules (uncertainty surfaced, not hidden), with the same completeness bar
as a human interviewer.

Whoever conducts it MAY use adversarial, interrogative interview
tooling that keeps asking follow-up questions until the instance’s
completeness checklist (§30.3) is actually covered (Chapter 5, §5.4
gives one example) — this is a non-normative implementation aid, not a
substitute for the completeness bar in item 2.

30.2 The eight instances

Instance
Precedes
Owner (Chapter 26)

Project Discovery
SRS drafting
Requirements Engineer

Requirements Review
Requirements approval (Chapter 7, §7.6)
Requirements Engineer, Product Owner

Architecture Review
Implementation start (Chapter 9, §9.5)
Software Architect

Security Review
Security Gate (Chapter 11, §11.4)
Security Reviewer

Quality Review
Quality Gate (Chapter 16, §16.1)
Quality Manager

Release Readiness
Release (Chapter 23)
Release Manager

Repository Health
Health Check record (Chapter 21, §21.4)
Repository Maintainer

AI Readiness
AI Review (Chapter 27, §27.4)
AI Agent, Security Reviewer

Project Discovery is Chapter 5’s Discovery Interview by another name
in this table — included here only so §30.2 is the single place listing
all eight, not to redefine it; its checklist remains Chapter 5,
§5.2.

30.3 Completeness checklists

Each non-Discovery instance’s checklist is the corresponding
chapter’s existing gate criteria, read as interview prompts rather than
a pass/fail form filled in after the fact:

Requirements Review interview: For each
requirement, has verifiability, stakeholder linkage, and
non-contradiction actually been checked (Chapter 7, §7.6) — not
assumed because the template field is filled in?

Architecture Review interview: Has every
component’s requirement traceability (Chapter 9, §9.5) been walked, not
sampled by assumption?

Security Review interview: Has the ASVS level’s
applicable requirement set (Chapter 11) actually been walked for this
specific change, including ones that seem obviously fine?

Quality Review interview: Have all relevant ISO/IEC
25010 characteristics (Appendix C) been considered, not only the ones
the change author already had in mind?

Release Readiness interview: Is every requirement
in the release scope accounted for as implemented, deferred, or out of
scope (Chapter 8), with no silent gap?

Repository Health interview: Have all eight Chapter
21/29 categories been checked, including ones with no obvious
findings?

AI Readiness interview: Is the Chapter 27
governance table current for every domain, including ones the project
hasn’t touched recently?

30.4 Why fixed
question counts are prohibited

A fixed-length interview optimizes for appearing thorough on
schedule, not for actually surfacing what is missing — the same failure
mode Chapter 5 identifies for Discovery. Every instance in this chapter
inherits that prohibition directly.

30.5 Gate

A review type in §30.2 MUST NOT be recorded as passed (Chapter 16)
unless its corresponding interview record exists and shows the
completeness checklist in §30.3 explicitly addressed, not skipped.

31 — Data
Protection, Compliance & Audit Trails

Purpose: Give CSDS-governed projects that process
personal data or produce legally/organizationally relevant records a
concrete, checkable baseline — rather than leaving data protection and
audit-trail integrity as an unstated assumption. Scope:
Data protection by design, data subject rights, audit trail
immutability, retention/deletion policy, and Data Protection Impact
Assessment (DPIA) triggers. Information security management
(ISMS) stays with ISO/IEC 27001 itself — this chapter orchestrates it,
it does not restate it. Responsibilities: Security
Reviewer, Documentation Owner — Chapter 26.
Process: DPIA trigger check during Requirements
Engineering (Chapter 7) → data protection requirements become
REQ-xxx like any other → audit trail design recorded as an
ADR (Chapter 9) → verified at Security Review (Chapter 16).
Outputs: Documented lawful basis per
personal-data-processing requirement; an audit trail design that cannot
be silently altered; a stated retention/deletion policy. Quality
criteria: Security, Reliability, Maintainability — see Appendix C.
Review criteria: Security Review (Chapter 16, §16.2).
Related standards: GDPR/DSGVO (Regulation (EU)
2016/679), ISO/IEC 27001. Related chapters: 7, 11, 21.

31.1 Selection

GDPR/DSGVO is selected as the legal baseline for any project
processing personal data of EU/EEA residents, regardless of where Ronny
Colditz’s projects are hosted — it is the strictest commonly-applicable
regime and satisfying it tends to satisfy narrower regimes as a side
effect. ISO/IEC 27001 is selected as the reference framework for the
organizational information security controls a project’s operator (not
the code itself) must have in place; CSDS does not certify against
27001, it orchestrates which of its control areas are relevant to a
given project’s Security Review.

Neither standard defines how an individual codebase should
structure an immutable audit trail or a deletion routine — that gap is
this chapter’s original contribution (§31.4-31.6).

31.2 Data protection
by design and by default

Every requirement that involves processing personal data
MUST state its lawful basis (consent, contract, legal
obligation, legitimate interest, etc.) in the SRS (Chapter 7) alongside
the requirement.

A requirement MUST NOT collect or retain personal
data beyond what the stated lawful basis and purpose justify (data
minimization) — recorded as a Derived Requirement (Chapter 7, §7.5)
where a design choice would otherwise over-collect.

Default configuration MUST be the most
privacy-protective option (Chapter 28’s configuration validation
applies: a privacy-relevant default that is wrong MUST fail fast, not
silently under-protect).

31.3 Data Subject Rights (DSR)

A project processing personal data of identifiable individuals
MUST implement, or explicitly document as
not-yet-implemented with a tracked follow-up (Chapter 29’s Technical
Debt category), a way to fulfill:

Right
Minimum implementation

Access
Export of the data held about a data subject

Rectification
A path to correct inaccurate data (may be the existing update
operation)

Erasure
A deletion path consistent with §31.6’s retention policy

Portability
Export in a structured, commonly-used format

Objection / restriction
A way to flag a subject’s data as restricted from further
processing

These MUST be traceable requirements
(REQ-xxx) like any other (Chapter 8) — DSR support is a
functional requirement, not an afterthought bolted on post-release.

31.4 Audit trails (CSDS
original extension)

Neither GDPR nor ISO/IEC 27001 specifies how to make an audit trail
tamper-evident at the code level. CSDS requires:

Any record whose history has legal, contractual, or
quality-management significance (the common case for
document-control/process-management software; Chapter 9’s ADRs and
Chapter 18’s commit documentation are CSDS’s own instances of this
principle) MUST be logged in an
append-only structure: existing entries are never
edited or deleted, only superseded by a new entry that references what
it supersedes (the same pattern Chapter 9, §9.4 already requires for
ADRs).

Each audit trail entry MUST record: who/what
performed the action (a user, or an AI Agent per Chapter 13), what
changed, when, and why where available (linking to a
REQ-xxx or Work Order where applicable).

Tamper-evidence SHOULD be technically enforced
(e.g. a hash chain, a database-level append-only/WORM constraint, or an
external write-once log), not merely a social convention that the
application code “just doesn’t” expose an edit path — a technically
preventable bypass MUST NOT be treated as acceptable.

An audit trail MUST NOT be exempt from Chapter 21’s
Repository Health Checks: its continued append-only integrity is itself
a checkable item.

31.5 Electronic
signatures (lightweight orchestration)

Where a project requires a legally binding electronic signature
(common in document-control/approval-workflow software), the EU’s eIDAS
Regulation ((EU) 910/2014) is the selected reference for signature
levels (simple, advanced, qualified). CSDS does not mandate a signature
level — the project’s SRS (Chapter 7) MUST state which
level it needs and why, as a non-functional requirement, and the
Security Review MUST verify the implementation matches
the stated level’s technical requirements (non-repudiation, signer
authentication, tamper-evidence of the signed content — the last of
which is the same audit-trail principle as §31.4).

31.6 Retention and deletion
policy

Every category of personal or legally-significant data
MUST have a stated retention period (which MAY be
“indefinite” if justified — e.g. a regulatory record-keeping obligation
— but MUST NOT be an unstated default).

Deletion at the end of a retention period MUST be
either automated or checked at a stated cadence (Chapter 21’s
Repository/Health Check cadence is a reasonable anchor point for the
latter) — “we’ll get to it eventually” is not a retention policy.

A retention/deletion policy change MUST go through
the same Documentation Impact Analysis as any other change (Chapter 17)
— it is documentation with direct operational consequences, not a
footnote.

31.7 Data
Protection Impact Assessment (DPIA) trigger

During the Discovery Interview (Chapter 5) or a Requirements Review
interview (Chapter 30), the interviewer MUST check
whether the project’s processing is likely to result in high risk to
individuals (large-scale sensitive data, systematic monitoring,
automated decision-making with legal/similar effect). If so, a DPIA
MUST be performed before Requirements Review is
considered passed, and its outcome recorded alongside the SRS. A project
that is clearly low-risk (e.g. the reference project, Chapter 24)
records “DPIA not triggered, checked explicitly” rather than omitting
the check.

31.8 Gate

The Security Review (Chapter 16, §16.2) MUST verify:
lawful basis stated for every personal-data requirement (§31.2), DSR
paths implemented or tracked (§31.3), audit trail append-only integrity
holds (§31.4), signature level (if any) matches implementation (§31.5),
retention policy exists and is enforced (§31.6), and the DPIA trigger
was checked (§31.7).

32 —
Multi-Tenancy & Service Reliability

Purpose: Give a project that runs as a live,
multi-customer service a concrete operating model — tenant isolation,
reliability targets, and incident handling — instead of leaving “how we
run this in production” as an unstated assumption once it ships.
Scope: Tenant isolation model selection,
SLOs/SLIs/error budgets, incident management, and low-downtime
deployment. Repeals Chapter 1, §1.3’s prior exclusion of SRE/on-call
practice. Responsibilities: Software Architect
(isolation model), Repository Maintainer (incident process), Release
Manager (deployment) — Chapter 26.
Process: Isolation model decided and recorded as an ADR
(Chapter 9) before Repository Bootstrap for any project with more than
one customer/tenant; SLOs stated as non-functional requirements (Chapter
7). Outputs: A recorded isolation model, stated SLOs
with error budgets, an incident severity/response process, a deployment
strategy that meets the stated availability target. Quality
criteria: Reliability, Performance Efficiency, Security — see
Appendix C.
Review criteria: Quality Review, Security Review
(Chapter 16, §16.2). Related standards: Site
Reliability Engineering (SRE) practice (Google). Related
chapters: 1, 9, 20, 29.

32.1 Selection, and
repeal of the prior exclusion

CSDS v1.0.0 (Chapter 1, §1.3) excluded “deep SRE/on-call practice” as
out of scope, on the basis that it was not yet a demonstrated need. For
a project operated as a live, multi-tenant SaaS product (the class of
project this chapter addresses), that exclusion no longer holds —
Chapter 1 is updated accordingly. Site Reliability Engineering practice
(the discipline popularized by Google’s SRE book: SLOs, error budgets,
blameless postmortems) is selected as the reference framework; CSDS does
not restate it, it fixes which parts are mandatory for a CSDS-governed
service and how they connect to existing chapters.

Multi-tenancy isolation itself has no single authoritative external
standard — common cloud-provider architecture guidance converges on the
same three models (§32.2), which CSDS adopts directly as an original
extension.

32.2 Tenant isolation model

Before Repository Bootstrap, a multi-tenant project
MUST select and record (as an ADR, Chapter 9) one
isolation model:

Model
Description
When appropriate

Silo
Each tenant has fully separate infrastructure/data store
Highest isolation guarantee needed (regulatory, contractual); higher
operating cost

Pool
All tenants share infrastructure and data store, isolated logically
(e.g. tenant ID on every row/query)
Default for most SaaS products; lowest operating cost, isolation
depends entirely on correct enforcement

Bridge
Mixed — some resources siloed (e.g. per-tenant encryption keys or
databases for the most sensitive data), most pooled
Common compromise where a subset of data has stricter regulatory
requirements (Chapter 31)

Whichever model is chosen, cross-tenant data access
MUST be a testable requirement (Chapter 15): at
minimum, an integration test that asserts tenant A’s credentials cannot
read tenant B’s data. This test MUST exist before the
pooled or bridge model may be used in production — an untested isolation
boundary is not a boundary.

32.3 Multi-tenant
architecture requirements

Tenant identity MUST be part of the architecture’s
C4 Component view (Chapter 9) as an explicit cross-cutting concern, not
an implicit column that happens to exist.

A tenant-scoping bug (a query or endpoint missing a tenant filter)
MUST be treated as a Security Review finding (Chapter
16), not merely a functional bug — it is a data-isolation failure
(Chapter 31’s data protection principles apply directly).

32.4
Service Level Objectives, Indicators, and error budgets

A production service MUST state, as non-functional
requirements (Chapter 7): its Service Level Indicators (SLIs —
e.g. request success rate, latency percentiles) and Service Level
Objectives (SLOs — the target value for each SLI over a stated
window).

The gap between an SLO and 100% is the error
budget. A project SHOULD track it and treat a
nearly-exhausted error budget as a signal to prioritize reliability work
over new features for that period — recorded via the Project Health
Dashboard’s Quality Health or a dedicated Reliability line item (Chapter
29).

SLOs MUST be revisited at the same cadence as
Repository Health Checks (Chapter 21, §21.3).

32.5 Incident management

A production service MUST define incident severity
levels (e.g. Sev1: full outage, Sev2: degraded, Sev3: minor) and a
response expectation per level.

Every Sev1/Sev2 incident MUST produce a blameless
postmortem: what happened, impact, root cause, and follow-up actions —
tracked as Work Orders (Chapter 19) like any other planned work, not
left as an informal conversation.

A postmortem’s follow-up actions MUST be reflected
in the Project Health Dashboard’s Technical Debt category (Chapter 29)
until closed.

32.6 Low-downtime deployment

A production multi-tenant service SHOULD support
rolling/zero-downtime deployment; where it does not yet, that gap
MUST be recorded as tracked technical debt (Chapter
29), not silently accepted as normal.

A deployment that would violate a stated SLO (§32.4) MUST
NOT proceed without an explicit, recorded exception (Chapter 3,
§3.3) — e.g. a pre-announced maintenance window.

32.7 Gate

The Quality Review and Security Review (Chapter 16)
MUST verify, for any multi-tenant production service:
an isolation model is recorded (§32.2) with a passing cross-tenant
isolation test, SLOs are stated and current (§32.4), and any open
Sev1/Sev2 postmortem follow-ups are tracked, not abandoned.

33 — Enterprise
Identity & Integration

Purpose: Cover the authentication and provisioning
shape enterprise B2B customers actually require — their own identity
provider, automated user lifecycle management — which Chapter 11’s OAuth
2.1/OIDC flow table does not address on its own. Scope:
Enterprise SSO flow selection, provisioning/deprovisioning, and
partner/B2B API contract governance. Extends Chapter 11 rather than
replacing it — Chapter 11 remains authoritative for the flows it already
covers. Responsibilities: Security Reviewer, Software
Architect — Chapter 26.
Process: Enterprise SSO/provisioning requirements
captured during Requirements Engineering (Chapter 7) once a project has
(or plans) B2B customers who require their own IdP.
Outputs: A recorded enterprise auth flow, an automated
deprovisioning path, and versioned partner API contracts.
Quality criteria: Security, Compatibility — see Appendix C.
Review criteria: Security Review (Chapter 16, §16.2).
Related standards: SAML 2.0, SCIM 2.0. Related
chapters: 10, 11, 31.

33.1 Selection

Chapter 11 selects OAuth 2.1/OIDC flows for clients CSDS’s own
project controls (its own frontend, its own machine clients). Neither
flow fits the common enterprise case: a customer wants their employees
to sign in using their own identity provider (Okta, Azure AD,
etc.), which the CSDS-governed project does not control. SAML 2.0 is
selected as the still-widely-required protocol for this case (many
enterprise IdPs support it even where OIDC is also available); SCIM 2.0
is selected for automated user provisioning/deprovisioning between the
customer’s IdP and the project.

33.2 Extending
Chapter 11’s flow-selection table

Client type (addition to Chapter 11, §11.2)
Default flow

Enterprise customer authenticating via their own IdP
SAML 2.0, or OIDC if the customer’s IdP offers it — customer’s IdP
choice governs, project MUST support at least one

A project offering enterprise SSO MUST support at
least one of SAML 2.0 or OIDC for third-party IdPs; supporting both
MAY be justified by customer demand but is not required
by default (Chapter 1, Principle 3: simplicity over complexity).

33.3 Provisioning and
deprovisioning

User provisioning MUST follow one of: Just-in-Time
(JIT, a user is created on first successful SSO login) or SCIM-based
(the customer’s IdP pushes user creation/updates). The choice is
recorded as an ADR (Chapter 9).

Deprovisioning MUST be automated where SCIM is
used, and MUST complete within a stated maximum time (a
non-functional requirement, Chapter 7) after the customer’s IdP reports
a user as removed/disabled. A manual-only deprovisioning path (an admin
must remember to disable a user) MUST be treated as a
Security Review finding for any project handling data in scope of
Chapter 31 — access revocation delay is a data protection control, not a
convenience feature.

33.4 Attribute/role mapping

Attributes and group memberships received from a customer’s IdP
MUST be mapped to the project’s own internal
authorization model explicitly — an unmapped or default-trusted external
attribute MUST NOT grant elevated access.

This mapping is distinct from Chapter 26’s Engineering Persona Model
(which governs who builds and reviews the software) — §33.4 governs the
software’s own end users, a different concern entirely that
project teams should not conflate.

33.5 Partner/B2B API contracts

Where a project exposes an API to external partners (as opposed to
its own frontend), Chapter 10’s OpenAPI contract-first rule applies with
a stricter change policy:

A breaking change to a partner-facing operation
MUST carry a stated deprecation notice period before
removal (length depends on the partner agreement; CSDS does not fix a
number, but the SRS MUST state one).

Partner API versions SHOULD be supported in
parallel during the notice period (Chapter 34 covers the general
multi-version support policy this falls under).

33.6 Gate

The Security Review MUST verify: the selected
enterprise auth flow matches what’s documented (§33.2), deprovisioning
meets its stated time bound (§33.3), external attributes are explicitly
mapped rather than default-trusted (§33.4), and any partner-facing
breaking change carries its required notice period (§33.5).

34 — Product
Longevity & Internationalization

Purpose: Give a product that will run for years,
serve customers in multiple locales, and evolve without breaking
existing customers a concrete deprecation and internationalization
policy — rather than discovering the need for one under pressure from an
angry enterprise customer or a botched date format.
Scope: Deprecation policy and multi-version support
(extending Chapter 14/23’s SemVer discipline to a multi-year horizon)
and internationalization/localization readiness. Bundled in one chapter
because both concerns are about sustaining a mature product across many
simultaneous customers/markets, not because they are technically
related. Responsibilities: Release Manager
(deprecation), Product Owner (localization roadmap), Lead Developer
(i18n implementation) — Chapter 26.
Process: Deprecation policy stated at Repository
Bootstrap for any product expected to run more than one release cycle in
parallel across customers; i18n readiness checked at Architecture Review
(Chapter 9) before user-facing string handling is implemented.
Outputs: A stated deprecation/support-window policy;
externalized, locale-aware user-facing content. Quality
criteria: Compatibility, Usability, Maintainability — see Appendix C.
Review criteria: Quality Review, Architecture Review
(Chapter 16, §16.2). Related standards: Semantic
Versioning (extended), Unicode CLDR (locale data reference).
Related chapters: 14, 23, 33.

34.1 Selection

Chapter 14/23 already fix SemVer for a single release line. They do
not say how long an old MAJOR version stays supported once customers
depend on it, nor what internationalization readiness means for a
codebase. Neither is covered by an existing CSDS chapter or, for i18n,
by any single mandatory standard — Unicode CLDR is selected as the
reference data source for locale-specific formatting (dates,
numbers, currency), not as a process standard.

34.2 Deprecation policy

A product with external customers on a given version
MUST state a deprecation policy before its first MAJOR
version ships to more than one customer, covering:

Stage
Meaning

Announced
A future MAJOR version’s breaking changes are published; the current
version still fully supported

Deprecated
The old version still runs but receives no new features, only
security/critical fixes

Sunset
A published end-of-support date is reached; the old version MAY be
retired after this date

Removed
The old version is no longer operated/supported

The minimum notice period between “Announced” and “Sunset”
MUST be stated in the SRS (Chapter 7) as a
non-functional requirement — CSDS does not fix a number (it depends on
customer contracts), but “we’ll decide when it comes up” is not a
policy.

34.3 Multi-version support
matrix

A product supporting more than one version concurrently
MUST maintain a support matrix (which versions are
Announced/Deprecated/Sunset, and until when) as a living document,
updated at each release (Chapter 23) — this is the multi-version
extension of Chapter 8’s traceability: a customer on an older version
must be able to determine, from this matrix, whether their version still
receives security fixes.

34.4 Internationalization
(i18n) readiness

User-facing strings MUST be externalized (not
hardcoded in source) as soon as a project has, or plans, more than one
supported locale — retrofitting this later is a Derived Requirement
(Chapter 7, §7.5) that should be avoided by deciding locale scope during
Requirements Engineering, not after the fact.

Dates, numbers, and currency MUST be formatted
using locale-aware libraries referencing Unicode CLDR data, never
hand-rolled locale-specific formatting logic.

A project SHOULD consider right-to-left (RTL)
script support during initial UI architecture (Chapter 9) if any planned
locale requires it — retrofitting RTL support is architecturally
expensive, so the decision belongs at design time.

34.5 Localization (l10n) process

Translated content MUST be traceable to the source
string it translates (so a source-string change can flag stale
translations — the same “no orphan” principle as Chapter 8’s
traceability, applied to translation pairs instead of
requirements).

A missing translation MUST fail visibly in
non-production environments (Chapter 28’s fail-fast principle) rather
than silently falling back in a way that could reach production
unnoticed; a production fallback to a default locale
MAY be acceptable but MUST be a
deliberate, logged behavior, not a silent gap.

34.6 Gate

The Quality Review MUST verify, for a product in
scope of this chapter: a deprecation policy and current support matrix
exist (§34.2, §34.3), user-facing strings are externalized and
locale-formatted where i18n is in scope (§34.4), and translation
staleness is checkable (§34.5).
