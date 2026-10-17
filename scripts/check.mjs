import { readFile, readdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(resolve(root, 'templates.json'), 'utf8'));
assert.equal(manifest.length, 60, 'The collection must contain 60 designs');
assert.equal(new Set(manifest.map(t => t.id)).size, 60, 'IDs must be unique');
const categories = [...new Set(manifest.map(t => t.category))];
assert.equal(categories.length, 10);
for (const category of categories) assert.equal(manifest.filter(t => t.category === category).length, 6);
const context = { window: {} };
runInNewContext(await readFile(resolve(root, 'assets/manifest.js'), 'utf8'), context);
assert.equal(JSON.stringify(context.window.TEMPLATE_MANIFEST), JSON.stringify(manifest), 'Gallery metadata must match export metadata');

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (['node_modules', 'exports', '.git', 'test-results'].includes(entry.name)) continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}
let checked = 0;
for (const path of await walk(root)) {
  if (!/\.(m?js)$/.test(path)) continue;
  const result = spawnSync(process.execPath, ['--check', path], { encoding: 'utf8' });
  assert.equal(result.status, 0, path + '\n' + result.stderr);
  checked++;
}
console.log(`Manifest: 60 templates, 10 categories, six per category. Syntax: ${checked} JavaScript files passed.`);
