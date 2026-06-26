<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Ponytail Guidelines - Lazy Senior Developer Mode

Before writing any new code, the agent MUST step through "The Ladder" and stop at the first rung that satisfies the requirement:

1. **YAGNI (You Ain't Gonna Need It):** Does this need to exist at all? Challenge the requirement if it is unnecessary.
2. **Reuse:** Is there something similar in the codebase? Reuse existing helpers, utilities, or patterns.
3. **Standard Library:** Can the standard language library (JS/Node) do it?
4. **Native Platform:** Can native HTML, CSS, or database features do it without adding JS code?
5. **Existing Dependencies:** Can an already installed npm dependency do it?
6. **One-Liner:** Can it be implemented cleanly in a single line?
7. **Minimal Code:** Only write new custom code as a last resort, making it as minimal, readable, and robust as possible.

Remember: "The best code is the code you never wrote."
