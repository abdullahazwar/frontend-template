import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const properties = ['bg', 'surface', 'ink', 'muted', 'accent', 'soft'];

export async function catalogThemes() {
  const manifest = JSON.parse(
    await readFile(resolve(root, 'templates.json'), 'utf8'),
  );
  const rules = [
    '/* Generated from page CSS. Run npm run sync:previews after theme edits. */',
  ];
  for (const template of manifest) {
    const css = await readFile(resolve(root, template.stylesheet), 'utf8');
    const tokens = css.match(/:root\s*\{([^}]+)\}/)?.[1] || '';
    const declarations = properties.map((property) => {
      const pattern = new RegExp(`--${property}\\s*:\\s*([^;]+);`);
      const value = tokens.match(pattern)?.[1].trim();
      if (!value) throw new Error(`Missing --${property}: ${template.id}`);
      return `  --preview-${property}: ${value};`;
    });
    rules.push(
      `.template-thumb[data-template='${template.id}'] {`,
      ...declarations,
      '}',
      '',
    );
  }
  return rules.join('\n').trimEnd() + '\n';
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const output = resolve(root, 'assets/catalog-themes.css');
  const expected = await catalogThemes();
  if (process.argv.includes('--check')) {
    const current = await readFile(output, 'utf8');
    if (current !== expected) {
      throw new Error('Catalog themes changed. Run npm run sync:previews.');
    }
    console.log('Catalog CSS themes match all page stylesheets.');
  } else {
    await writeFile(output, expected);
    console.log('Updated assets/catalog-themes.css.');
  }
}
