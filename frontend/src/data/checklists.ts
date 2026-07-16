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
}

export type ChecklistSection = {
  id: string
  title: string
  items: ChecklistItem[]
}

function item(
  id: string,
  label: string,
  header: string,
  body?: string,
): ChecklistItem {
  return {
    id,
    label,
    header,
    body:
      body ??
      'Detailed steps, examples, and exercises will go here. For now this is a placeholder tied to this skill.',
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

export const CHECKLISTS: Record<LanguageId, ChecklistSection[]> = {
  java: sharedSections('java', {
    beginner: 'Pure Java CLI (no Spring yet); Maven/Gradle + JUnit 5',
    intermediate: 'Spring Boot 3, Web, Data JPA, validation, Postgres',
    advanced: 'Spring Security, Testcontainers, profiles, high coverage',
    expert:
      'Redis, messaging, Resilience4j, Micrometer/OTel, multi-module or services',
  }),
  python: sharedSections('python', {
    beginner: 'Python 3.11+, venv/uv, pytest, ruff; typed CLI domain',
    intermediate: 'FastAPI + SQLAlchemy 2 + Alembic + Postgres',
    advanced: 'AuthZ roles, pytest+httpx, pydantic-settings, soft delete',
    expert: 'Redis, Celery/RQ worker, metrics, uvicorn/gunicorn, compose',
  }),
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
