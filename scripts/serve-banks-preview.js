#!/usr/bin/env node
import { createReadStream, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATIC_ROOT = join(__dirname, '..', 'static');
const startPort = Number(process.env.BANKS_PREVIEW_PORT || 8765);
const listenHost = process.env.BANKS_PREVIEW_HOST || '127.0.0.1';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript'
};

/**
 * @param {import('node:http').IncomingMessage} req
 * @param {import('node:http').ServerResponse} res
 */
async function handle(req, res) {
  const url = new URL(req.url || '/', 'http://localhost');
  let pathname = decodeURIComponent(url.pathname);

  if (pathname === '/' || pathname === '/banks' || pathname === '/banks/') {
    pathname = '/banks/index.html';
  }
  if (pathname.endsWith('/')) pathname += 'index.html';

  const filePath = join(STATIC_ROOT, pathname);
  if (!filePath.startsWith(STATIC_ROOT) || !existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  const fileStat = await stat(filePath);
  if (!fileStat.isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  const ext = pathname.slice(pathname.lastIndexOf('.'));
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  createReadStream(filePath).pipe(res);
}

/**
 * @param {number} port
 */
function tryListen(port) {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      handle(req, res).catch((err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(String(err));
      });
    });

    server.once('error', (err) => {
      if (/** @type {NodeJS.ErrnoException} */ (err).code === 'EADDRINUSE') {
        resolve(null);
        return;
      }
      reject(err);
    });

    server.listen(port, listenHost, () => resolve({ server, port }));
  });
}

if (!existsSync(join(STATIC_ROOT, 'banks', 'index.html'))) {
  console.error('Puudub static/banks/index.html — käivita esmalt: npm run preview-banks');
  process.exit(1);
}

let started = null;
for (let port = startPort; port < startPort + 10; port += 1) {
  started = await tryListen(port);
  if (started) break;
}

if (!started) {
  console.error(`Pordid ${startPort}–${startPort + 9} on hõivatud.`);
  process.exit(1);
}

const url = `http://localhost:${started.port}/banks/`;
console.log('');
console.log('  Panganduse eelvaade on valmis.');
console.log('');
console.log(`  Ava brauseris: ${url}`);
console.log('');
console.log('  Peatamiseks vajuta Ctrl+C');
console.log('');
