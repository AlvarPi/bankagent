#!/usr/bin/env node
import 'dotenv/config';
import { createReadStream, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildAdvisorSystemPrompt,
  chatWithAdvisor,
  checkAdvisorHealth,
  loadBankKnowledge,
  parseAdvisorMessages
} from './banks/_shared/advisor.js';
import { buildLhvContext } from './banks/_shared/lhv.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATIC_ROOT = join(__dirname, '..', 'static');
const STATIC_BANKS = join(STATIC_ROOT, 'banks');
const startPort = Number(process.env.BANKS_PREVIEW_PORT || 8765);
const listenHost = process.env.BANKS_PREVIEW_HOST || '127.0.0.1';
// Väline baastee (nt /bankagent). Failid jäävad kettal static/banks/ alla;
// see prefiks mäpitakse sinna ja serveeritavas HTML/JSON-is asendatakse /banks/.
const BASE = (process.env.BANKS_BASE_PATH || '/banks').replace(/\/+$/, '');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png'
};

/** @type {Promise<{ index: object, banks: Record<string, unknown> }> | null} */
let advisorKnowledgePromise = null;

function getAdvisorKnowledge() {
  if (!advisorKnowledgePromise) {
    advisorKnowledgePromise = loadBankKnowledge(STATIC_BANKS);
  }
  return advisorKnowledgePromise;
}

/**
 * @param {import('node:http').IncomingMessage} req
 */
async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) {
    throw new Error('Tühi päringu sisu.');
  }

  return JSON.parse(raw);
}

/**
 * @param {import('node:http').ServerResponse} res
 * @param {number} status
 * @param {object} payload
 */
function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(`${JSON.stringify(payload)}\n`);
}

/**
 * @param {import('node:http').IncomingMessage} req
 * @param {import('node:http').ServerResponse} res
 */
async function handleAdvisor(req, res) {
  const url = new URL(req.url || '/', 'http://localhost');
  const pathname = decodeURIComponent(url.pathname);

  if (req.method === 'GET' && pathname === `${BASE}/api/advisor/health`) {
    const health = await checkAdvisorHealth();
    sendJson(res, health.ok ? 200 : 503, health);
    return;
  }

  if (req.method !== 'POST' || pathname !== `${BASE}/api/advisor`) {
    sendJson(res, 404, { error: 'Not found' });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const messages = parseAdvisorMessages(body);
    const knowledge = await getAdvisorKnowledge();
    // Isiklik LHV-kontekst AINULT õige võtmega (avalik leht ei tohi seda saada).
    const advisorKey = (process.env.LHV_ADVISOR_KEY || '').trim();
    const keyOk =
      advisorKey.length > 0 && body && typeof body.key === 'string' && body.key === advisorKey;
    const lhvContext = keyOk ? await buildLhvContext().catch(() => '') : '';
    const systemPrompt = buildAdvisorSystemPrompt(knowledge, messages, lhvContext);
    const result = await chatWithAdvisor(messages, systemPrompt);

    sendJson(res, 200, {
      reply: result.reply,
      model: result.model,
      knowledgeAt: knowledge.index.generatedAt
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const isTimeout =
      err instanceof Error &&
      (err.name === 'TimeoutError' ||
        err.name === 'AbortError' ||
        /ajalõpu|timed out/i.test(message));
    const isClient = message.startsWith('Oodatud JSON') || message.includes('kohustuslik');
    const status = isClient ? 400 : isTimeout ? 504 : 502;
    const error = isTimeout
      ? 'AI vastus võttis liiga kaua. Proovi lühemat küsimust või proovi mõne aja pärast uuesti.'
      : message;
    if (!res.writableEnded) {
      sendJson(res, status, { error });
    }
  }
}

/**
 * @param {import('node:http').IncomingMessage} req
 * @param {import('node:http').ServerResponse} res
 */
async function handleStatic(req, res) {
  const url = new URL(req.url || '/', 'http://localhost');
  let pathname = decodeURIComponent(url.pathname);

  // Väline baastee -> kettal /banks
  if (pathname === '/' || pathname === BASE || pathname === `${BASE}/`) {
    pathname = '/banks/index.html';
  } else if (pathname.startsWith(`${BASE}/`)) {
    pathname = `/banks${pathname.slice(BASE.length)}`;
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
  // HTML/JSON sisaldab absoluutseid /banks/ viiteid — asenda väljastatava baasteega.
  if (BASE !== '/banks' && (ext === '.html' || ext === '.json')) {
    const body = (await readFile(filePath, 'utf8')).split('/banks/').join(`${BASE}/`);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(body);
    return;
  }
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  createReadStream(filePath).pipe(res);
}

/**
 * @param {import('node:http').IncomingMessage} req
 * @param {import('node:http').ServerResponse} res
 */
async function handle(req, res) {
  const url = new URL(req.url || '/', 'http://localhost');
  const pathname = decodeURIComponent(url.pathname);

  if (pathname.startsWith(`${BASE}/api/advisor`)) {
    await handleAdvisor(req, res);
    return;
  }

  await handleStatic(req, res);
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

    server.keepAliveTimeout = Number(process.env.BANKS_KEEPALIVE_TIMEOUT_MS || 75_000);
    server.headersTimeout = Number(process.env.BANKS_HEADERS_TIMEOUT_MS || 120_000);
    server.requestTimeout = Number(process.env.BANKS_REQUEST_TIMEOUT_MS || 360_000);

    server.listen(port, listenHost, () => resolve({ server, port }));
  });
}

if (!existsSync(join(STATIC_ROOT, 'banks', 'index.html'))) {
  console.error('Puudub static/banks/index.html — käivita esmalt: npm run preview-banks');
  process.exit(1);
}

const maxPorts = process.env.NODE_ENV === 'production' ? 1 : 10;
let started = null;
for (let port = startPort; port < startPort + maxPorts; port += 1) {
  started = await tryListen(port);
  if (started) break;
}

if (!started) {
  const end = startPort + maxPorts - 1;
  console.error(`Port ${startPort}${end > startPort ? `–${end}` : ''} on hõivatud (nginx ootab ${startPort}).`);
  process.exit(1);
}

const health = await checkAdvisorHealth();
const url = `http://localhost:${started.port}${BASE}/`;
console.log('');
console.log('  Panganduse eelvaade on valmis.');
console.log('');
console.log(`  Ava brauseris: ${url}`);
console.log(`  Nõustaja API: http://localhost:${started.port}/banks/api/advisor`);
console.log(
  health.ok
    ? `  Nõustaja: OK (${health.model})`
    : `  Nõustaja: EI TÖÖTA — ${health.error}`
);
console.log('');
console.log('  Peatamiseks vajuta Ctrl+C');
console.log('');
