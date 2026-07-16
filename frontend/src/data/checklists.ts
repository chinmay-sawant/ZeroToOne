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
