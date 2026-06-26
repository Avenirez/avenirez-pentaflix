<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AI Developer Guidelines: Clean, Pragmatic & Domain-Driven

Apply the following guidelines for all code generation, refactoring, and project planning in this workspace.

---

## 1. The Ponytail Philosophy (YAGNI & Lazy Coding)
Before writing any code, step through "The Ladder" and stop at the first rung that solves the task:
1. **YAGNI (You Ain't Gonna Need It):** Challenge the need for this code. Does it need to exist?
2. **Reuse:** Reuse existing helpers, components, and functions in the project.
3. **Standard Library:** Use native JS/Node APIs instead of custom helper logic.
4. **Native Platform:** Use native HTML, CSS, or DB capabilities instead of JS code.
5. **Existing Dependencies:** Leverage packages already listed in `package.json`.
6. **One-Liner:** Implement with a single, clean expression if possible.
7. **Minimal Custom Code:** Write custom code only as a last resort. Keep it as minimal as possible.

---

## 2. Flexible DDD vs. CRUD Architecture
Apply the appropriate architectural pattern depending on the complexity of the feature:
* **Simple CRUD / Data Management:**
  - Keep it simple. Avoid complex abstractions, repository layers, or domain boundaries.
  - Write straightforward logic directly in pages, route handlers, or basic controllers.
* **Complex Business Logic (E-commerce, transactions, multi-step flows):**
  - Apply **Domain-Driven Design (DDD)** principles.
  - Model core concepts as **Entities** (with identity) and **Value Objects** (immutable values).
  - Define clear **Bounded Contexts** to prevent domain leak.
  - Use **Ubiquitous Language** matching the terms used by the business/user.

---

## 3. Software Craftsmanship (Clean Code & Refactoring)
* **Readability over cleverness:** Write self-explanatory code with clear naming.
* **Refactor early:** If you see messy, redundant, or complex code while working, refactor it immediately.
* **Small, focused functions:** Every function should do one thing and do it well (Single Responsibility Principle).

---

## 4. Quality & Execution Hygiene
* **Double Check Imports:** Never import from deleted or non-existent files.
* **Verify Builds:** Always verify the project builds and runs successfully (`npm run build` or similar) before finalizing any changes.
* **No placeholders:** Write complete, production-ready code. Never leave TODOs or placeholders.

---

## 5. Scalable System Design (Performance-First)
* **Optimization & Caching:** Use caching mechanisms (e.g., Next.js fetch revalidation, React memoization) to prevent redundant data fetching or API queries.
* **Efficient Execution:** Minimize resource usage. Avoid heavy operations in UI rendering paths and optimize render cycles.

---

## 6. Modern Industry Standards
* **Modern Conventions:** Follow modern developer roadmaps. Write clean, standard code conforming to current framework guidelines (e.g., modern ECMAScript, React Hooks).
* **Security & Best Practices:** Adhere to security standards (sanitizing inputs, protecting API keys in env variables) and ensure accessibility (semantic HTML).


