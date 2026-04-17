# Phase 1 — Skill Mastery Playbook

## Objective

Before starting capstone implementation, every team member must demonstrate practical ability across:

1. SQL & Database Design
2. API Development (Node.js backend)
3. React.js frontend integration
4. Data Cleaning & Processing (Python)
5. Basic Data Visualization

> Principle: learn by building. Avoid passive-only study.

---

## 1) Weekly Learning Structure (4 weeks)

### Week 1 — SQL + Data Modeling Fundamentals

**Outcomes**
- Write joins, aggregations, group-by, order-by, subqueries, CTEs.
- Model hierarchical location data in PostgreSQL (3NF).

**Hands-on tasks**
- Design tables: `country`, `state`, `district`, `sub_district`, `village`.
- Add PK/FK constraints and indexes.
- Run 20+ realistic queries (filtering, hierarchy traversal, analytics).

**Exit criteria**
- Can explain why 3NF avoids duplication.
- Can optimize a slow query using index + EXPLAIN.

---

### Week 2 — Backend API (Node.js + Express)

**Outcomes**
- Build CRUD endpoints with validation and error handling.
- Implement pagination, filtering, search, and standardized response format.

**Hands-on tasks**
- Build a mini API for a small district dataset.
- Add middleware: request logger, error handler, CORS.
- Add auth prototype (API key check).

**Exit criteria**
- Can build and test `GET/POST/PUT/DELETE` endpoints independently.
- Can return consistent JSON contracts and HTTP status codes.

---

### Week 3 — React + API Integration

**Outcomes**
- Build a frontend that consumes backend APIs with loading/error states.
- Implement dependent dropdowns (State → District → Sub-district → Village).

**Hands-on tasks**
- Build a small dashboard page with table + filters.
- Connect to API and display paginated results.
- Handle debounced autocomplete and empty states.

**Exit criteria**
- Can clearly explain frontend-backend data flow.
- Can debug API contract mismatch from browser dev tools.

---

### Week 4 — Python Data Cleaning + Visualization

**Outcomes**
- Ingest Excel/CSV, clean bad rows, normalize text, deduplicate.
- Generate quality and coverage reports.

**Hands-on tasks**
- Clean sample MDDS-like data in pandas.
- Emit clean CSV for import and a rejected-rows CSV.
- Build 2 charts (e.g., village count by state, missing-value heatmap).

**Exit criteria**
- Can produce reproducible data cleaning pipeline.
- Can explain why each validation rule exists.

---

## 2) Suggested Learning Sources

Use official docs first, then tutorials:

- PostgreSQL docs + Prisma docs
- Node.js + Express docs
- React docs
- Pandas docs
- Recharts docs

Optional: curated video tutorials, but verify patterns against official docs.

---

## 3) Required Mini Projects (Individual)

Each member should complete:

1. **SQL Mini Project**: schema + queries + index tuning notes.
2. **API Mini Project**: CRUD service with docs + tests.
3. **Frontend Mini Project**: searchable dropdown UI using API.
4. **Data Mini Project**: clean CSV and produce quality report.

Store each under `/learning-labs/<name>` once implementation starts.

---

## 4) Individual Readiness Checklist

A team member is Phase-1 complete only if all are true:

- [ ] Can write intermediate SQL from scratch.
- [ ] Can build API CRUD with validation.
- [ ] Can connect React app to API and manage state.
- [ ] Can clean raw spreadsheet data and explain transformations.
- [ ] Can demo one mini project end-to-end without prompts.

