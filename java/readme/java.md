# Prompt: Java Roadmap (Beginner → Expert)

> **Usage:** Copy everything under “PROMPT” into an AI chat or hand it to a curriculum designer.  
> **Audience:** College graduates building job-ready Java backend skills.  
> **Spine project:** Employee Management application, grown level by level.

---

## PROMPT

You are an expert Java curriculum designer and senior backend engineer. Create a complete **beginner-to-expert Java learning roadmap** for **recent college graduates**.

### Goals

1. Take a graduate from “I know Java syntax from college” to “I can design and ship production-grade Java backends.”
2. Use **one continuous product**: an **Employee Management System**. Each level **extends** the previous app — do not jump to unrelated toy projects.
3. Prefer **practical, interview-relevant, industry-used** skills over academic theory alone.
4. Make every level produce a **portfolio-worthy deliverable** with clear “done” criteria.

### Learner profile

- Recent graduate (CS / IT / related).
- Comfortable with: variables, loops, classes, basic OOP, arrays/lists, maybe simple JDBC or Swing from coursework.
- Weak or uneven on: real project structure, Spring, testing culture, SQL in depth, concurrency, distributed systems, production ops.
- Goal: backend / full-stack-capable Java roles (services, APIs, enterprise stacks).

### Continuous project: Employee Management

Domain stays fixed; complexity grows.

**Core domain concepts (introduce gradually):**

- Employee: id, name, email, department, role/title, salary or band, join date, status (active/inactive)
- Department
- Later levels: manager hierarchy, attendance/leave, payroll hooks, audit logs, multi-tenant org (optional at expert)

**Progression of the same app:**

| Level | Product shape | Storage / runtime |
|-------|---------------|-------------------|
| Beginner | CLI employee CRUD | In-memory collections |
| Intermediate | REST API + persistence | Relational DB (e.g. PostgreSQL or H2→Postgres path), Spring Boot |
| Advanced | Secure, layered, tested service | Auth (JWT/OAuth2 basics), validation, migrations, comprehensive tests |
| Expert | Production-oriented platform | Caching, messaging, observability, resilience, optional multi-module/microservices |

Emphasize **evolving the same codebase** (or a clear monorepo evolution story), not rewriting from scratch without reason.

### Roadmap structure requirements

Produce the roadmap with these sections:

1. **Overview** — 1 short paragraph on philosophy and outcomes.
2. **Prerequisites** — what the learner should already know; what to install (JDK version, IDE, Docker optional, etc.).
3. **Learning path diagram** — ASCII or Mermaid: Beginner → Intermediate → Advanced → Expert.
4. **Four levels** — each with the subsections below.
5. **Cross-cutting skills** — Git, HTTP, SQL, Linux basics, reading docs, debugging — where they fit.
6. **Interview & portfolio map** — what to show on resume/GitHub per level.
7. **Suggested timeline** — hours/weeks per level for a motivated grad (full-time-ish self-study).
8. **Resources** — official docs first; 2–4 high-quality books/courses max; avoid link spam.
9. **Anti-patterns** — what not to do (tutorial hell, framework-only without fundamentals, etc.).

### Required subsections for EACH level

For **Beginner**, **Intermediate**, **Advanced**, and **Expert**, include:

#### Level name & outcome
One sentence: what they can build/explain after this level.

#### Concepts to master
Bullet list of language + ecosystem topics (Java-specific).

#### Employee app features to implement
Concrete features for this level only (incremental).

#### Project structure
Suggested package/module layout for this level.

#### Tech stack for this level
Pin idiomatic choices. Suggested defaults (adjust if you have a strong reason):

- **Beginner:** Java 17+ or 21 LTS, Maven or Gradle, JUnit 5 (light), no Spring yet if possible — pure Java CLI first so OOP and collections stick.
- **Intermediate:** Spring Boot 3.x, Spring Web, Spring Data JPA, Bean Validation, Flyway/Liquibase, PostgreSQL (or H2 for local + Postgres-ready), OpenAPI/Swagger optional, Docker Compose for DB.
- **Advanced:** Spring Security, JWT or session strategy clearly explained, MapStruct or manual mappers, Testcontainers, Mockito, integration tests, structured logging, configuration profiles, exception handling strategy, pagination/filtering.
- **Expert:** Redis (cache), message broker (Kafka or RabbitMQ — pick one and justify), resilience (timeouts, retries, circuit breaker e.g. Resilience4j), metrics/tracing (Micrometer + OpenTelemetry or Actuator + Prometheus), API gateway or BFF optional, multi-module Maven/Gradle or a small set of collaborating services (Employee, Auth, Notification), async processing, performance considerations, deployment sketch (container + CI).

#### Exercises
5–10 progressive exercises (not all “CRUD again” — include debugging, refactoring, edge cases).

#### Capstone deliverable for the level
What must be in the repo README demo video/screenshots, and acceptance checklist.

#### Exit criteria
Bullet list: “You are ready for the next level when you can …”

#### Common mistakes at this level
3–5 traps.

### Level-specific depth guidelines

#### Beginner (foundations + CLI product)

Cover thoroughly:

- JDK, `javac`/`java`, build tool basics
- Types, control flow, methods, packages
- OOP: classes, interfaces, inheritance vs composition, equals/hashCode, immutability
- Collections, streams intro, Optional intro
- Exceptions, file I/O optional if time
- Unit tests for pure domain logic
- **App:** Interactive CLI — add/list/search/update/delete employees; validation of email uniqueness in memory; simple menu; clean separation of domain / repository / UI layers (even without Spring)

Avoid Spring Boot at this level unless briefly previewed.

#### Intermediate (web + data)

Cover thoroughly:

- HTTP, REST design for employees and departments
- Spring Boot app structure, dependency injection
- JPA entities, repositories, DTOs vs entities
- Relational modeling (FKs, simple joins)
- Validation annotations, global error responses
- Basic logging
- **App:** REST API for employees/departments; DB persistence; seed data; Postman/curl collection; simple search/filter

#### Advanced (professional service quality)

Cover thoroughly:

- Authentication & authorization (roles: ADMIN, HR, EMPLOYEE)
- Soft delete, audit fields (createdAt, updatedAt)
- Service layer transactions
- Testing pyramid: unit + slice + integration (Testcontainers)
- API versioning or stable contract discipline
- Config management, secrets not in git
- **App:** Login/protected endpoints; role-based access; pagination; reporting endpoint (e.g. headcount by dept); high test coverage on critical paths

#### Expert (systems thinking + production)

Cover thoroughly:

- Caching hot reads (employee by id, dept lists)
- Async events (e.g. “employee hired” → notification)
- Idempotency, retries, outbox pattern intro (explain when useful)
- Observability: health, metrics, structured logs, correlation ids
- Concurrency pitfalls (transactions, optimistic locking for salary updates)
- Optional: split Auth service or Notification worker; document trade-offs vs modular monolith
- Load testing light intro; capacity thinking
- **App:** Production-shaped Employee platform with runbooks, docker-compose (or k8s sketch), CI pipeline outline, architecture decision records (short ADRs)

### Output format rules

- Use Markdown with clear headings.
- Prefer tables for stacks, timelines, and feature matrices.
- Be specific (class names, endpoint examples, package names) but not overly long code dumps — short snippets only when they clarify architecture.
- Call out **Java idioms** (records, sealed types where useful, try-with-resources, concurrency utilities) at the right level.
- Keep tone direct and practical for grads preparing for industry.
- Do **not** claim a single “only correct” stack; state defaults and acceptable alternatives.
- End with a **one-page checklist** the learner can print: skills × level.

### Constraints

- Do not generate the entire multi-thousand-line codebase; generate the **roadmap and curriculum**, with feature lists and structure.
- Do not pivot the domain away from Employee Management.
- Do not skip testing after Intermediate.
- Align difficulty with college grads: ambitious but paced; no assumed FAANG experience.

### Final instruction

Generate the full roadmap now, following every section above. If you must make a choice (Maven vs Gradle, JWT vs sessions, Kafka vs RabbitMQ), **choose one default**, justify in one sentence, and note the alternative.
