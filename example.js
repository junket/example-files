/**
 * example.js
 *
 * Representative JavaScript example file for this repo.
 * Keeps the code dependency-free so it can run with plain Node.js.
 *
 * Run:
 *   node example.js
 */

'use strict';

/**
 * Parse a CSV string into an array of objects.
 * - Handles a header row.
 * - Trims whitespace.
 * - Ignores empty lines.
 */
function parseCSV(text) {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cols = line.split(',').map((c) => c.trim());
    return Object.fromEntries(headers.map((h, i) => [h, cols[i] ?? '']));
  });
}

/**
 * Group an array of items by a key function.
 */
function groupBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = String(keyFn(item));
    (acc[key] ??= []).push(item);
    return acc;
  }, /** @type {Record<string, any[]>} */ ({}));
}

/**
 * Small demo showing parsing, transformation, grouping, and formatting.
 */
function main() {
  const csv = [
    'name, role, active',
    'Ada,  engineer, true',
    'Linus, engineer, true',
    'Grace, manager, false',
    '',
  ].join('\n');

  const users = parseCSV(csv).map((u) => ({
    name: u.name,
    role: u.role,
    active: u.active.toLowerCase() === 'true',
  }));

  const activeUsers = users.filter((u) => u.active);
  const byRole = groupBy(activeUsers, (u) => u.role);

  // Pretty output
  const summary = Object.entries(byRole)
    .map(([role, list]) => ({ role, count: list.length, names: list.map((u) => u.name) }))
    .sort((a, b) => b.count - a.count || a.role.localeCompare(b.role));

  console.log('Active users by role:');
  for (const row of summary) {
    console.log(`- ${row.role}: ${row.count} (${row.names.join(', ')})`);
  }

  // Demonstrate basic error handling
  try {
    JSON.parse('{invalid json');
  } catch (err) {
    console.log('\nCaught expected error:', err instanceof Error ? err.message : String(err));
  }
}

if (require.main === module) {
  main();
}

module.exports = { parseCSV, groupBy };
