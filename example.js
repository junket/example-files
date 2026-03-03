'use strict';

/**
 * example.js
 *
 * A small, representative Node.js module that demonstrates:
 * - Safe JSON parsing
 * - Basic async I/O
 * - A simple concurrency-limited mapper
 * - A minimal CLI entrypoint
 */

const fs = require('node:fs/promises');
const path = require('node:path');

/**
 * Parse JSON safely.
 * @param {string} text
 * @returns {{ok: true, value: any} | {ok: false, error: Error}}
 */
function safeJsonParse(text) {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (err) {
    return { ok: false, error: /** @type {Error} */ (err) };
  }
}

/**
 * Read a UTF-8 file.
 * @param {string} filePath
 * @returns {Promise<string>}
 */
async function readTextFile(filePath) {
  return fs.readFile(filePath, 'utf8');
}

/**
 * Concurrency-limited async map.
 * @template T, U
 * @param {T[]} items
 * @param {(item: T, index: number) => Promise<U>} mapper
 * @param {{concurrency?: number}} [options]
 * @returns {Promise<U[]>}
 */
async function mapLimit(items, mapper, options = {}) {
  const concurrency = Math.max(1, options.concurrency ?? 4);
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    for (;;) {
      const i = nextIndex++;
      if (i >= items.length) return;
      results[i] = await mapper(items[i], i);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

/**
 * Example "business logic": read a JSON file and summarize its top-level shape.
 * @param {string} filePath
 * @returns {Promise<{path: string, kind: string, keys?: string[], length?: number}>}
 */
async function summarizeJsonFile(filePath) {
  const text = await readTextFile(filePath);
  const parsed = safeJsonParse(text);

  if (!parsed.ok) {
    const err = new Error(`Invalid JSON in ${filePath}: ${parsed.error.message}`);
    // Preserve original error as context for Node >=16.
    // @ts-ignore - Error.cause is supported in modern Node.
    err.cause = parsed.error;
    throw err;
  }

  const value = parsed.value;
  if (Array.isArray(value)) {
    return { path: filePath, kind: 'array', length: value.length };
  }
  if (value && typeof value === 'object') {
    return { path: filePath, kind: 'object', keys: Object.keys(value).sort() };
  }
  return { path: filePath, kind: typeof value };
}

/**
 * Minimal CLI.
 *
 * Usage:
 *   node example.js ./data/a.json ./data/b.json
 */
async function main(argv) {
  const args = argv.slice(2);
  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    const script = path.basename(argv[1] || 'example.js');
    process.stdout.write(
      `Usage: node ${script} <file.json...>\n` +
        `Summarizes JSON files (kind, keys/length).\n`
    );
    return;
  }

  const summaries = await mapLimit(
    args,
    async (p) => summarizeJsonFile(p),
    { concurrency: 4 }
  );

  process.stdout.write(JSON.stringify(summaries, null, 2) + '\n');
}

if (require.main === module) {
  // eslint-disable-next-line no-console
  main(process.argv).catch((err) => {
    console.error(err && err.stack ? err.stack : String(err));
    process.exitCode = 1;
  });
}

module.exports = {
  safeJsonParse,
  readTextFile,
  mapLimit,
  summarizeJsonFile,
};
