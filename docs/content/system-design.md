# Prompt: System Design Roadmap (Beginner → Expert)

> **Usage:** Copy everything under “PROMPT” into an AI chat or hand it to a curriculum designer.  
> **Audience:** College graduates building job-ready system design skills.  
> **Spine product:** Employee Management platform, designed at increasing scale.

---

## PROMPT

You are an expert system design mentor and senior staff engineer. Create a complete **beginner-to-expert system design learning roadmap** for **recent college graduates**.

### Goals

1. Take a graduate from “I can build a CRUD API” to “I can design scalable, reliable systems and explain tradeoffs in interviews and design reviews.”
2. Use **one continuous product**: an **Employee Management System**. Each level **extends** the design — same domain, higher scale and stricter constraints.
3. Prefer **practical, interview-relevant** skills: requirements, capacity, APIs, data, caching, async, consistency, observability, multi-region.
4. Make every level produce a **portfolio-worthy deliverable** (diagrams, ADRs, mock interview writeups).

### Learner profile

- Recent graduate (CS / IT / related).
- Comfortable with: basic HTTP, SQL, one backend language, simple CRUD apps.
- Weak or uneven on: capacity estimation, caching invalidation, queues, consistency models, multi-service design, production reliability.
- Goal: backend / platform roles that expect system design interviews and design reviews.

### Continuous product: Employee Management

Domain stays fixed; scale and constraints grow.

**Core domain concepts (introduce gradually):**

- Employee: id, name, email, department, role/title, salary or band, join date, status
- Department, manager hierarchy
- Later: audit logs, multi-tenant orgs, notifications on hire, reporting/headcount, GDPR-style erase

**Progression of the same system:**

| Level | Design scope | Typical constraints |
|-------|--------------|---------------------|
| Beginner | Single service + DB | Clear API, data model, basic metrics |
| Intermediate | Cache, search, auth, async notify | 10× traffic, role-based access |
| Advanced | Distributed concerns | Consistency, retries, multi-service edges |
| Expert | Production-scale platform | Multi-region sketch, DR, cost, migrations |

### Roadmap structure requirements

Produce the roadmap with these sections:

1. **Overview** — philosophy and outcomes.
2. **Prerequisites** — networking, HTTP, SQL, basic concurrency.
3. **Learning path diagram** — Beginner → Intermediate → Advanced → Expert.
4. **Four levels** — each with the subsections below.
5. **Cross-cutting skills** — clarifying questions, tradeoff language, diagram hygiene.
6. **Interview & portfolio map** — what to show per level.
7. **Suggested timeline** — hours/weeks for motivated self-study.
8. **Resources** — official docs and a few high-quality books (no link spam).
9. **Anti-patterns** — buzzword architectures, skipping requirements, premature microservices.

### Required subsections for EACH level

#### Level name & outcome
#### Concepts to master
#### Employee system features / constraints for this level
#### Reference architecture (ASCII or Mermaid)
#### Capacity & NFRs to practice
#### Exercises (5–10)
#### Capstone deliverable
#### Exit criteria
#### Common mistakes

### Level-specific depth guidelines

#### Beginner
Latency/throughput/availability vocabulary; back-of-envelope; REST design; indexes; single-box diagrams.

#### Intermediate
Caching + invalidation; authZ placement; queues for hire notifications; read replicas; bottleneck analysis.

#### Advanced
Consistency choices; sharding/multi-tenant options; idempotency; SLOs; resilience patterns; soft-delete/audit/erase.

#### Expert
Multi-region tradeoffs; rate limiting; cost; zero-downtime migrations; DR drills; full mock interview.

### Output format

- Clear headings, tables where helpful, concrete numbers in examples.
- Always tie designs back to **Employee Management**.
- End each level with an acceptance checklist.
