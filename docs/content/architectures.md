# Prompt: Software Architectures Roadmap (Beginner → Expert)

> **Usage:** Copy everything under “PROMPT” into an AI chat or hand it to a curriculum designer.  
> **Audience:** College graduates building job-ready software architecture skills.  
> **Spine product:** Employee Management application, restructured and evolved level by level.

---

## PROMPT

You are an expert software architect and curriculum designer. Create a complete **beginner-to-expert software architectures learning roadmap** for **recent college graduates**.

### Goals

1. Take a graduate from “I put all code in controllers/handlers” to “I can choose, document, and evolve architecture styles for real products.”
2. Use **one continuous product**: an **Employee Management System**. Each level **evolves** the structure of the same product — not random greenfield demos.
3. Cover **architecture styles and boundaries**: layered apps, modular monoliths, hexagonal/ports-and-adapters, domain events, multi-service splits, multi-tenant and platform concerns.
4. Make every level produce **diagrams + ADRs + a structure you could implement** in any language track (Java / Python / Go).

### Learner profile

- Recent graduate comfortable with OOP/functions and a simple CRUD backend.
- Weak on: dependency direction, module boundaries, when to split services, evolutionary architecture, governance.
- Goal: mid-level backend roles that expect design reviews and maintainable codebases.

### Continuous product: Employee Management

Same domain as language tracks so learners can apply architecture on code they already ship.

**Progression:**

| Level | Architecture focus | Product shape |
|-------|--------------------|---------------|
| Beginner | Layered modular app | CLI or simple API, clear packages |
| Intermediate | Ports & adapters / clean edges | API + DB + swappable notifiers |
| Advanced | Bounded contexts, events, 2–3 services | Hire flow across identity / core / notify |
| Expert | Platform + evolution | Multi-tenant HR SaaS sketch, fitness functions |

### Roadmap structure requirements

1. **Overview**
2. **Prerequisites**
3. **Learning path diagram**
4. **Four levels** with required subsections
5. **Cross-cutting skills** — ADRs, C4 diagrams, code review for architecture smells
6. **Interview & portfolio map**
7. **Suggested timeline**
8. **Resources**
9. **Anti-patterns** — distributed monolith, shared DB between “services”, premature CQRS

### Required subsections for EACH level

#### Level name & outcome
#### Concepts to master
#### Employee app structural changes
#### Suggested module/service layout
#### Diagrams to produce (C4 levels as appropriate)
#### Exercises
#### Capstone deliverable
#### Exit criteria
#### Common mistakes

### Level-specific depth guidelines

#### Beginner
UI/domain/infrastructure layers; package-by-feature vs layer; dependency direction; domain vs transport errors; test seams.

#### Intermediate
Hexagonal ports; use-case services; DTO anti-corruption; config as boundary; CQRS-lite for reports; ADR: monolith first.

#### Advanced
Bounded contexts; domain vs integration events; sagas for hire; sync API + async workers; REST/RPC/event boundary choices.

#### Expert
Evolutionary architecture & fitness functions; multi-tenant patterns; internal platforms; blast radius; architecture governance pack (C4 + ADRs + evolution plan).

### Output format

- Prefer concrete package trees and “allowed dependency” rules.
- Always map concepts back to **Employee Management**.
- Language-agnostic where possible; note how Java/Python/Go would express the same boundaries.
