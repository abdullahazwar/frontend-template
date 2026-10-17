import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT || 4173);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
};
if (!Number.isInteger(port) || port < 0 || port > 65535)
  throw new Error('PORT tidak valid.');
const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end();
    return;
  }
  try {
    const path = decodeURIComponent(
      new URL(request.url, 'http://localhost').pathname,
    );
    if (
      path.includes('\0') ||
      path.split('/').some((part) => part.startsWith('.'))
    ) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }
    let file = resolve(root, '.' + path);
    if (!file.startsWith(root + sep) && file !== root) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const body = await readFile(file);
    response.writeHead(200, {
      'Content-Type': types[extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Halaman tidak ditemukan.');
  }
});
server.listen(port, '127.0.0.1', () =>
  console.log(`Frontend collection: http://127.0.0.1:${server.address().port}`),
);
server.on('error', (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
