import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import '../assets/catalog-core.js';
import { exportTemplate } from './export.mjs';

const { selectTemplates } = globalThis.TemplateCatalog;
const manifest = JSON.parse(
  await readFile(new URL('../templates.json', import.meta.url), 'utf8'),
);

test('profession, source, search, and favorites compose without changing input', () => {
  const options = {
    category: 'portfolio',
    portfolioType: 'developer',
    source: 'open-source-adaptation',
    query: '  SIMPLE  ',
    savedOnly: true,
    saved: new Set(['simple-developer', 'paper-writer']),
  };
  assert.deepEqual(
    selectTemplates(manifest, options).map((t) => t.id),
    ['simple-developer'],
  );
  assert.equal(manifest.length, 90);
  assert.equal(
    selectTemplates(manifest, { ...options, query: 'nonexistent' }).length,
    0,
  );
  assert.equal(
    selectTemplates(manifest, { ...options, portfolioType: 'writing' }).length,
    0,
  );
});

test('portfolio-only filters do not hide unrelated categories', () => {
  assert.equal(
    selectTemplates(manifest, {
      category: 'dashboard',
      portfolioType: 'developer',
      source: 'open-source-adaptation',
    }).length,
    6,
  );
  assert.equal(selectTemplates(manifest, { category: 'portfolio' }).length, 36);
  assert.equal(
    selectTemplates(manifest, {
      category: 'portfolio',
      source: 'open-source-adaptation',
    }).length,
    6,
  );
});

test('nested portfolio packages preserve scripts, artwork, and MIT notices', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'portfolio-export-'));
  try {
    for (const id of [
      'simple-developer',
      'timeline-engineer',
      'paper-writer',
      'case-product',
    ]) {
      const file = await exportTemplate(id, directory);
      const html = await readFile(file, 'utf8');
      assert.doesNotMatch(html, /(?:src|href)="\.\.\//);
      assert.doesNotMatch(html, /<style\b/);
      assert.match(html, /data-profile-download/);
      const js = await readFile(join(dirname(file), 'script.js'), 'utf8');
      assert.match(js, /function filterWorks/);
      if (id === 'case-product') assert.match(html, /src="\.\/assets\/art\//);
      else assert.match(html, /MIT License/);
    }
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
