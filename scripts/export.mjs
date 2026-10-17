import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { dirname, relative, resolve, sep } from 'node:path';
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

function isExternal(reference) {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference);
}

function normalizeNavigation(html, source) {
  const ids = new Set(
    [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]),
  );
  const related = [];
  let output = html.replace(/href="([^"]+)"/g, (full, href) => {
    if (href.startsWith('#')) {
      return ids.has(href.slice(1)) ? full : 'href="#main"';
    }
    if (isExternal(href)) return full;
    const path = localPath(source, href);
    const target = manifest.find((item) => resolve(root, item.path) === path);
    if (target) {
      related.push(target.name);
      return 'href="#export-related"';
    }
    return 'href="#main"';
  });
  output = output.replaceAll('← Koleksi template', '↑ Awal halaman');
  output = output.replaceAll('← Koleksi portofolio', '↑ Awal halaman');
  if (related.length) {
    const section = [
      '<section id="export-related" class="panel space">',
      '<h2>Contoh halaman terkait</h2><p>',
      [...new Set(related)].join(', '),
      '. Tersedia terpisah dalam repositori frontend-template.',
      '</p></section></main>',
    ].join('');
    output = output.replace('</main>', () => section);
  }
  return output;
}

export async function exportTemplate(
  id,
  outputDirectory = resolve(root, 'exports'),
) {
  const template = manifest.find((item) => item.id === id);
  if (!template) throw new Error('ID template tidak ditemukan: ' + id);
  const source = resolve(root, template.path);
  const destination = resolve(outputDirectory, id);
  await mkdir(destination, { recursive: true });
  let html = await readFile(source, 'utf8');
  const copiedAssets = new Map();

  async function copyAsset(from, reference) {
    const path = localPath(from, reference);
    const target = relative(root, path).split(sep).join('/');
    if (!copiedAssets.has(path)) {
      const output = resolve(destination, target);
      await mkdir(dirname(output), { recursive: true });
      await copyFile(path, output);
      copiedAssets.set(path, './' + target);
    }
    return copiedAssets.get(path);
  }

  const styles = [];
  for (const [tag] of html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)) {
    const reference = tag.match(/href="([^"]+)"/)?.[1];
    if (!reference) throw new Error('Stylesheet tanpa href: ' + id);
    const path = localPath(source, reference);
    let css = await readFile(path, 'utf8');
    const urls = [...css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)];
    for (const [full, value] of urls) {
      const reference = value.trim();
      if (isExternal(reference)) continue;
      const asset = await copyAsset(path, reference);
      css = css.replace(full, () => `url("${asset}")`);
    }
    styles.push(`/* Source: ${relative(root, path)} */\n${css}`);
    html = html.replace(tag, '');
  }

  const scripts = [];
  const scriptTags = [
    ...html.matchAll(/<script\b[^>]*src="([^"]+)"[^>]*>\s*<\/script>/g),
  ];
  for (const [tag, reference] of scriptTags) {
    if (/\btype="module"/.test(tag)) {
      throw new Error('Exporter HTML klasik tidak menggabungkan ES modules.');
    }
    const path = localPath(source, reference);
    scripts.push(
      `/* Source: ${relative(root, path)} */\n` +
        (await readFile(path, 'utf8')),
    );
    html = html.replace(tag, '');
  }

  const media = new Set(
    [...html.matchAll(/src="([^"]+)"/g)].map((match) => match[1]),
  );
  for (const reference of media) {
    if (isExternal(reference)) continue;
    const asset = await copyAsset(source, reference);
    html = html.replaceAll(`src="${reference}"`, `src="${asset}"`);
  }

  html = normalizeNavigation(html, source);
  html = html.replace(
    '</head>',
    '  <link rel="stylesheet" href="./styles.css">\n</head>',
  );
  html = html.replace(
    '</body>',
    '  <script src="./script.js" defer></script>\n</body>',
  );
  const output = resolve(destination, 'index.html');
  await writeFile(resolve(destination, 'styles.css'), styles.join('\n\n'));
  await writeFile(resolve(destination, 'script.js'), scripts.join('\n\n'));
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
