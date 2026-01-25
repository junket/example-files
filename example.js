/*
 * example.js
 *
 * Representative JavaScript source file used as a fixture/example in this repo.
 * The goal is to cover common JS syntax/features (ES modules, async/await,
 * classes, destructuring, template strings, optional chaining, etc.).
 */

// Simple utility
export function greet(name = "world") {
  return `Hello, ${name}!`;
}

// Small pure function with destructuring + defaults
export function sum({ a = 0, b = 0 } = {}) {
  return a + b;
}

// Async example (simulated I/O)
export async function fetchJson(url) {
  // In real code you'd use globalThis.fetch; here we keep it self-contained.
  await new Promise((resolve) => setTimeout(resolve, 10));
  return { ok: true, url, fetchedAt: new Date().toISOString() };
}

// Class + private field
export class Counter {
  #count = 0;

  constructor(initial = 0) {
    this.#count = Number(initial) || 0;
  }

  inc(step = 1) {
    this.#count += step;
    return this.#count;
  }

  get value() {
    return this.#count;
  }
}

// Representative program entrypoint
if (import.meta?.url) {
  const counter = new Counter(2);
  const message = greet("JavaScript");
  const total = sum({ a: 3, b: 4 });

  fetchJson("https://example.invalid/api")
    .then((res) => {
      console.log(message);
      console.log(`counter=${counter.inc()} total=${total}`);
      console.log(`fetch: ${JSON.stringify(res)}`);
    })
    .catch((err) => {
      console.error("Unexpected error:", err);
      process.exitCode = 1;
    });
}
