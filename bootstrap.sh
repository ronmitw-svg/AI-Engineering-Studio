#!/usr/bin/env bash

set -e

echo "==========================================="
echo " AI Engineering Studio Bootstrap"
echo " CSDS Repository Initialization"
echo "==========================================="

mkdir -p \
.github/workflows \
.github/ISSUE_TEMPLATE \
.vscode \
.csds/{governance,gates,reviews,health,standards,templates} \
docs/{discovery,stakeholders,requirements,architecture,adr,work-orders,reviews,traceability,reference,decisions,diagrams,release} \
apps \
packages \
services \
plugins \
tools \
scripts \
assets \
tests \
examples \
temp \
archive

touch \
README.md \
LICENSE \
CHANGELOG.md \
ROADMAP.md \
CONTRIBUTING.md \
CODE_OF_CONDUCT.md \
SECURITY.md \
ARCHITECTURE.md \
PROJECT_CHARTER.md

touch \
docs/discovery/DISC-0001.md \
docs/stakeholders/STK-0001.md \
docs/requirements/STR-0001.md \
docs/requirements/SRS-0001.md \
docs/architecture/ADR-0001.md \
docs/work-orders/WO-0001.md \
docs/traceability/RTM-0001.md \
docs/reviews/QG-0001.md

touch \
.github/workflows/ci.yml \
.github/workflows/documentation.yml \
.github/workflows/release.yml \
.github/workflows/quality-gates.yml

touch \
.github/PULL_REQUEST_TEMPLATE.md \
.github/CODEOWNERS

cat > .gitignore <<EOF
node_modules
dist
build
coverage
.env
.DS_Store
.idea
.vscode/settings.json
temp
EOF

cat > README.md <<EOF
# AI Engineering Studio

Status: Bootstrap

Governed by CSDS.

EOF

echo
echo "Bootstrap completed successfully."