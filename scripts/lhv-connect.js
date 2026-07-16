#!/usr/bin/env node
// Ühekordne LHV seemnendus (üks kasutaja). Vt [[lhv-mcp]].
//   node scripts/lhv-connect.js start        -> väljastab LHV login-URL-i
//   node scripts/lhv-connect.js finish "<callback-url või code>"  -> vahetab koodi tokeniteks
//   node scripts/lhv-connect.js test         -> proovib REST-i (kontod + kontekst)
//   node scripts/lhv-connect.js revoke       -> tühistab ligipääsu LHV-s
import 'dotenv/config';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { webcrypto as crypto } from 'node:crypto';
import {
  LHV,
  exchangeAuthCode,
  writeTokenFile,
  fetchAccounts,
  buildLhvContext,
  revokeLhv
} from './banks/_shared/lhv.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PENDING_FILE = join(__dirname, '..', '.lhv-pending.json');

function b64url(bytes) {
  return Buffer.from(bytes).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function pkce() {
  const verifier = b64url(crypto.getRandomValues(new Uint8Array(32)));
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  return { verifier, challenge: b64url(new Uint8Array(digest)) };
}

async function start() {
  const { verifier, challenge } = await pkce();
  const state = b64url(crypto.getRandomValues(new Uint8Array(16)));
  await writeFile(PENDING_FILE, JSON.stringify({ code_verifier: verifier, state }, null, 2), { mode: 0o600 });

  const url = new URL(`${LHV.authBase}/oauth2/authorize`);
  url.search = new URLSearchParams({
    response_type: 'code',
    client_id: LHV.clientId,
    redirect_uri: LHV.redirectUri,
    scope: LHV.scope,
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
    resource: LHV.resource
  }).toString();

  console.log('\nAva see URL brauseris ja logi LHV-sse (Smart-ID):\n');
  console.log(url.toString());
  console.log(
    `\nPeale login'i suunab ${LHV.redirectUri} peale (leht ei pruugi laadida — normaalne).`
  );
  console.log('Kopeeri aadressiribalt kogu URL ja jooksuta:');
  console.log('  node scripts/lhv-connect.js finish "<callback-url>"\n');
}

async function finish(arg) {
  if (!arg) throw new Error('Anna callback-URL või code: node scripts/lhv-connect.js finish "<...>"');
  let pending;
  try {
    pending = JSON.parse(await readFile(PENDING_FILE, 'utf8'));
  } catch {
    throw new Error('Puudub .lhv-pending.json — jooksuta enne: node scripts/lhv-connect.js start');
  }

  let code = arg.trim();
  if (code.includes('code=')) {
    const u = new URL(code.includes('://') ? code : `http://localhost/?${code.replace(/^\?/, '')}`);
    const returnedState = u.searchParams.get('state');
    if (returnedState && returnedState !== pending.state) {
      throw new Error('State ei klapi — proovi start uuesti.');
    }
    code = u.searchParams.get('code') || '';
  }
  if (!code) throw new Error('Koodi ei leidnud sisendist.');

  const tokens = await exchangeAuthCode({ code, codeVerifier: pending.code_verifier });
  if (!tokens.refresh_token) {
    throw new Error(`Vastuses puudub refresh_token: ${JSON.stringify(tokens)}`);
  }
  await writeTokenFile({
    client_id: LHV.clientId,
    refresh_token: tokens.refresh_token,
    resource: LHV.resource,
    scope: tokens.scope || LHV.scope,
    obtained_at: new Date().toISOString()
  });
  await unlink(PENDING_FILE).catch(() => {});
  console.log('✓ LHV seemnendatud. refresh_token salvestatud .lhv-token.json-i.');
  console.log(`  access_token eluiga: ${tokens.expires_in}s, scope: ${tokens.scope || LHV.scope}`);
}

async function test() {
  const accounts = await fetchAccounts();
  console.log('Kontod:', JSON.stringify(accounts, null, 2));
  console.log('\n--- nõustaja kontekst (30 päeva) ---\n');
  console.log(await buildLhvContext(30));
}

async function revoke() {
  console.log('Revoke:', JSON.stringify(await revokeLhv()));
  await unlink(join(__dirname, '..', '.lhv-token.json')).catch(() => {});
  console.log('Lokaalne .lhv-token.json kustutatud.');
}

const cmd = process.argv[2];
const rest = process.argv.slice(3).join(' ');
const actions = { start, finish: () => finish(rest), test, revoke };
const action = actions[cmd];
if (!action) {
  console.log('Kasutus: node scripts/lhv-connect.js <start|finish|test|revoke>');
  process.exit(1);
}
action().catch((err) => {
  console.error('Viga:', err instanceof Error ? err.message : err);
  process.exit(1);
});
