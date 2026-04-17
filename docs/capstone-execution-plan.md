# Capstone Execution Plan — All India Villages API

## 1. Product Goal

Build a production-grade SaaS platform that serves normalized Indian geographical hierarchy data via secure, scalable REST APIs.

### Core value
- B2B clients integrate quickly via API.
- End users get standardized address formatting.
- Platform supports subscription monetization and usage governance.

---

## 2. Architecture Decisions (Implementation Baseline)

- **Backend:** Node.js + Express (API routes)
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Cache / Rate limit backing:** Redis (Upstash)
- **Frontend:** React + Vite + TypeScript
- **Charts:** Recharts
- **Hosting:** Vercel (edge + serverless)

---

## 3. Delivery Milestones

## Milestone A — Foundation (Week 1)

**Deliverables**
- Monorepo folder structure (`api`, `frontend`, `prisma`, `scripts`).
- Prisma schema for hierarchical geography + user/auth tables.
- Environment config template.

**Definition of done**
- Migrations run locally.
- Seed script inserts one state hierarchy sample.
- Health endpoint returns status + version.

---

## Milestone B — Data Pipeline (Week 2)

**Deliverables**
- Python ETL script for MDDS Excel/CSV ingestion.
- Validation + dedupe + reject logging.
- Batch upsert logic for all hierarchy levels.

**Definition of done**
- Import 50k+ rows successfully in staging.
- Reject report generated with reasons.
- Integrity checks report no orphaned rows.

---

## Milestone C — Public API v1 (Week 3)

**Deliverables**
- Endpoints: `/search`, `/states`, `/states/:id/districts`, `/districts/:id/subdistricts`, `/subdistricts/:id/villages`, `/autocomplete`.
- Standard response envelope + request ID.
- API key middleware and rate limiting.

**Definition of done**
- OpenAPI spec published.
- p95 < 100ms for cached reads on staging dataset.
- 95%+ route test coverage for happy path + validation.

---

## Milestone D — Dashboards (Week 4)

**Deliverables**
- Admin panel: user mgmt, plan control, logs overview, charts.
- B2B portal: registration, key management, usage dashboards.
- API docs with “try it” section.

**Definition of done**
- Role-based route protection verified.
- Dashboard metrics reconcile with DB aggregates.
- Lighthouse + basic accessibility checks passed.

---

## Milestone E — Hardening + Launch Prep (Week 5)

**Deliverables**
- Security headers, JWT hardening, secret rotation workflows.
- Alerting for usage thresholds and anomalies.
- Backups, migration runbook, rollback plan.

**Definition of done**
- Load test simulating peak usage profile.
- Incident runbook documented and rehearsed.
- Production readiness sign-off checklist complete.

---

## 4. Team Operating Model

### Recommended squads
- **Data Squad:** ETL, validation, data QA.
- **API Squad:** schema, endpoints, auth, performance.
- **Frontend Squad:** admin and B2B portals.
- **Platform Squad:** CI/CD, observability, security.

### Rituals
- Daily standup (15 min)
- Weekly architecture review
- Weekly demo + retrospective

### Engineering quality gates
- PR template + mandatory review
- Branch strategy (`main`, `develop`, feature branches)
- CI checks: lint, tests, migration validation

---

## 5. Non-Functional Requirements Tracking

Track these as explicit acceptance criteria:

- **Performance:** p95 API latency < 100ms for primary read endpoints.
- **Scalability:** architecture path to 1M+ requests/day.
- **Reliability:** graceful error handling + retry-safe reads.
- **Security:** API key + secret, JWT, rate limiting, secure headers.
- **Observability:** structured logs, latency metrics, usage analytics.

---

## 6. Immediate Action List (This Week)

1. Finalize Prisma schema draft and review as a team.
2. Build first import script against a small sample dataset.
3. Implement `/states` + `/search` endpoints with tests.
4. Create React skeleton for dashboard and API integration layer.
5. Set up CI pipeline and lint/test enforcement.

This turns planning into delivery and de-risks core unknowns early.
