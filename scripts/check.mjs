import { readFile, readdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import { catalogThemes } from './sync-previews.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(
  await readFile(resolve(root, 'templates.json'), 'utf8'),
);
assert.equal(
  await readFile(resolve(root, 'assets/catalog-themes.css'), 'utf8'),
  await catalogThemes(),
  'Gallery CSS must match page themes. Run npm run sync:previews.',
);
assert.equal(manifest.length, 90, 'The collection must contain 90 designs');
assert.equal(
  new Set(manifest.map((t) => t.id)).size,
  manifest.length,
  'IDs must be unique',
);
const categories = [...new Set(manifest.map((t) => t.category))];
assert.equal(categories.length, 10);
for (const category of categories) {
  assert.equal(
    manifest.filter((t) => t.category === category).length,
    category === 'portfolio' ? 36 : 6,
  );
}
for (const template of manifest) {
  assert.ok(!Object.hasOwn(template, 'colors'));
  assert.ok(!Object.hasOwn(template, 'palette'));
  assert.equal(
    template.stylesheet,
    template.path.replace(/\.html$/, '.css'),
    'Page stylesheet must share its template name',
  );
  const html = await readFile(resolve(root, template.path), 'utf8');
  const css = await readFile(resolve(root, template.stylesheet), 'utf8');
  assert.ok(css.trim(), 'Page stylesheet must not be empty');
  assert.ok(
    html.includes(`href="./${template.id}.css"`),
    'Template must load its page stylesheet',
  );
}
const portfolios = manifest.filter((t) => t.category === 'portfolio');
assert.equal(new Set(portfolios.map((t) => t.portfolioType)).size, 9);
assert.equal(
  portfolios.filter((t) => t.source.kind === 'open-source-adaptation').length,
  6,
);
for (const template of portfolios) {
  assert.ok(
    template.path.startsWith(`templates/portfolio/${template.portfolioType}/`),
  );
  assert.ok(template.model);
  const html = await readFile(resolve(root, template.path), 'utf8');
  if (template.source.kind === 'open-source-adaptation') {
    assert.ok(
      html.includes('MIT License'),
      'Adapted pages must preserve MIT notices',
    );
    assert.ok(html.includes(template.source.ref));
  }
}
const redirects = JSON.parse(
  await readFile(resolve(root, 'portfolio-redirects.json'), 'utf8'),
);
for (const [oldPath, newPath] of Object.entries(redirects)) {
  const html = await readFile(resolve(root, oldPath), 'utf8');
  assert.match(html, /http-equiv="refresh"/);
  assert.ok(manifest.some((t) => t.path === newPath));
  await readFile(resolve(root, newPath));
}
const context = { window: {} };
runInNewContext(
  await readFile(resolve(root, 'assets/manifest.js'), 'utf8'),
  context,
);
assert.equal(
  JSON.stringify(context.window.TEMPLATE_MANIFEST),
  JSON.stringify(manifest),
  'Gallery metadata must match export metadata',
);

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (
      ['node_modules', 'exports', '.git', 'test-results'].includes(entry.name)
    )
      continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}
let checked = 0;
for (const path of await walk(root)) {
  if (!/\.(m?js)$/.test(path)) continue;
  if (
    path.startsWith(resolve(root, 'assets') + '/') ||
    path.startsWith(resolve(root, 'frameworks') + '/')
  ) {
    const source = await readFile(path, 'utf8');
    assert.doesNotMatch(
      source,
      /\.style\b|\bstyle\s*:\s*\{|setAttribute\(\s*['"]style['"]|<style\b/,
      'Runtime JavaScript must not write presentation: ' + path,
    );
  }
  const result = spawnSync(process.execPath, ['--check', path], {
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, path + '\n' + result.stderr);
  checked++;
}
console.log(
  'Manifest: 90 templates, 10 categories, 36 portfolios in 9 subcategories. ' +
    `Syntax: ${checked} JavaScript files passed.`,
);
