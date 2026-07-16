import type { LanguageId } from '@/lib/content'

export type ChecklistItem = {
  id: string
  label: string
}

export type ChecklistSection = {
  id: string
  title: string
  items: ChecklistItem[]
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
      {
        id: `${prefix}-b-setup`,
        label: 'Toolchain installed (runtime, editor, version manager)',
      },
      {
        id: `${prefix}-b-oop`,
        label: 'Core language + OOP/composition fundamentals solid',
      },
      {
        id: `${prefix}-b-cli`,
        label: 'Employee CLI: add / list / search / update / delete',
      },
      {
        id: `${prefix}-b-memory`,
        label: 'In-memory store with unique email validation',
      },
      {
        id: `${prefix}-b-layers`,
        label: 'Domain / store / UI separation in the project layout',
      },
      {
        id: `${prefix}-b-tests`,
        label: 'Unit tests for domain rules (table-driven where idiomatic)',
      },
      {
        id: `${prefix}-b-stack`,
        label: stackNotes.beginner,
      },
    ],
  },
  {
    id: `${prefix}-intermediate`,
    title: 'Intermediate — HTTP + persistence',
    items: [
      {
        id: `${prefix}-i-rest`,
        label: 'REST API for employees and departments',
      },
      {
        id: `${prefix}-i-db`,
        label: 'Relational DB persistence + migrations',
      },
      {
        id: `${prefix}-i-dto`,
        label: 'Request/response models separate from persistence models',
      },
      {
        id: `${prefix}-i-validation`,
        label: 'Input validation and consistent error payloads',
      },
      {
        id: `${prefix}-i-seed`,
        label: 'Seed data + curl/Postman collection documented',
      },
      {
        id: `${prefix}-i-filter`,
        label: 'Filter/search by department or status',
      },
      {
        id: `${prefix}-i-stack`,
        label: stackNotes.intermediate,
      },
    ],
  },
  {
    id: `${prefix}-advanced`,
    title: 'Advanced — professional service quality',
    items: [
      {
        id: `${prefix}-a-auth`,
        label: 'Authentication (JWT/session) wired on protected routes',
      },
      {
        id: `${prefix}-a-rbac`,
        label: 'Roles: ADMIN / HR / EMPLOYEE with salary/delete rules',
      },
      {
        id: `${prefix}-a-audit`,
        label: 'Soft delete + audit timestamps (created/updated)',
      },
      {
        id: `${prefix}-a-tests`,
        label: 'Unit + integration tests (DB via containers or CI DB)',
      },
      {
        id: `${prefix}-a-paging`,
        label: 'Pagination + headcount/report endpoint',
      },
      {
        id: `${prefix}-a-config`,
        label: 'Config profiles; secrets never committed',
      },
      {
        id: `${prefix}-a-stack`,
        label: stackNotes.advanced,
      },
    ],
  },
  {
    id: `${prefix}-expert`,
    title: 'Expert — production platform',
    items: [
      {
        id: `${prefix}-e-cache`,
        label: 'Caching for hot reads (employee by id / dept lists)',
      },
      {
        id: `${prefix}-e-async`,
        label: 'Async path (hire event → notification worker)',
      },
      {
        id: `${prefix}-e-obs`,
        label: 'Observability: health, metrics, structured logs',
      },
      {
        id: `${prefix}-e-resilience`,
        label: 'Timeouts, retries, graceful shutdown where applicable',
      },
      {
        id: `${prefix}-e-compose`,
        label: 'docker-compose (API + DB + cache/worker) runs end-to-end',
      },
      {
        id: `${prefix}-e-ci`,
        label: 'CI pipeline outline + short ADRs in the repo',
      },
      {
        id: `${prefix}-e-stack`,
        label: stackNotes.expert,
      },
    ],
  },
]

export const CHECKLISTS: Record<LanguageId, ChecklistSection[]> = {
  java: sharedSections('java', {
    beginner: 'Pure Java CLI (no Spring yet); Maven/Gradle + JUnit 5',
    intermediate: 'Spring Boot 3, Web, Data JPA, validation, Postgres',
    advanced: 'Spring Security, Testcontainers, profiles, high coverage',
    expert: 'Redis, messaging, Resilience4j, Micrometer/OTel, multi-module or services',
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
