# Village API (All India Villages SaaS)

Production-grade REST API foundation for standardized Indian village-level address data.

## Implemented in this repository

- Express API service with health endpoint and versioned API routes (`/v1/*`)
- Prisma schema with normalized location hierarchy (`Country → State → District → SubDistrict → Village`)
- Seed script with sample Maharashtra/Nandurbar hierarchy
- API key middleware for secured endpoint access
- Search + autocomplete endpoints returning dropdown-ready address structures
- Basic test coverage for health and auth guard

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client and create local DB:
   ```bash
   npm run db:generate
   npm run db:push
   ```
4. Seed sample data:
   ```bash
   npm run db:seed
   ```
5. Run API:
   ```bash
   npm run dev
   ```

## Authentication for `/v1` routes

Set request header:

- `X-API-Key: demo_public_key_for_presentations`

## Available endpoints

- `GET /health`
- `GET /v1/states`
- `GET /v1/states/:id/districts`
- `GET /v1/districts/:id/subdistricts`
- `GET /v1/subdistricts/:id/villages?page=1&limit=50`
- `GET /v1/search?q=mani&state=Maharashtra`
- `GET /v1/autocomplete?q=mani`

## Example

```bash
curl -H "X-API-Key: demo_public_key_for_presentations" \
  "http://localhost:3000/v1/autocomplete?q=mani"
```

## Planning documents

- [`docs/phase-1-skill-mastery.md`](docs/phase-1-skill-mastery.md)
- [`docs/capstone-execution-plan.md`](docs/capstone-execution-plan.md)
