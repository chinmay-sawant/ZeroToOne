import type { LanguageId } from '@/lib/content'

export type ChecklistItem = {
  id: string
  label: string
  /**
   * Lesson header / lead content shown in the detail panel.
   * Body content can be expanded later.
   */
  header: string
  /** Optional longer body (placeholder for now). */
  body?: string
  /** Optional small code snippet shown in a monospace block in the detail panel. */
  code?: string
  /** Optional language hint for the code snippet (e.g. "python"). */
  codeLang?: string
  /** Optional full markdown prompt rendered by react-markdown in the detail panel. */
  markdown?: string
  /**
   * When set (1–5), this item is one step of the Netflix request-flow diagram.
   * The detail panel highlights this step in the visual flow.
   */
  flowStep?: 1 | 2 | 3 | 4 | 5
}

export type ChecklistSection = {
  id: string
  title: string
  items: ChecklistItem[]
  /** When true, this section renders the Netflix request-flow diagram at the top. */
  flowDiagram?: boolean
}

function item(
  id: string,
  label: string,
  header: string,
  body?: string,
  opts?: {
    code?: string
    codeLang?: string
    markdown?: string
    flowStep?: 1 | 2 | 3 | 4 | 5
  },
): ChecklistItem {
  return {
    id,
    label,
    header,
    body:
      body ??
      'Detailed steps, examples, and exercises will go here. For now this is a placeholder tied to this skill.',
    code: opts?.code,
    codeLang: opts?.codeLang,
    markdown: opts?.markdown,
    flowStep: opts?.flowStep,
  }
}

/** Shared level structure aligned with language roadmap prompts. */
const sharedSections = (
  prefix: string,
  stackNotes: {
    beginner: string
    intermediate: string
    advanced: string
    expert: string
  },
): ChecklistSection[] => [
  {
    id: `${prefix}-beginner`,
    title: 'Beginner — CLI foundations',
    items: [
      item(
        `${prefix}-b-setup`,
        'Toolchain installed (runtime, editor, version manager)',
        'Install and verify your language toolchain, editor (with language server), and a simple version manager so every project starts the same way.',
      ),
      item(
        `${prefix}-b-oop`,
        'Core language + OOP/composition fundamentals solid',
        'Get comfortable with types, functions, packages/modules, and composition over inheritance before jumping to frameworks.',
      ),
      item(
        `${prefix}-b-cli`,
        'Employee CLI: add / list / search / update / delete',
        'Build an interactive Employee CLI that supports full CRUD. This is the product spine for every later level.',
      ),
      item(
        `${prefix}-b-memory`,
        'In-memory store with unique email validation',
        'Persist employees in memory only, enforce unique email, and fail clearly when validation breaks.',
      ),
      item(
        `${prefix}-b-layers`,
        'Domain / store / UI separation in the project layout',
        'Split domain models, storage, and CLI presentation so you can swap the UI or store without rewriting business rules.',
      ),
      item(
        `${prefix}-b-tests`,
        'Unit tests for domain rules (table-driven where idiomatic)',
        'Cover uniqueness, invalid input, and edge cases with focused unit tests on pure domain logic.',
      ),
      item(
        `${prefix}-b-stack`,
        stackNotes.beginner,
        `Stack focus for Beginner: ${stackNotes.beginner}`,
      ),
    ],
  },
  {
    id: `${prefix}-intermediate`,
    title: 'Intermediate — HTTP + persistence',
    items: [
      item(
        `${prefix}-i-rest`,
        'REST API for employees and departments',
        'Expose employees and departments over HTTP with clear routes, status codes, and JSON payloads.',
      ),
      item(
        `${prefix}-i-db`,
        'Relational DB persistence + migrations',
        'Move from in-memory to a relational database with versioned migrations you can apply and roll forward.',
      ),
      item(
        `${prefix}-i-dto`,
        'Request/response models separate from persistence models',
        'Keep API schemas/DTOs separate from DB entities so the public contract can evolve independently.',
      ),
      item(
        `${prefix}-i-validation`,
        'Input validation and consistent error payloads',
        'Validate every write path and return a consistent error shape clients can rely on.',
      ),
      item(
        `${prefix}-i-seed`,
        'Seed data + curl/Postman collection documented',
        'Ship seed data and a documented request collection so anyone can demo the API quickly.',
      ),
      item(
        `${prefix}-i-filter`,
        'Filter/search by department or status',
        'Add list filters (department, status, search) without breaking pagination or response shape.',
      ),
      item(
        `${prefix}-i-stack`,
        stackNotes.intermediate,
        `Stack focus for Intermediate: ${stackNotes.intermediate}`,
      ),
    ],
  },
  {
    id: `${prefix}-advanced`,
    title: 'Advanced — professional service quality',
    items: [
      item(
        `${prefix}-a-auth`,
        'Authentication (JWT/session) wired on protected routes',
        'Protect sensitive routes with real authentication and a clear login/token (or session) flow.',
      ),
      item(
        `${prefix}-a-rbac`,
        'Roles: ADMIN / HR / EMPLOYEE with salary/delete rules',
        'Enforce role-based access so salary visibility and delete powers match ADMIN / HR / EMPLOYEE rules.',
      ),
      item(
        `${prefix}-a-audit`,
        'Soft delete + audit timestamps (created/updated)',
        'Never hard-delete casually: soft-delete records and stamp created/updated audit fields.',
      ),
      item(
        `${prefix}-a-tests`,
        'Unit + integration tests (DB via containers or CI DB)',
        'Grow a test pyramid: fast unit tests plus integration tests against a real database in CI.',
      ),
      item(
        `${prefix}-a-paging`,
        'Pagination + headcount/report endpoint',
        'Paginate list endpoints and add a simple reporting route (e.g. headcount by department).',
      ),
      item(
        `${prefix}-a-config`,
        'Config profiles; secrets never committed',
        'Use env/config profiles for local and prod. Secrets stay out of git.',
      ),
      item(
        `${prefix}-a-stack`,
        stackNotes.advanced,
        `Stack focus for Advanced: ${stackNotes.advanced}`,
      ),
    ],
  },
  {
    id: `${prefix}-expert`,
    title: 'Expert — production platform',
    items: [
      item(
        `${prefix}-e-cache`,
        'Caching for hot reads (employee by id / dept lists)',
        'Cache hot reads with clear TTLs and an invalidation story when data changes.',
      ),
      item(
        `${prefix}-e-async`,
        'Async path (hire event → notification worker)',
        'Publish domain events (e.g. employee hired) and handle them asynchronously in a worker.',
      ),
      item(
        `${prefix}-e-obs`,
        'Observability: health, metrics, structured logs',
        'Expose health checks, metrics, and structured logs so production issues are diagnosable.',
      ),
      item(
        `${prefix}-e-resilience`,
        'Timeouts, retries, graceful shutdown where applicable',
        'Add timeouts, careful retries, and graceful shutdown so deploys and partial failures do not corrupt work.',
      ),
      item(
        `${prefix}-e-compose`,
        'docker-compose (API + DB + cache/worker) runs end-to-end',
        'One compose (or equivalent) stack boots API, DB, cache, and worker for a full local demo.',
      ),
      item(
        `${prefix}-e-ci`,
        'CI pipeline outline + short ADRs in the repo',
        'Document CI stages and write short architecture decision records for the big choices.',
      ),
      item(
        `${prefix}-e-stack`,
        stackNotes.expert,
        `Stack focus for Expert: ${stackNotes.expert}`,
      ),
    ],
  },
]

/** System Design track — design Employee Management at increasing scale. */
const systemDesignSections = (): ChecklistSection[] => [
  {
    id: 'system-design-beginner',
    title: 'Beginner — design fundamentals',
    items: [
      item(
        'system-design-b-vocab',
        'Core metrics: latency, throughput, availability, consistency',
        'Define SLIs you can measure for an Employee API (p50/p99 latency, RPS, uptime, data freshness).',
      ),
      item(
        'system-design-b-capacity',
        'Back-of-envelope capacity (users, QPS, storage)',
        'Estimate daily active users, reads vs writes, payload sizes, and rough storage growth for HR data.',
      ),
      item(
        'system-design-b-api',
        'API design for employee CRUD + list filters',
        'Sketch REST (or RPC) contracts: resources, status codes, pagination, idempotency for create/update.',
      ),
      item(
        'system-design-b-data',
        'Single-service data model (employees, depts, indexes)',
        'Design tables/collections and indexes for unique email, department filters, and manager lookups.',
      ),
      item(
        'system-design-b-diagram',
        'Single-box architecture diagram + request path',
        'Draw client → load balancer → app → DB; annotate the happy path for “get employee by id”.',
      ),
      item(
        'system-design-b-tradeoffs',
        'Tradeoffs: SQL vs document, sync vs async (when not)',
        'Write short tradeoff notes: when a relational model wins for HR, and when async is unnecessary noise.',
      ),
      item(
        'system-design-b-interview',
        'Practice: design a basic Employee service (30 min)',
        'Run a timed whiteboard: requirements → API → data → scaling risks → open questions.',
      ),
    ],
  },
  {
    id: 'system-design-intermediate',
    title: 'Intermediate — scale a modular service',
    items: [
      item(
        'system-design-i-requirements',
        'Functional + non-functional requirements for HR platform',
        'Capture must-haves (CRUD, roles, audit) and NFRs (RTO/RPO, compliance, peak hire season traffic).',
      ),
      item(
        'system-design-i-cache',
        'Caching strategy for hot employee/dept reads',
        'Choose what to cache, TTLs, and invalidation on update/delete without serving stale salary data.',
      ),
      item(
        'system-design-i-search',
        'Search/filter design (DB indexes vs search index)',
        'Decide when Postgres indexes suffice vs when a search service is justified for free-text employee search.',
      ),
      item(
        'system-design-i-auth',
        'AuthN/AuthZ in the design (JWT, sessions, RBAC)',
        'Place authentication and role checks (ADMIN/HR/EMPLOYEE) in the request path; note trust boundaries.',
      ),
      item(
        'system-design-i-async',
        'Hire event → notification path (queue sketch)',
        'Design an async hire notification pipeline: producer, queue, worker, retries, dead-letter.',
      ),
      item(
        'system-design-i-bottlenecks',
        'Identify bottlenecks + horizontal scaling plan',
        'Call out DB write hotspots, cache stampedes, and how you’d scale app vs database first.',
      ),
      item(
        'system-design-i-interview',
        'Practice: scale Employee API to 10× traffic',
        'Extend the beginner design: load balancing, caching, read replicas, and failure modes.',
      ),
    ],
  },
  {
    id: 'system-design-advanced',
    title: 'Advanced — distributed concerns',
    items: [
      item(
        'system-design-a-consistency',
        'Consistency model for employee profile updates',
        'Pick strong vs eventual consistency for profile vs derived headcount reports; justify the choice.',
      ),
      item(
        'system-design-a-partition',
        'Sharding / multi-tenant isolation options',
        'Compare tenant-per-schema vs shared tables with org_id; sketch shard key if multi-region orgs grow.',
      ),
      item(
        'system-design-a-idempotency',
        'Idempotency, retries, and exactly-once myths',
        'Design safe retries for create-employee and hire-email with idempotency keys and at-least-once workers.',
      ),
      item(
        'system-design-a-obs',
        'Observability design: logs, metrics, traces, SLOs',
        'Define red/gold metrics, trace spans for a request, and SLOs for list and get-by-id endpoints.',
      ),
      item(
        'system-design-a-resilience',
        'Timeouts, bulkheads, circuit breakers, graceful degradation',
        'Specify timeouts to DB/cache/queue and a degraded mode (e.g. cache miss falls back; search optional).',
      ),
      item(
        'system-design-a-data-lifecycle',
        'Soft delete, audit log, GDPR-style erase path',
        'Design retention, audit immutability vs erase requests, and how soft-delete interacts with search indexes.',
      ),
      item(
        'system-design-a-interview',
        'Practice: multi-service Employee platform design',
        'Split identity, employee core, and notifications; draw sync and async edges with failure stories.',
      ),
    ],
  },
  {
    id: 'system-design-expert',
    title: 'Expert — production-scale platforms',
    items: [
      item(
        'system-design-e-multiregion',
        'Multi-region / active-passive sketch for HR data',
        'Outline region placement, failover, and why HR writes often stay single-primary first.',
      ),
      item(
        'system-design-e-rate',
        'Rate limiting, abuse protection, and API gateways',
        'Place rate limits (user, IP, tenant) and auth at the edge without breaking legitimate bulk HR imports.',
      ),
      item(
        'system-design-e-cost',
        'Cost-aware design (storage tiers, cache hit ratio)',
        'Estimate monthly cost drivers: DB size, egress, queue volume; pick two levers to cut spend safely.',
      ),
      item(
        'system-design-e-migration',
        'Zero/near-zero downtime migration strategy',
        'Plan a schema or service split with dual-write/read or expand-contract migrations.',
      ),
      item(
        'system-design-e-dr',
        'Backup, restore drills, and chaos scenarios',
        'Define RPO/RTO, backup cadence, and two chaos tests (kill cache, kill notification worker).',
      ),
      item(
        'system-design-e-adr',
        'Write 3 ADRs for the final architecture',
        'Document decisions: primary DB, async bus, and multi-tenant model with rejected alternatives.',
      ),
      item(
        'system-design-e-interview',
        'Full mock: design global Employee platform (45–60 min)',
        'End-to-end interview run: clarify → design → deep dive → tradeoffs → wrap-up with open risks.',
      ),
    ],
  },
]

/** Architectures track — structure styles applied to the same Employee product. */
const architectureSections = (): ChecklistSection[] => [
  {
    id: 'architectures-beginner',
    title: 'Beginner — structure a modular app',
    items: [
      item(
        'architectures-b-layers',
        'Layered architecture: UI / domain / infrastructure',
        'Separate presentation, business rules, and persistence so the Employee domain is not UI-coupled.',
      ),
      item(
        'architectures-b-packages',
        'Package-by-feature vs package-by-layer (pick & justify)',
        'Organize modules for employee and department; document why you chose feature or layer packages.',
      ),
      item(
        'architectures-b-boundaries',
        'Module boundaries and public APIs inside the repo',
        'Define which packages may import which; hide store internals behind a small interface.',
      ),
      item(
        'architectures-b-di',
        'Dependency direction and simple DI / wiring',
        'Wire CLI or HTTP entrypoints to domain services without letting infrastructure leak upward.',
      ),
      item(
        'architectures-b-errors',
        'Domain errors vs transport errors',
        'Map domain failures (duplicate email) to HTTP/CLI outcomes without polluting domain with status codes.',
      ),
      item(
        'architectures-b-testing',
        'Test pyramid aligned to architecture seams',
        'Unit-test domain pure logic; integration-test adapters; keep e2e thin.',
      ),
      item(
        'architectures-b-capstone',
        'Document a modular monolith layout for Employee CLI/API',
        'Produce a short architecture sketch + folder tree that a new hire could follow.',
      ),
    ],
  },
  {
    id: 'architectures-intermediate',
    title: 'Intermediate — ports, adapters, and clean edges',
    items: [
      item(
        'architectures-i-hex',
        'Hexagonal / ports & adapters for employee use cases',
        'Define ports for EmployeeRepository and Notifier; implement adapters for DB and email/stub.',
      ),
      item(
        'architectures-i-use-cases',
        'Application services / use-case layer (hire, transfer)',
        'Implement hire and department-transfer as explicit use cases, not fat controllers.',
      ),
      item(
        'architectures-i-dto',
        'Anti-corruption: API DTOs ≠ domain ≠ persistence models',
        'Keep mappers at the edges so schema changes do not rewrite domain rules.',
      ),
      item(
        'architectures-i-config',
        'Configuration as a boundary (profiles, feature flags)',
        'Isolate env/config loading; keep domain free of process.env and framework config types.',
      ),
      item(
        'architectures-i-cqrs-lite',
        'CQRS-lite: separate read models for lists/reports',
        'Optional read path for headcount reports without over-splitting write models early.',
      ),
      item(
        'architectures-i-adr',
        'ADR: modular monolith first (when not to split)',
        'Write an ADR arguing modular monolith for Employee until a clear split driver appears.',
      ),
      item(
        'architectures-i-capstone',
        'Refactor checklist app spine to ports & adapters',
        'Show before/after structure: controllers thin, domain pure, adapters swappable.',
      ),
    ],
  },
  {
    id: 'architectures-advanced',
    title: 'Advanced — multi-module and service styles',
    items: [
      item(
        'architectures-a-ddd',
        'Bounded contexts: Identity, Employee Core, Notifications',
        'Map contexts and shared kernels carefully; avoid a shared “god” employee entity everywhere.',
      ),
      item(
        'architectures-a-events',
        'Domain events vs integration events',
        'Emit EmployeeHired inside the core; publish integration events for email/HR systems.',
      ),
      item(
        'architectures-a-saga',
        'Saga / process manager for multi-step hire flows',
        'Design compensating steps when provision-account + notify-email partially fails.',
      ),
      item(
        'architectures-a-sync-async',
        'Sync API + async workers: deployment topology',
        'Choose shared binary vs separate worker; document scaling and failure isolation.',
      ),
      item(
        'architectures-a-api-style',
        'REST vs RPC vs events at service boundaries',
        'Pick contracts between Identity and Employee Core; note versioning and backward compatibility.',
      ),
      item(
        'architectures-a-observability',
        'Architecture for observability (correlation IDs)',
        'Propagate request/trace ids across HTTP and queue consumers; define service dashboards.',
      ),
      item(
        'architectures-a-capstone',
        'Design a 2–3 service split with clear ownership',
        'Draw components, data ownership, and “what must never call what”.',
      ),
    ],
  },
  {
    id: 'architectures-expert',
    title: 'Expert — platform architecture & evolution',
    items: [
      item(
        'architectures-e-evolution',
        'Evolutionary architecture: fitness functions',
        'Define automated checks (dependency rules, latency budgets) that guard architectural goals.',
      ),
      item(
        'architectures-e-multi-tenant',
        'Multi-tenant architecture patterns for HR SaaS',
        'Compare silo vs pool tenancy; isolation for data, noisy neighbors, and per-tenant config.',
      ),
      item(
        'architectures-e-platform',
        'Internal platform: shared auth, logging, deploy pipeline',
        'Extract cross-cutting platform concerns without creating a distributed monolith of libraries.',
      ),
      item(
        'architectures-e-data-mesh-lite',
        'Data ownership vs reporting warehouse path',
        'Keep OLTP employee writes clean; sketch analytics export without coupling services to BI.',
      ),
      item(
        'architectures-e-resilience',
        'Bulkheads, cell architecture, blast-radius limits',
        'Limit failure domains (per tenant cell or per region) for a large HR deployment.',
      ),
      item(
        'architectures-e-governance',
        'Architecture review checklist + ADRs at scale',
        'Define when a change needs an ADR, who reviews, and how exceptions are recorded.',
      ),
      item(
        'architectures-e-capstone',
        'Full architecture pack: C4 + ADRs + evolution plan',
        'Ship C4 context/container diagrams, 3+ ADRs, and a 12-month evolution path for Employee platform.',
      ),
    ],
  },
]

/**
 * Python Backend Curriculum — from scripting basics to a Netflix-style FastAPI.
 * Replaces the shared Employee-app spine with a Netflix-style product spine.
 */

/** Copy-ready markdown prompt bundling the Netflix data models, project setup,
 *  FastAPI best practices, and an "explain the changes" footer. */
const pythonPrompt = `# Netflix-style API in FastAPI — build it end-to-end

You are building a small Netflix-style streaming backend with **FastAPI**, **SQLAlchemy 2**,
**Pydantic v2**, **Alembic**, and **PostgreSQL**. Follow the architecture below and keep
each layer cleanly separated.

---

## 1. Data models (Netflix domain)

Model these entities with SQLAlchemy (persistence) **and** mirror them with Pydantic
(persistence) **and** mirror them with Pydantic (API schemas). Keep the two layers separate
so the API contract can evolve without coupling to the DB.

- **User**
  - \`id: int\` (PK, autoincrement)
  - \`email: str\` (unique, indexed)
  - \`name: str\`
  - \`created_at: datetime\`
- **Movie**
  - \`id: int\` (PK)
  - \`title: str\` (indexed)
  - \`description: str\`
  - \`release_year: int\`
  - \`genre: str\`
  - \`created_at: datetime\`
- **Show**
  - \`id: int\` (PK)
  - \`title: str\`
  - \`description: str\`
  - \`seasons: int\`
  - \`created_at: datetime\`
- **WatchHistory**
  - \`id: int\` (PK)
  - \`user_id: int\` (FK → users.id)
  - \`movie_id: int | null\` (FK → movies.id, nullable)
  - \`show_id: int | null\` (FK → shows.id, nullable)
  - \`watched_at: datetime\`
  - \`progress_pct: float\` (0–100)

Relationships: a User has many WatchHistory entries; each WatchHistory entry references
either a Movie **or** a Show (enforce one-and-only-one via a CHECK or application validation).

---

## 2. Project setup

1. Create a Poetry/uv project: \`fastapi-netflix\`.
2. Install deps:
   \`fastapi\`, \`uvicorn[standard]\`, \`sqlalchemy>=2\`, \`alembic\`, \`pydantic\`, \`pydantic-settings\`, \`faker\`, \`psycopg[binary]\`, \`pytest\`, \`httpx\`.
3. Suggested layout (package-by-feature inside a clean layered root):

\`\`\`
fastapi-netflix/
├── app/
│   ├── main.py              # FastAPI app factory + router wiring
│   ├── core/
│   │   ├── config.py        # pydantic-settings (env-driven config)
│   │   └── db.py            # engine, sessionmaker, get_db dependency
│   ├── models/              # SQLAlchemy ORM models
│   │   ├── user.py
│   │   ├── movie.py
│   │   ├── show.py
│   │   └── watch_history.py
│   ├── schemas/             # Pydantic request/response schemas
│   │   ├── user.py
│   │   ├── movie.py
│   │   └── watch_history.py
│   ├── repositories/        # SQL data layer (implements interfaces)
│   │   └── movie_repo.py
│   ├── services/            # Domain/business logic
│   │   └── media_service.py
│   ├── api/
│   │   ├── deps.py          # shared dependencies (get_db, get_current_user)
│   │   └── routes/
│   │       ├── movies.py
│   │       └── watch_history.py
│   └── interfaces/         # abc interfaces (RepositoryInterface, etc.)
├── alembic/                # migrations versions/
├── tests/
├── .env
└── pyproject.toml
\`\`\`

4. Configure \`.env\` with \`DATABASE_URL\`, \`APP_ENV\`, \`SECRET_KEY\`; never commit secrets.
5. Initialize Alembic: \`alembic init alembic\`, point \`sqlalchemy.url\` at the \`\${DATABASE_URL}\` env value.
6. Bootstrap \`app/main.py\` with an app factory that registers routers and adds CORS.

---

## 3. FastAPI best practices to follow

- **Async where it helps, sync DB by default.** Use \`async def\` for the route, but keep
  SQLAlchemy 2 sync sessions unless you specifically need asyncpg — measure first.
- **Dependency injection everywhere.** \`Depends(get_db)\`, \`Depends(get_current_user)\` —
  never instantiate sessions inside the handler body.
- **Pydantic validation on every write path.** Use \`response_model=...\` on reads and a
  dedicated \`CreateIn\` / \`UpdateIn\` schema on writes.
- **Separate schemas from models.** \`MovieOrm\` (SQLAlchemy) and \`MovieOut\` / \`MovieCreate\`
  (Pydantic) live in different files.
- **Abstract repository interface.** Define \`MovieRepository(ABC)\` and a concrete
  \`SqlMovieRepository\` so the service layer never imports SQLAlchemy.
- **REST conventions.** \`GET /movies\`, \`GET /movies/{id}\`, \`POST /watch-history\` with
  correct status codes: \`200\`, \`201\`, \`204\`, \`404\`, \`422\`.
- **Errors via \`HTTPException\` and a consistent error shape.** Keep a single error
  response schema used across all routes.
- **CORS explicit.** Allow only known origins in dev/prod; never \`*\` in prod.
- **Typed, importable routes.** Use \`APIRouter\` per feature and include it from \`main.py\`.
- **Seeding with Faker.** Provide a \`seed.py\` script that inserts fake movies/shows/users
  so the API is demoable immediately.
- **Tests.** \`pytest\` + \`httpx\` against the ASGI app; use a separate test DB or SQLite in-memory
  with \`POSTGRES_TEST_URL\`.

---

## 4. Endpoints to implement first

- \`GET  /health\`         → \`{ "status": "ok" }\`
- \`GET  /movies\`         → paginated list, ?genre & ?year filters, ?page & ?page_size
- \`GET  /movies/{id}\`    → single movie, \`404\` if missing
- \`POST /watch-history\`  → record a watch event, \`201\` with the created entry
- \`GET  /watch-history\`  → list for the current user (auth via a stubbed token for now)

---

## 5. Once the setup is done — explain the changes

After the project scaffolds, models, migrations, and the endpoints above are in place,
**stop and walk me through what you changed**:

- Which files you created or modified and why.
- How the request flows: router → service → repository → SQLAlchemy session → DB,
  and how the response is serialized back to JSON via Pydantic.
- How \`get_db\` and dependency injection keep the layers decoupled.
- Where the abstract \`MovieRepository\` interface lives and how a different
  implementation (e.g. a Faker-backed in-memory repo) could swap in.
- Any assumptions you made about the data model, auth, or config.

Then suggest the next small step to take this from a scaffold to a production-shaped service.
`

const pythonSections = (): ChecklistSection[] => [
  {
    id: 'python-flow',
    title: 'Request Flow — how a GET /movies travels through the stack',
    flowDiagram: true,
    items: [
      item(
        'python-flow-overview',
        'Interactive request-flow diagram',
        'Step through a GET /movies request as it travels from the client, down through the FastAPI router, media service, and repository to the database, then back up as a 200 OK JSON response.',
        'Click the tile to open the interactive diagram. Use the Step control to advance the request through each layer and watch the response travel back to the client.',
      ),
    ],
  },
  {
    id: 'python-phase-1',
    title: 'Phase 1 — Foundations & Scripting Basics',
    items: [
      item(
        'python-p1-entry',
        '1.1 The Entry Point: Hello, World! and the interpreter',
        'Write a simple Python script that prints "Hello, World!" and understand how the Python interpreter executes code line by line.',
        'Run the script with `python hello.py`. The interpreter reads top-to-bottom, compiles to bytecode, and executes each statement in order.',
        {
          codeLang: 'python',
          code: `# hello.py
def main() -> None:
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
        },
      ),
      item(
        'python-p1-files',
        '1.2 Core File Operations: open() to read & write',
        "Use Python's native open() function to read from and write to disk files, handling close and basic modes (r, w, a).",
        'Always use a context manager (`with`) so the file handle closes even if an exception fires.',
        {
          codeLang: 'python',
          code: `# files.py
with open("titles.txt", "r") as f:
    titles = f.read().splitlines()

with open("titles.out", "w") as f:
    f.write("\\n".join(titles))`,
        },
      ),
    ],
  },
  {
    id: 'python-phase-2',
    title: 'Phase 2 — Functional Programming & OS Interactions',
    items: [
      item(
        'python-p2-encapsulate',
        '2.1 Encapsulation: open_file(path: str) function',
        "Wrap the native open() logic inside a custom, reusable function named open_file(path: str) so file access is centralized and testable.",
        'One function owns all file access. Tests can stub it; callers never touch `open` directly.',
        {
          codeLang: 'python',
          code: `def open_file(path: str) -> str:
    with open(path, "r") as f:
        return f.read()`,
        },
      ),
      item(
        'python-p2-dir',
        '2.2 Directory Exploration: os.listdir()',
        'Integrate os.listdir() to scan files within a directory path and return discoverable entries.',
        'listdir returns names only — join with the path to get usable file locations.',
        {
          codeLang: 'python',
          code: `import os

def list_titles(folder: str) -> list[str]:
    return [
        os.path.join(folder, name)
        for name in os.listdir(folder)
        if name.endswith(".txt")
    ]`,
        },
      ),
      item(
        'python-p2-serialize',
        '2.3 Data Serialization & Iteration: dict/tuple + for loops',
        'Return structured data (as a tuple or a json/dict object) from the function and print the results cleanly using for loops.',
        'Return a list of dicts so callers can iterate predictably and later json.dumps it.',
        {
          codeLang: 'python',
          code: `import os, json

def scan(folder: str) -> list[dict]:
    items = []
    for path in list_titles(folder):
        items.append({"path": path, "size": os.path.getsize(path)})
    return items

for it in scan("./titles"):
    print(json.dumps(it))`,
        },
      ),
    ],
  },
  {
    id: 'python-phase-3',
    title: 'Phase 3 — Object-Oriented Programming & Modeling',
    items: [
      item(
        'python-p3-class',
        '3.1 Class Architecture: MediaItem / Movie with class vars',
        'Move from procedural scripts to classes. Design a core class (e.g. MediaItem or Movie) with distinct class variables.',
        'Class variables are shared across instances; instance variables live on `self`.',
        {
          codeLang: 'python',
          code: `class Movie:
    kind = "movie"  # class variable

    def __init__(self, title: str, year: int):
        self.title = title   # instance variable
        self.year = year`,
        },
      ),
      item(
        'python-p3-init-str',
        '3.2 __init__ & __str__ / __repr__ for state and visualization',
        'Implement the __init__ constructor for state initialization and override the __str__ (or __repr__) magic method for clean string visualization of objects.',
        '__str__ is for users, __repr__ is for devs. Override both so logs and print() stay readable.',
        {
          codeLang: 'python',
          code: `class Movie:
    def __init__(self, title: str, year: int):
        self.title, self.year = title, year

    def __str__(self) -> str:
        return f"{self.title} ({self.year})"

    def __repr__(self) -> str:
        return f"Movie(title={self.title!r}, year={self.year})"`,
        },
      ),
      item(
        'python-p3-abc',
        '3.3 Abstract Interfaces with the abc module',
        "Use Python's abc module to design interfaces (e.g. RepositoryInterface) to decouple data access from business logic.",
        'The service depends on the interface, not a concrete class. Swap SQL for Faker without touching the domain.',
        {
          codeLang: 'python',
          code: `from abc import ABC, abstractmethod

class RepositoryInterface(ABC):
    @abstractmethod
    def get(self, movie_id: int) -> Movie: ...

class SqlMovieRepo(RepositoryInterface):
    def get(self, movie_id: int) -> Movie:
        ...  # real query`,
        },
      ),
    ],
  },
  {
    id: 'python-phase-4',
    title: 'Phase 4 — Database Modeling & Mock Data Generation',
    items: [
      item(
        'python-p4-models',
        '4.1 Data Modeling: Pydantic / SQLAlchemy for User, Movie, Show',
        'Design relational models (using Pydantic or SQLAlchemy) to represent Netflix entities like User, Movie, and Show.',
        'Pydantic = API/validation shape. SQLAlchemy = persistence shape. Keep them separate so each can evolve.',
        {
          codeLang: 'python',
          code: `from pydantic import BaseModel
from sqlalchemy import Column, Integer, String

# API shape
class MovieOut(BaseModel):
    id: int
    title: str
    year: int

# Persistence shape
class MovieRow(Base):
    __tablename__ = "movies"
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    year = Column(Integer)`,
        },
      ),
      item(
        'python-p4-faker',
        '4.2 Synthetic Data Seeding with Faker',
        'Use the Faker library to generate mass mock datasets (fake titles, descriptions, and user profiles) to seed the system for benchmarking.',
        'Seed thousands of rows so list/pagination/queries have realistic volume to benchmark.',
        {
          codeLang: 'python',
          code: `from faker import Faker

fake = Faker()

def seed_movies(n: int = 1000) -> list[dict]:
    return [
        {"title": fake.sentence(nb_words=3), "year": fake.year()}
        for _ in range(n)
    ]`,
        },
      ),
    ],
  },
  {
    id: 'python-phase-5',
    title: 'Phase 5 — High-Performance Web Services with FastAPI',
    items: [
      item(
        'python-p5-server',
        '5.1 Server Setup: FastAPI + Uvicorn bootstrap',
        'Bootstrap a modern asynchronous server using FastAPI and Uvicorn; verify a health route returns 200.',
        'Run with `uvicorn app:app --reload`. Hit /health to confirm the server is alive.',
        {
          codeLang: 'python',
          code: `from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}`,
        },
      ),
      item(
        'python-p5-db',
        '5.2 Database Connectivity: connection pool + safe fetches',
        'Establish an active database connection pool and implement safe data-fetching operations with parameterized queries.',
        'Use a session dependency so each request gets its own connection from the pool and releases it on exit.',
        {
          codeLang: 'python',
          code: `from sqlalchemy.orm import Session

def get_movie(db: Session, movie_id: int) -> MovieOut:
    row = db.execute(
        "SELECT id, title, year FROM movies WHERE id = :id",
        {"id": movie_id},
    ).first()
    return MovieOut.model_validate(row._mapping)`,
        },
      ),
      item(
        'python-p5-rest',
        '5.3 RESTful Endpoints: GET /movies/{id}, POST /watch-history',
        'Create optimized API routes following industry-standard REST conventions, including proper status codes, Pydantic validation, and dependency injection.',
        'Dependency injection passes the DB session; Pydantic validates the path & body; status codes signal intent.',
        {
          codeLang: 'python',
          code: `from fastapi import Depends, HTTPException, status

@app.get("/movies/{movie_id}", response_model=MovieOut)
def movies_read(movie_id: int, db: Session = Depends(get_db)):
    movie = get_movie(db, movie_id)
    if not movie:
        raise HTTPException(status.HTTP_404_NOT_FOUND)
    return movie

@app.post("/watch-history", status_code=status.HTTP_201_CREATED)
def watch_history(payload: WatchIn, db: Session = Depends(get_db)):
    ...`,
        },
      ),
    ],
  },
  {
    id: 'python-prompt',
    title: 'Project prompt — Netflix-style FastAPI',
    items: [
      item(
        'python-prompt-final',
        'Copy-this prompt: full Netflix-API project brief',
        'A copy-ready markdown prompt you can paste into any coding assistant. It bundles the Netflix data models, project setup steps, and FastAPI best practices, and ends by asking the assistant to explain every change once the setup is complete.',
        'Use the Copy button in the detail panel to grab the prompt, then paste it into your AI coding assistant.',
        {
          markdown: pythonPrompt,
        },
      ),
    ],
  },
]

export const CHECKLISTS: Record<LanguageId, ChecklistSection[]> = {
  java: sharedSections('java', {
    beginner: 'Pure Java CLI (no Spring yet); Maven/Gradle + JUnit 5',
    intermediate: 'Spring Boot 3, Web, Data JPA, validation, Postgres',
    advanced: 'Spring Security, Testcontainers, profiles, high coverage',
    expert:
      'Redis, messaging, Resilience4j, Micrometer/OTel, multi-module or services',
  }),
  python: pythonSections(),
  golang: sharedSections('golang', {
    beginner: 'Go modules, stdlib CLI, internal packages, table-driven tests',
    intermediate: 'net/http (or chi), Postgres, migrations, JSON errors',
    advanced: 'Auth middleware, context, slog, integration tests',
    expert: 'Redis, worker binary, graceful shutdown, Prometheus/OTel, compose',
  }),
  'system-design': systemDesignSections(),
  architectures: architectureSections(),
}

export function countItems(sections: ChecklistSection[]): number {
  return sections.reduce((n, s) => n + s.items.length, 0)
}

export function countChecked(
  sections: ChecklistSection[],
  checked: Record<string, boolean>,
): number {
  let n = 0
  for (const section of sections) {
    for (const item of section.items) {
      if (checked[item.id]) n += 1
    }
  }
  return n
}

export function findItem(
  sections: ChecklistSection[],
  itemId: string | null | undefined,
): { section: ChecklistSection; item: ChecklistItem } | null {
  if (!itemId) return null
  for (const section of sections) {
    const found = section.items.find((i) => i.id === itemId)
    if (found) return { section, item: found }
  }
  return null
}

/** Flat ordered list of all skills in the track. */
export function flattenItems(
  sections: ChecklistSection[],
): { section: ChecklistSection; item: ChecklistItem }[] {
  const list: { section: ChecklistSection; item: ChecklistItem }[] = []
  for (const section of sections) {
    for (const entry of section.items) {
      list.push({ section, item: entry })
    }
  }
  return list
}

export function getAdjacentSkills(
  sections: ChecklistSection[],
  itemId: string,
): {
  previous: { section: ChecklistSection; item: ChecklistItem } | null
  next: { section: ChecklistSection; item: ChecklistItem } | null
  index: number
  total: number
} {
  const list = flattenItems(sections)
  const index = list.findIndex((e) => e.item.id === itemId)
  if (index < 0) {
    return { previous: null, next: null, index: -1, total: list.length }
  }
  return {
    previous: index > 0 ? list[index - 1] : null,
    next: index < list.length - 1 ? list[index + 1] : null,
    index,
    total: list.length,
  }
}
