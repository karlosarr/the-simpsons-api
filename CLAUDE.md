# CLAUDE.md — The Simpsons API

This document provides context, conventions, and development workflows for AI assistants working in this repository.

---

## Project Overview

**The Simpsons API** is a full-stack TypeScript monorepo that exposes a RESTful API for Simpsons data (characters, episodes, locations, shorts) and a companion documentation website.

| Layer | Technology |
|---|---|
| API backend | NestJS 10 + Fastify |
| Database | PostgreSQL + Prisma ORM |
| Frontend docs | Next.js 16 + React 19 + Tailwind CSS |
| Serverless variant | `api-serverless/` (cost-saving Lambda alternative) |
| Deployment | Docker → AWS ECS (ARM64) |

---

## Repository Structure

```
/
├── api/                    # NestJS REST API (primary workspace)
│   ├── src/
│   │   ├── main.ts         # Bootstrap: Fastify, CORS, Helmet, global prefix /api
│   │   ├── app.module.ts   # Root module — imports all feature modules
│   │   ├── app.controler.ts # GET / → returns all routes with full URLs
│   │   ├── config/         # Env-var validation (zod / class-validator)
│   │   ├── common/
│   │   │   ├── consts/     # ROUTES constant
│   │   │   ├── dto/        # IsPageDto (pagination query param)
│   │   │   ├── guards/     # ApiKeyGuard (Bearer token for write endpoints)
│   │   │   ├── interfaces/ # PaginationResponse<T>
│   │   │   └── pipes/      # ZodValidationPipe
│   │   └── modules/
│   │       ├── character/  # Characters CRUD
│   │       ├── episode/    # Episodes CRUD
│   │       ├── location/   # Locations CRUD
│   │       ├── short/      # Shorts — create only
│   │       ├── health/     # GET /health → { status: "ok" }
│   │       ├── database/   # DatabaseService (PrismaClient wrapper)
│   │       └── logger/     # Logging module
│   ├── tests/
│   │   ├── unit/           # Vitest unit tests (mocked services)
│   │   ├── e2e/            # Vitest integration tests (real DB)
│   │   ├── performance/    # k6 load tests
│   │   └── utils/          # Shared test helpers (mock factory)
│   ├── prisma/
│   │   ├── schema.prisma   # DB schema (Character, Episode, Location, Short)
│   │   └── migrations/
│   ├── Dockerfile          # Multi-stage: dev → build → production
│   ├── docker-compose.yml  # Local PostgreSQL
│   ├── vitest.config.unit.ts
│   ├── vitest.config.e2e.ts
│   └── create-vitest-test-config.ts
├── web/                    # Next.js documentation site
├── api-serverless/         # Serverless/Lambda alternative
├── .github/workflows/      # CI/CD pipelines
├── scripts/                # Utility scripts
├── biome.json              # Formatter + linter (replaces ESLint/Prettier)
└── package.json            # Root npm workspaces config
```

---

## Development Setup

### Prerequisites
- Node.js 22.x (see `.nvmrc`)
- npm >= 9.x
- Docker & Docker Compose

### First-time setup

```bash
# 1. Start local PostgreSQL
cd api && docker compose up -d

# 2. Install dependencies (from root)
npm install

# 3. Generate Prisma client
cd api && npx prisma generate

# 4. Run migrations
npx prisma migrate dev

# 5. Start API in dev mode (hot reload)
npm run dev -w=api
```

### Environment variables

Copy `api/.env.example` to `api/.env` and fill in:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `API_KEY` | Bearer token for write endpoints |
| `APP_URL` | Base URL used in pagination links |
| `PORT` | HTTP port (default `3000`) |
| `LOGGER_LEVEL` | NestJS logger level |
| `NODE_ENV` | `development` / `test` / `production` |

---

## Running the Project

```bash
# API dev server
npm run dev -w=api

# Build API for production
npm run build -w=api

# Web docs dev server
npm run dev -w=web
```

---

## Testing

All tests live under `api/tests/`. The project uses **Vitest** with **Istanbul** coverage.

### Run all tests
```bash
npm run test -w=api
# Runs unit + e2e in parallel, then calculates global coverage
```

### Run unit tests only
```bash
npm run test:unit -w=api
```

### Run e2e tests only (requires real DB)
```bash
npm run test:e2e -w=api
```

### Run performance tests (requires k6)
```bash
npm run test:performance -w=api
```

### Test conventions

- **Unit tests:** `tests/unit/<module>/<name>.test.ts`
- **Object Mother pattern:** `tests/unit/<module>/<name>-mother.ts` — factory that creates fake model instances via `@faker-js/faker`
- **Mock factory:** `tests/utils/mock.ts` re-exports `vitest-mock-extended` helpers as `createMock<T>()` and `Mock<T>`
- **Globals enabled:** `describe`, `it`, `expect`, `vi`, `beforeEach`, `afterEach` are available without imports
- **Service mocks:** inject plain objects with `vi.fn()` methods via `useValue` in `Test.createTestingModule()`
- **Coverage reports:** written to `coverage/unit/` and `coverage/e2e/`

---

## Code Quality

The project uses **Biome 2.x** (not ESLint/Prettier):

```bash
# Lint & format check (from root)
npx biome check .

# Auto-fix
npx biome check --write .
```

**Commit conventions** are enforced via `commitlint` (conventional commits):
```
feat: add character search endpoint
fix: correct pagination off-by-one
chore: update dependencies
```

Pre-commit hooks (Husky + lint-staged) run Biome on staged files.

---

## API Reference

### Base URL
All API endpoints are prefixed with `/api`.

### Authentication
Write endpoints (`POST`) require:
```
Authorization: Bearer <API_KEY>
```

### Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/` | — | List all routes with URLs |
| GET | `/health` | — | Health check |
| GET | `/api/characters` | — | Paginated characters (20/page) |
| GET | `/api/characters/:id` | — | Single character (includes relations) |
| POST | `/api/characters` | Bearer | Create characters |
| GET | `/api/episodes` | — | Paginated episodes |
| GET | `/api/episodes/:id` | — | Single episode |
| POST | `/api/episodes` | Bearer | Create episodes |
| GET | `/api/locations` | — | Paginated locations |
| GET | `/api/locations/:id` | — | Single location (includes relations) |
| POST | `/api/locations` | Bearer | Create locations |
| POST | `/api/shorts` | Bearer | Create shorts |

### Pagination response shape
```json
{
  "count": 100,
  "pages": 5,
  "next": "http://localhost:3000/characters?page=2",
  "prev": null,
  "results": [...]
}
```

---

## Architecture Decisions

### Fastify over Express
The API uses `@nestjs/platform-fastify` for better performance. Do not use Express-specific APIs.

### Zod for request validation
All write endpoints use a `ZodValidationPipe` applied via `@UsePipes()`. Schemas live in `dto/create-<module>.dto.ts`. Do not add `class-validator` decorators to new DTOs.

### Caching
`character.service.ts`, `episode.service.ts`, and `location.service.ts` cache the total count (and the first page for characters) for 24 hours using `@nestjs/cache-manager`. Cache keys follow the pattern `<model>-count`.

### CORS policy
Only `GET`, `HEAD`, and `OPTIONS` are allowed externally (write operations are admin-only).

### DatabaseService
`DatabaseService` extends `PrismaClient` and is injected into every service. Never import `PrismaClient` directly in a feature module — always use `DatabaseService`.

---

## CI/CD Pipelines

Located in `.github/workflows/`:

| Workflow | Trigger | Action |
|---|---|---|
| `ci-api.yml` | PR → `main` (api/** changed) | Install, build, run unit + e2e tests |
| `build-api.yml` | Push → `main` (api/** changed) | Build TypeScript, verify compilation |
| `deploy-api.yml` | Push → `main` (api/** changed) | Build & push Docker image to ECR, deploy to ECS |
| `deploy-db.yml` | Push → `main` (api/prisma/** changed) | Run `prisma migrate deploy` |

---

## Docker

```bash
# Build production image locally
cd api
docker build --build-arg PORT=3000 -t simpsons-api .

# Run with docker-compose (DB only)
docker compose up -d
```

The Dockerfile uses a multi-stage build:
1. **dev** — development dependencies + source
2. **build** — compile TypeScript with SWC + prune devDependencies
3. **production** — minimal Alpine image, runs as `node` user via `dumb-init`

---

## Common Tasks

### Add a new module
1. Create `src/modules/<name>/` with `<name>.module.ts`, `<name>.controller.ts`, `<name>.service.ts`
2. Add a Zod schema in `dto/create-<name>.dto.ts`
3. Import the new module in `app.module.ts`
4. Add controller tests in `tests/unit/<name>/<name>.controller.test.ts`
5. Add service tests in `tests/unit/<name>/<name>.service.test.ts`
6. Add an Object Mother in `tests/unit/<name>/<name>-mother.ts`

### Add a Prisma migration
```bash
cd api
npx prisma migrate dev --name <migration-name>
npx prisma generate
```

### Reset the database
```bash
cd api
npx prisma migrate reset
```

### Populate data
Use the Bruno collection at `api/api-request-collection/` or the curl examples in the README. Order matters: Episodes → Characters → Locations → Shorts.

---

## Key File Locations

| What | Path |
|---|---|
| App entry point | `api/src/main.ts` |
| Root module | `api/src/app.module.ts` |
| Prisma schema | `api/prisma/schema.prisma` |
| API key guard | `api/src/common/guards/api-key.guard.ts` |
| Zod pipe | `api/src/common/pipes/zod-validation.pipe.ts` |
| Pagination interface | `api/src/common/interfaces/pagination-response.interface.ts` |
| Vitest unit config | `api/vitest.config.unit.ts` |
| Vitest e2e config | `api/vitest.config.e2e.ts` |
| Mock utility | `api/tests/utils/mock.ts` |
| Biome config | `biome.json` |
