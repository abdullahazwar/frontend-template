import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(resolve(root, 'templates.json'), 'utf8'));
export async function exportTemplate(id, outputDirectory = resolve(root, 'exports')) {
  const template = manifest.find(t => t.id === id);
  if (!template) throw new Error('ID template tidak ditemukan: ' + id);
  const source = resolve(root, template.path);
  let html = await readFile(source, 'utf8');
  const base = await readFile(resolve(root, 'assets/base.css'), 'utf8');
  html = html.replace('<link rel="stylesheet" href="../../assets/base.css">', () => '<style>' + base + '</style>');
  for (const name of ['core.js', 'runtime.js']) {
    const js = await readFile(resolve(root, 'assets', name), 'utf8');
    html = html.replace(`<script src="../../assets/${name}" defer></script>`, '');
    // Inline classic scripts at the end of body: defer does not apply to inline scripts.
    html = html.replace('</body>', () => '<script>' + js.replace(/<\/script/gi, '<\\/script') + '</script></body>');
  }
  const images = [...new Set([...html.matchAll(/src="(\.\.\/\.\.\/assets\/art\/[^\"]+\.svg)"/g)].map(m => m[1]))];
  for (const path of images) {
    const svg = await readFile(resolve(dirname(source), path));
    html = html.replaceAll(`src="${path}"`, `src="data:image/svg+xml;base64,${svg.toString('base64')}"`);
  }
  // Make exports independent of the gallery and sibling demo pages.
  const ids = new Set([...html.matchAll(/\bid="([^\"]+)"/g)].map(m => m[1]));
  const related = [];
  html = html.replace(/href="([^\"]+)"/g, (full, href) => {
    if (href.startsWith('#')) return ids.has(href.slice(1)) ? full : 'href="#main"';
    if (/^(https?:|mailto:|tel:|data:)/.test(href)) return full;
    const path = resolve(dirname(source), href);
    const target = manifest.find(t => resolve(root, t.path) === path);
    if (target) { related.push(target.name); return 'href="#export-related"'; }
    return 'href="#main"';
  });
  html = html.replace('<a href="#main">← Koleksi template</a>', '<a href="#main">↑ Awal halaman</a>');
  if (related.length) html = html.replace('</main>', () => `<section id="export-related" class="panel space"><h2>Contoh halaman terkait</h2><p>${[...new Set(related)].join(', ')}. Tersedia terpisah dalam repositori frontend-template.</p></section></main>`);
  await mkdir(outputDirectory, { recursive: true });
  const output = resolve(outputDirectory, id + '.html');
  await writeFile(output, html);
  return output;
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const id = process.argv[2];
  if (!id) { console.log('Pemakaian: npm run export -- pulse-sales | all'); process.exitCode = 1; }
  else {
    const ids = id === 'all' ? manifest.map(t => t.id) : [id];
    for (const selected of ids) console.log(await exportTemplate(selected));
  }
}
