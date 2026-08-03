#!/usr/bin/env node
import 'dotenv/config';
import { createReadStream, createWriteStream, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { mkdir, readdir, readFile, rm, stat } from 'node:fs/promises';
import { basename, dirname, extname, join } from 'node:path';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
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
// Üleslaaditud failid EI ole static/ all — neid ei serveerita kunagi tagasi,
// need on ainult kettal agendi (Claude) tööks.
const UPLOAD_DIR = join(__dirname, '..', 'upload');
const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
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
function readJsonBody(req) {
  // Nõustaja sõnumid võivad sisaldada lisatud failide teksti, aga mitte piiramatult.
  const MAX_BODY_BYTES = 8 * 1024 * 1024;

  return new Promise((resolve, reject) => {
    /** @type {Buffer[]} */
    const chunks = [];
    let total = 0;
    let settled = false;

    const settle = (fn, value) => {
      if (settled) return;
      settled = true;
      req.off('data', onData);
      req.off('end', onEnd);
      req.off('error', onError);
      fn(value);
    };

    function onData(chunk) {
      total += chunk.length;
      if (total > MAX_BODY_BYTES) {
        // Ei loe edasi, aga ei tapa ka ühendust — vastus peab kliendini jõudma.
        req.pause();
        const err = new Error('Päring on liiga suur (piir 8 MB). Lisa väiksem fail.');
        // @ts-expect-error — oma väli veakäsitluse jaoks
        err.statusCode = 413;
        settle(reject, err);
        return;
      }
      chunks.push(chunk);
    }

    function onEnd() {
      const raw = Buffer.concat(chunks).toString('utf8').trim();
      if (!raw) {
        settle(reject, new Error('Tühi päringu sisu.'));
        return;
      }
      try {
        settle(resolve, JSON.parse(raw));
      } catch (err) {
        settle(reject, err instanceof Error ? err : new Error(String(err)));
      }
    }

    function onError(err) {
      settle(reject, err);
    }

    req.on('data', onData);
    req.on('end', onEnd);
    req.on('error', onError);
  });
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
    const tooLarge = err instanceof Error && /** @type {any} */ (err).statusCode === 413;
    const isClient = message.startsWith('Oodatud JSON') || message.includes('kohustuslik');
    const status = tooLarge ? 413 : isClient ? 400 : isTimeout ? 504 : 502;
    const error = isTimeout
      ? 'AI vastus võttis liiga kaua. Proovi lühemat küsimust või proovi mõne aja pärast uuesti.'
      : message;
    if (!res.writableEnded) {
      if (tooLarge) res.setHeader('Connection', 'close');
      sendJson(res, status, { error });
    }
    // Ülemäärane keha jäi lugemata — sulge ühendus alles pärast vastuse saatmist.
    if (tooLarge) res.on('finish', () => req.destroy());
  }
}

/**
 * Failinimest ohutu ketta-nimi: ainult baasnimi, ilma teeradade ja imelike märkideta.
 * @param {unknown} raw
 * @returns {string}
 */
function safeFileName(raw) {
  // Päises tuleb nimi URL-kodeeritult (päised lubavad ainult latin-1).
  let decoded = String(raw || '');
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    // vigane kodeering — kasuta toorest väärtust
  }

  const base = decoded.split(/[\\/]/).pop();

  return (base || '')
    .normalize('NFC')
    .replace(/[^\p{L}\p{N}._ -]/gu, '_')
    .replace(/\s+/g, ' ')
    .replace(/^[.\s]+/, '')
    .trim()
    .slice(0, 120)
    .trim();
}

/**
 * Vaba failitee — olemasolevat faili üle ei kirjuta, lisab -1, -2 …
 * @param {string} dir
 * @param {string} name
 */
function freePath(dir, name) {
  const ext = extname(name);
  const stem = basename(name, ext);
  let candidate = name;
  let i = 1;
  while (existsSync(join(dir, candidate))) {
    candidate = `${stem}-${i}${ext}`;
    i += 1;
  }
  return join(dir, candidate);
}

/**
 * Voog, mis katkestab liiga suure faili enne ketale kirjutamist.
 * @param {number} max
 */
function limitBytes(max) {
  let total = 0;
  return new Transform({
    transform(chunk, _enc, cb) {
      total += chunk.length;
      if (total > max) {
        const err = new Error(`Fail on liiga suur (piir ${Math.round(max / 1048576)} MB).`);
        /** @type {any} */ (err).statusCode = 413;
        cb(err);
        return;
      }
      cb(null, chunk);
    }
  });
}

/**
 * Failide üleslaadimine serverisse (kausta upload/).
 * Kaitstud võtmega: päis x-upload-key peab klappima UPLOAD_KEY-ga .env failis.
 * @param {import('node:http').IncomingMessage} req
 * @param {import('node:http').ServerResponse} res
 */
async function handleUpload(req, res) {
  const url = new URL(req.url || '/', 'http://localhost');
  const pathname = decodeURIComponent(url.pathname);

  const expected = (process.env.UPLOAD_KEY || '').trim();
  if (!expected) {
    sendJson(res, 503, {
      error: 'Üleslaadimine pole seadistatud — serveri .env failis puudub UPLOAD_KEY.'
    });
    return;
  }
  if (String(req.headers['x-upload-key'] || '') !== expected) {
    sendJson(res, 401, { error: 'Vale või puuduv võti.' });
    return;
  }

  if (req.method === 'GET' && pathname === `${BASE}/api/upload/list`) {
    const entries = await readdir(UPLOAD_DIR, { withFileTypes: true }).catch(() => []);
    const files = [];
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const info = await stat(join(UPLOAD_DIR, entry.name)).catch(() => null);
      if (!info) continue;
      files.push({ name: entry.name, size: info.size, modifiedAt: info.mtime.toISOString() });
    }
    files.sort((a, b) => b.modifiedAt.localeCompare(a.modifiedAt));
    sendJson(res, 200, { dir: 'upload/', files });
    return;
  }

  if (req.method !== 'POST' || pathname !== `${BASE}/api/upload`) {
    sendJson(res, 404, { error: 'Not found' });
    return;
  }

  const name = safeFileName(req.headers['x-filename']);
  if (!name) {
    sendJson(res, 400, { error: 'Puudub või vigane failinimi (päis x-filename).' });
    return;
  }

  const declared = Number(req.headers['content-length'] || 0);
  if (declared > MAX_UPLOAD_BYTES) {
    res.setHeader('Connection', 'close');
    sendJson(res, 413, {
      error: `Fail on liiga suur (piir ${Math.round(MAX_UPLOAD_BYTES / 1048576)} MB).`
    });
    res.on('finish', () => req.destroy());
    return;
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const target = freePath(UPLOAD_DIR, name);

  try {
    await pipeline(req, limitBytes(MAX_UPLOAD_BYTES), createWriteStream(target));
  } catch (err) {
    await rm(target, { force: true });
    const status = (err instanceof Error && /** @type {any} */ (err).statusCode) || 400;
    const message = err instanceof Error ? err.message : String(err);
    if (!res.writableEnded) {
      if (status === 413) res.setHeader('Connection', 'close');
      sendJson(res, status, { error: message });
    }
    if (status === 413) res.on('finish', () => req.destroy());
    return;
  }

  const info = await stat(target);
  console.log(`upload: upload/${basename(target)} (${info.size} B)`);
  sendJson(res, 201, {
    ok: true,
    name: basename(target),
    size: info.size,
    path: `upload/${basename(target)}`
  });
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

  if (pathname === `${BASE}/api/upload` || pathname.startsWith(`${BASE}/api/upload/`)) {
    await handleUpload(req, res);
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
