# Prompt: Python Roadmap (Beginner → Expert)

> **Usage:** Copy everything under “PROMPT” into an AI chat or hand it to a curriculum designer.  
> **Audience:** College graduates building job-ready Python backend skills.  
> **Spine project:** Employee Management application, grown level by level.

---

## PROMPT

You are an expert Python curriculum designer and senior backend engineer. Create a complete **beginner-to-expert Python learning roadmap** for **recent college graduates**.

### Goals

1. Take a graduate from “I know Python from college / scripting” to “I can design and ship production-grade Python backends.”
2. Use **one continuous product**: an **Employee Management System**. Each level **extends** the previous app — do not jump to unrelated toy projects.
3. Prefer **practical, interview-relevant, industry-used** skills over academic theory alone.
4. Make every level produce a **portfolio-worthy deliverable** with clear “done” criteria.
5. Stay honest about Python’s strengths: clear code, fast iteration, strong ecosystem for APIs, automation, and data-adjacent backends — without turning this into a pure data-science track unless a feature naturally needs light analytics.

### Learner profile

- Recent graduate (CS / IT / related).
- Comfortable with: Python syntax, functions, basic classes, lists/dicts, maybe Jupyter or small scripts.
- Weak or uneven on: packaging, virtualenvs, typing, async, SQLAlchemy/Django/FastAPI at production depth, testing culture, deployment.
- Goal: backend API roles, platform/internal tools, or Python services in product companies.

### Continuous project: Employee Management

Domain stays fixed; complexity grows.

**Core domain concepts (introduce gradually):**

- Employee: id, name, email, department, role/title, salary or band, join date, status (active/inactive)
- Department
- Later levels: manager hierarchy, leave requests, audit logs, export/report jobs, multi-tenant org (optional at expert)

**Progression of the same app:**

| Level | Product shape | Storage / runtime |
|-------|---------------|-------------------|
| Beginner | CLI employee CRUD | In-memory structures; optional JSON file persistence at end of level |
| Intermediate | REST API + persistence | Relational DB (PostgreSQL preferred), FastAPI or Django REST (pick one default) |
| Advanced | Secure, layered, tested service | Auth, migrations, validation, comprehensive tests, background tasks intro |
| Expert | Production-oriented platform | Caching, queues/workers, observability, resilience, optional service split |

Emphasize **evolving the same codebase**, not random rewrites.

### Roadmap structure requirements

Produce the roadmap with these sections:

1. **Overview** — philosophy and outcomes.
2. **Prerequisites** — Python version, tooling (uv/poetry/pip+venv — pick a default), IDE, Docker optional.
3. **Learning path diagram** — ASCII or Mermaid.
4. **Four levels** — each with the subsections below.
5. **Cross-cutting skills** — Git, HTTP, SQL, Linux, debugging, reading PEPs/docs.
6. **Interview & portfolio map** — resume/GitHub artifacts per level.
7. **Suggested timeline** — hours/weeks per level.
8. **Resources** — official docs first; few high-quality books/courses.
9. **Anti-patterns** — tutorial hell, untyped mega-scripts, framework magic without fundamentals.

### Required subsections for EACH level

For **Beginner**, **Intermediate**, **Advanced**, and **Expert**, include:

#### Level name & outcome
One sentence outcome.

#### Concepts to master
Python language + ecosystem topics for this level.

#### Employee app features to implement
Incremental features only for this level.

#### Project structure
Suggested package layout (`src/` layout preferred when appropriate).

#### Tech stack for this level
Pin idiomatic defaults (justify briefly):

- **Beginner:** Python 3.11+ or 3.12, venv or uv, pytest, ruff (lint/format), no web framework yet — CLI first. Introduce type hints early. Use dataclasses or pydantic models for Employee if helpful.
- **Intermediate:** **Default: FastAPI + SQLAlchemy 2.x + Alembic + PostgreSQL** (note Django as alternative track). Pydantic schemas, dependency injection style, OpenAPI free from FastAPI, Docker Compose for DB.
- **Advanced:** JWT or session auth (OAuth2 password flow with FastAPI is fine), role-based access (ADMIN, HR, EMPLOYEE), pytest + httpx/async client, Testcontainers or dockerized Postgres for tests, structured logging, settings via pydantic-settings, soft delete, pagination, filtering.
- **Expert:** Redis cache, task queue (**Celery or arq/Dramatiq/RQ — pick one**), retries/timeouts, metrics (Prometheus client or OpenTelemetry), tracing, gunicorn/uvicorn workers, optional split (API + worker), export jobs (CSV/PDF of employees), rate limiting, CI pipeline outline.

#### Exercises
5–10 progressive exercises (refactoring, edge cases, debugging, SQL, typing).

#### Capstone deliverable for the level
Repo quality bar + acceptance checklist.

#### Exit criteria
“You are ready for the next level when you can …”

#### Common mistakes at this level
3–5 traps (e.g. mutable defaults, bare except, blocking I/O in async endpoints).

### Level-specific depth guidelines

#### Beginner (foundations + CLI product)

Cover thoroughly:

- Virtual environments, running modules (`python -m`)
- Types and type hints, mypy/pyright optional intro
- Functions, modules, packages
- OOP: classes, dunder methods, composition over inheritance
- Collections, comprehensions, generators intro
- Exceptions, context managers
- File I/O / JSON persistence optional late in level
- pytest for domain logic
- **App:** CLI — add/list/search/update/delete employees; unique email invariant; domain vs repository vs presentation separation

Avoid FastAPI/Django until Intermediate (short preview OK).

#### Intermediate (web + data)

Cover thoroughly:

- REST design for employees and departments
- Pydantic request/response models
- SQLAlchemy models vs API schemas
- Migrations with Alembic
- Dependency injection (DB session, settings)
- Error handling and consistent error payloads
- **App:** REST API; DB; seed script; curl/httpie/Postman collection; filter by department/status

#### Advanced (professional service quality)

Cover thoroughly:

- AuthN/AuthZ and password hashing (e.g. passlib/bcrypt or modern equivalent)
- Role checks on sensitive routes (salary visibility, delete)
- Transaction boundaries
- Testing pyramid; factory fixtures
- Config/secrets discipline
- Soft delete + audit timestamps
- **App:** Protected API; HR vs employee permissions; pagination; headcount report; high coverage on auth and domain rules

#### Expert (systems thinking + production)

Cover thoroughly:

- Caching (employee by id)
- Background jobs (welcome email simulation, bulk import)
- Idempotency keys for create endpoints (intro)
- Observability: structured logs, metrics, health checks
- Concurrency: async pitfalls, DB pool sizing basics
- Optional modular monolith vs microservices discussion
- Light load testing (locust or k6 mention)
- **App:** Production-shaped platform with docker-compose, worker process, short ADRs, CI sketch, runbook

### Output format rules

- Markdown with clear headings.
- Tables for stacks, timelines, feature matrices.
- Short snippets only when architecture needs them.
- Call out **Pythonic** practices (EAFP, context managers, generators, clear naming, typing) at the right level.
- Tone: practical for grads entering industry.
- State defaults + acceptable alternatives (FastAPI vs Django, poetry vs uv, Celery vs RQ).
- End with a **printable skills × level checklist**.

### Constraints

- Generate the **roadmap and curriculum**, not a full multi-thousand-line codebase.
- Do **not** abandon the Employee Management domain.
- Do **not** skip testing after Intermediate.
- Do **not** convert this into a pure ML/data-science curriculum; light reporting/analytics features are fine.
- Difficulty: ambitious for grads, not assuming senior distributed-systems experience.

### Final instruction

Generate the full roadmap now, following every section above. When choosing tools (FastAPI vs Django, Celery vs RQ, poetry vs uv), **pick one default**, justify in one sentence, and list the main alternative.
