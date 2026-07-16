# Prompt: Golang Roadmap (Beginner → Expert)

> **Usage:** Copy everything under “PROMPT” into an AI chat or hand it to a curriculum designer.  
> **Audience:** College graduates building job-ready Go backend / cloud-native skills.  
> **Spine project:** Employee Management application, grown level by level.

---

## PROMPT

You are an expert Go curriculum designer and senior backend engineer. Create a complete **beginner-to-expert Go (Golang) learning roadmap** for **recent college graduates**.

### Goals

1. Take a graduate from “I know programming fundamentals” (maybe little or no Go) to “I can design and ship production-grade Go services.”
2. Use **one continuous product**: an **Employee Management System**. Each level **extends** the previous app — do not jump to unrelated toy projects.
3. Prefer **practical, interview-relevant, industry-used** skills: simplicity, explicitness, concurrency, solid HTTP services, operational excellence.
4. Make every level produce a **portfolio-worthy deliverable** with clear “done” criteria.
5. Teach **idiomatic Go** — small interfaces, accept interfaces / return structs, error handling without panic-driven control flow, modules, table-driven tests.

### Learner profile

- Recent graduate (CS / IT / related).
- Comfortable with: another language (Java/Python/C/JS), basic data structures, HTTP at a conceptual level.
- May be new to: Go syntax, pointers, goroutines, interfaces-as-contracts, `context`, modules, static binaries, cloud-native ops.
- Goal: backend / platform / infrastructure-leaning roles where Go is common (APIs, workers, internal tools, cloud services).

### Continuous project: Employee Management

Domain stays fixed; complexity grows.

**Core domain concepts (introduce gradually):**

- Employee: id, name, email, department, role/title, salary or band, join date, status (active/inactive)
- Department
- Later levels: manager hierarchy, audit logs, async notifications, multi-tenant org (optional at expert)

**Progression of the same app:**

| Level | Product shape | Storage / runtime |
|-------|---------------|-------------------|
| Beginner | CLI employee CRUD | In-memory maps/slices |
| Intermediate | HTTP JSON API + persistence | PostgreSQL via `database/sql` + driver (or sqlx/pgx — pick default), migrations |
| Advanced | Secure, layered, tested service | Auth middleware, validation, contexts, comprehensive tests |
| Expert | Production-oriented platform | Caching, messaging/workers, observability, graceful shutdown, optional multi-service |

Emphasize **evolving the same module/repo**, with clear package boundaries.

### Roadmap structure requirements

Produce the roadmap with these sections:

1. **Overview** — philosophy (simplicity, composition) and outcomes.
2. **Prerequisites** — Go version (1.22+ or current stable), toolchain, editor (gopls), Docker optional.
3. **Learning path diagram** — ASCII or Mermaid.
4. **Four levels** — each with the subsections below.
5. **Cross-cutting skills** — Git, HTTP, SQL, Linux, reading `go doc`, profiling basics later.
6. **Interview & portfolio map** — what to show per level (including concurrency demos).
7. **Suggested timeline** — hours/weeks per level.
8. **Resources** — official tour/docs first; few excellent books (e.g. mention categories, not spam).
9. **Anti-patterns** — overusing goroutines, ignoring `context`, huge interface{}, framework addiction, panic for business errors.

### Required subsections for EACH level

For **Beginner**, **Intermediate**, **Advanced**, and **Expert**, include:

#### Level name & outcome
One sentence outcome.

#### Concepts to master
Go language + ecosystem topics for this level.

#### Employee app features to implement
Incremental features only for this level.

#### Project structure
Idiomatic layout options: simple `cmd/` + `internal/` early; avoid premature `/pkg` abuse. Show example tree per level.

#### Tech stack for this level
Pin idiomatic defaults:

- **Beginner:** Go toolchain modules, stdlib only where possible, `testing` package, table-driven tests. CLI via `flag` or simple menu on stdin. No web framework.
- **Intermediate:** `net/http` **or** a thin router (**chi** or **echo** or **gin** — pick **one** default and justify; prefer teaching stdlib HTTP patterns first then optional router). PostgreSQL, `pgx` or `database/sql`, goose/migrate/atlas for migrations, structured JSON errors.
- **Advanced:** JWT or session middleware, bcrypt password hashing, role-based access (ADMIN, HR, EMPLOYEE), `context.Context` on all request paths, validation (manual or go-playground/validator), integration tests with testcontainers-go or dockertest, `slog` structured logging, config via env.
- **Expert:** Redis, message queue or at least a worker pattern (NATS, RabbitMQ, or Kafka — pick one), graceful shutdown, health/readiness, OpenTelemetry or Prometheus metrics, timeouts/retries, `errgroup`, optimistic locking or version fields, optional split: API service + worker. CI + multi-stage Docker builds.

#### Exercises
5–10 progressive exercises (race detector, refactor to interfaces, SQL edge cases, middleware).

#### Capstone deliverable for the level
Repo quality bar + acceptance checklist.

#### Exit criteria
“You are ready for the next level when you can …”

#### Common mistakes at this level
3–5 traps (e.g. not checking errors, goroutine leaks, mutex copy, context ignored).

### Level-specific depth guidelines

#### Beginner (foundations + CLI product)

Cover thoroughly:

- `go mod`, packages, exported vs unexported
- Types, structs, methods, pointers vs values
- Interfaces (small), error values, wrapping (`fmt.Errorf` / `%w`)
- Slices, maps, ranging
- Testing and table-driven tests
- Simple concurrency preview optional (not required for CLI correctness)
- **App:** CLI — add/list/search/update/delete employees; unique email; packages: `internal/domain`, `internal/store`, `cmd/employee`

Avoid heavy frameworks. Prefer stdlib thinking.

#### Intermediate (HTTP + data)

Cover thoroughly:

- `net/http` handlers, routing, middleware basics
- JSON encode/decode, status codes, REST for employees/departments
- SQL: parameterized queries (no string concat), transactions intro
- Migrations and schema for employees/departments
- Context cancellation on request
- **App:** HTTP API; Postgres; seed command; curl examples; filter by department/status

#### Advanced (professional service quality)

Cover thoroughly:

- Auth middleware + roles
- Layering: handler → service → repository
- Interfaces at boundaries for testing
- Soft delete, audit timestamps
- Comprehensive tests (unit + integration)
- Config and secrets discipline
- **App:** Protected routes; salary visibility rules; pagination; headcount report endpoint

#### Expert (systems thinking + production)

Cover thoroughly:

- Caching with TTLs; cache invalidation story
- Async: hire event → notification worker
- Concurrency: worker pools, `errgroup`, race detector habit
- Observability: `slog`, metrics, tracing hooks
- Graceful shutdown (finish in-flight requests)
- Resilience: timeouts, retries with backoff (careful with non-idempotent POSTs)
- Optional multi-binary repo: `cmd/api`, `cmd/worker`
- **App:** Production-shaped Employee platform; docker-compose; short ADRs; CI; load-test sketch; README with architecture diagram

### Output format rules

- Markdown with clear headings.
- Tables for stacks, timelines, feature matrices.
- Short snippets only when they clarify idioms (e.g. small interface, middleware signature).
- Emphasize **Go proverbs and idioms** at the right level without turning the doc into a quote list.
- Tone: practical for grads aiming at industry Go roles.
- State defaults + alternatives (chi vs gin, pgx vs database/sql, NATS vs RabbitMQ).
- End with a **printable skills × level checklist**.

### Constraints

- Generate the **roadmap and curriculum**, not a full multi-thousand-line codebase.
- Do **not** abandon the Employee Management domain.
- Do **not** skip testing after Beginner (Go culture is test-heavy early).
- Do **not** teach “goroutines everywhere”; teach **when** concurrency helps.
- Difficulty: ambitious for grads; no assumed prior SRE experience.

### Final instruction

Generate the full roadmap now, following every section above. When choosing libraries (router, migrate tool, queue), **pick one default**, justify in one sentence, and list the main alternative.
