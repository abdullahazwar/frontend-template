import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(
  await readFile(resolve(root, 'templates.json'), 'utf8'),
);

function localPath(source, reference) {
  const url = new URL(reference, pathToFileURL(source));
  if (url.protocol !== 'file:') {
    throw new Error('Ekspor hanya mendukung aset lokal: ' + reference);
  }
  const path = fileURLToPath(url);
  if (!path.startsWith(root + sep)) {
    throw new Error('Aset berada di luar repo: ' + reference);
  }
  return path;
}

export async function exportTemplate(
  id,
  outputDirectory = resolve(root, 'exports'),
) {
  const template = manifest.find((item) => item.id === id);
  if (!template) throw new Error('ID template tidak ditemukan: ' + id);
  const source = resolve(root, template.path);
  let html = await readFile(source, 'utf8');

  // Resolve resources against the actual source path, including nested portfolios.
  const styles = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)];
  for (const [tag] of styles) {
    const reference = tag.match(/href="([^"]+)"/)?.[1];
    if (!reference) throw new Error('Stylesheet tanpa href: ' + id);
    const css = await readFile(localPath(source, reference), 'utf8');
    html = html.replace(tag, () => '<style>\n' + css + '\n</style>');
  }

  const scripts = [];
  const scriptTags = [
    ...html.matchAll(/<script\b[^>]*src="([^"]+)"[^>]*>\s*<\/script>/g),
  ];
  for (const [tag, reference] of scriptTags) {
    scripts.push(await readFile(localPath(source, reference), 'utf8'));
    html = html.replace(tag, '');
  }

  const images = new Set(
    [...html.matchAll(/src="([^"]+\.svg)"/g)].map((match) => match[1]),
  );
  for (const reference of images) {
    const svg = await readFile(localPath(source, reference));
    html = html.replaceAll(
      `src="${reference}"`,
      `src="data:image/svg+xml;base64,${svg.toString('base64')}"`,
    );
  }

  const ids = new Set(
    [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]),
  );
  const related = [];
  html = html.replace(/href="([^"]+)"/g, (full, href) => {
    if (href.startsWith('#')) {
      return ids.has(href.slice(1)) ? full : 'href="#main"';
    }
    if (/^(https?:|mailto:|tel:|data:)/.test(href)) return full;
    const path = localPath(source, href);
    const target = manifest.find((item) => resolve(root, item.path) === path);
    if (target) {
      related.push(target.name);
      return 'href="#export-related"';
    }
    return 'href="#main"';
  });
  html = html.replaceAll('← Koleksi template', '↑ Awal halaman');
  html = html.replaceAll('← Koleksi portofolio', '↑ Awal halaman');
  if (related.length) {
    const section = [
      '<section id="export-related" class="panel space">',
      '<h2>Contoh halaman terkait</h2><p>',
      [...new Set(related)].join(', '),
      '. Tersedia terpisah dalam repositori frontend-template.',
      '</p></section></main>',
    ].join('');
    html = html.replace('</main>', () => section);
  }

  // Inline at body end: defer does not apply to inline classic scripts.
  const code = scripts
    .map((script) => {
      const escaped = script.replace(/<\/script/gi, '<\\/script');
      return '<script>\n' + escaped + '\n</script>';
    })
    .join('\n');
  html = html.replace('</body>', () => code + '\n</body>');
  await mkdir(outputDirectory, { recursive: true });
  const output = resolve(outputDirectory, id + '.html');
  await writeFile(output, html);
  return output;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const id = process.argv[2];
  if (!id) {
    console.log('Pemakaian: npm run export -- pulse-sales | all');
    process.exitCode = 1;
  } else {
    const ids = id === 'all' ? manifest.map((item) => item.id) : [id];
    for (const selected of ids) console.log(await exportTemplate(selected));
  }
}
