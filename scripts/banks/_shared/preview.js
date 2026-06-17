import { buildAdvisorWidgetHtml } from './advisor-widget.js';
import fs from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __previewDir = dirname(fileURLToPath(import.meta.url));
/** @type {string} */
const BANK_LOGOS_DIR = join(__previewDir, '../../../static/banks/logos');

/**
 * @param {string} value
 */
export function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/**
 * @param {number | null | undefined} rate
 */
export function formatRate(rate) {
  if (rate == null) return '—';
  return `${rate.toLocaleString('et-EE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
}

/**
 * @param {number | null | undefined} cents
 */
export function formatFee(cents) {
  if (cents == null) return '—';
  if (cents === 0) return 'tasuta';
  return `${(cents / 100).toLocaleString('et-EE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
}

/**
 * @param {import('./util.js').CollectResult} data
 */
export function buildBankPreviewHtml(data) {
  const fetchedLocal = new Date(data.fetchedAt).toLocaleString('et-EE');
  const deposits = data.rows.filter((row) => row.product_type === 'deposit');
  const accounts = data.rows.filter((row) => row.product_type === 'account');
  const fees = data.rows.filter((row) => row.product_type === 'fee');

  const rowHtml = (rows) =>
    rows
      .map(
        (row) => `<tr>
          <td>${escapeHtml(row.label)}</td>
          <td class="rate">${formatRate(row.rate_percent)}</td>
          <td>${formatFee(row.fee_cents)}</td>
          <td><a href="${escapeHtml(row.source_url)}">allikas</a></td>
        </tr>`
      )
      .join('\n');

  const sourcesHtml = data.sources
    .map(
      (source) =>
        `<li><strong>${escapeHtml(source.kind)}</strong>: <a href="${escapeHtml(source.url)}">${escapeHtml(source.url)}</a> — ${escapeHtml(source.note)}</li>`
    )
    .join('\n');

  const warningsHtml = data.warnings.length
    ? `<section class="warn"><h2>Märkused</h2><ul>${data.warnings.map((w) => `<li>${escapeHtml(w)}</li>`).join('')}</ul></section>`
    : '';

  return `<!DOCTYPE html>
<html lang="et">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(data.bankName)} — avaliku info kogumine</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f4f6f8;
      --card: #fff;
      --text: #1a2332;
      --muted: #5c6b7a;
      --accent: #1e5a8a;
      --accent-soft: #e8f1f8;
      --border: #d8e0e8;
      --positive: #1b7f4a;
      --warn-bg: #fff8e6;
      --warn-border: #e8c96a;
      font-family: 'Segoe UI', system-ui, sans-serif;
      line-height: 1.5;
      color: var(--text);
      background: var(--bg);
    }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 1.5rem; }
    .wrap { max-width: 960px; margin: 0 auto; }
    h1 { margin: 0 0 0.35rem; }
    .lead { color: var(--muted); margin: 0 0 1rem; }
    .meta { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
    .pill { background: var(--accent-soft); color: var(--accent); border: 1px solid var(--border); border-radius: 999px; padding: 0.3rem 0.8rem; font-size: 0.9rem; }
    section { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 1.1rem; margin-bottom: 1rem; }
    section.warn { background: var(--warn-bg); border-color: var(--warn-border); }
    h2 { margin: 0 0 0.75rem; font-size: 1.05rem; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 0.55rem 0.45rem; border-bottom: 1px solid var(--border); vertical-align: top; }
    th { color: var(--muted); font-size: 0.85rem; }
    .rate { color: var(--positive); font-weight: 700; }
    a { color: var(--accent); }
    .back { display: inline-block; margin-bottom: 1rem; }
    .bank-header { display: flex; align-items: center; gap: 0.85rem; margin-bottom: 0.35rem; }
    .bank-logo { max-height: 40px; max-width: 180px; object-fit: contain; }
    ul { margin: 0; padding-left: 1.2rem; }
  </style>
</head>
<body>
  <div class="wrap">
    <a class="back" href="/banks/">← kõik pangad</a>
    <div class="bank-header">
      <img class="bank-logo" src="${escapeHtml(bankLogoSrc(data.slug))}" alt="${escapeHtml(data.bankName)}" width="160" height="40" />
      <h1>${escapeHtml(data.bankName)}</h1>
    </div>
    <p class="lead">Avalikult kogutud intressid ja viited hinnakirjadele.</p>
    <div class="meta">
      <span class="pill">Kogutud: ${escapeHtml(fetchedLocal)}</span>
      <span class="pill">${data.rows.length} rida</span>
    </div>
    ${warningsHtml}
    <section>
      <h2>Allikad</h2>
      <ul>${sourcesHtml}</ul>
    </section>
    ${
      deposits.length
        ? `<section><h2>Hoiused</h2><table><thead><tr><th>Toode</th><th>Intress</th><th>Tasu</th><th>Allikas</th></tr></thead><tbody>${rowHtml(deposits)}</tbody></table></section>`
        : ''
    }
    ${
      accounts.length
        ? `<section><h2>Arvelduskontod</h2><table><thead><tr><th>Toode</th><th>Intress</th><th>Tasu</th><th>Allikas</th></tr></thead><tbody>${rowHtml(accounts)}</tbody></table></section>`
        : ''
    }
    ${
      fees.length
        ? `<section><h2>Tasud / hinnakirjad</h2><table><thead><tr><th>Kirje</th><th>Intress</th><th>Tasu</th><th>Allikas</th></tr></thead><tbody>${rowHtml(fees)}</tbody></table></section>`
        : ''
    }
  </div>
</body>
</html>`;
}

/** @type {Record<string, 'svg' | 'png'>} */
const BANK_LOGO_EXT = {
  citadele: 'png',
  wise: 'png',
  bigbank: 'png',
  iutecredit: 'png'
};

/**
 * @param {string} slug
 */
export function bankLogoSrc(slug) {
  const ext = BANK_LOGO_EXT[slug] || 'svg';
  return `/banks/logos/${slug}.${ext}`;
}

/**
 * @param {string} slug
 * @returns {string | null} Logo filename when present under static/banks/logos.
 */
export function resolveBankLogoFile(slug) {
  const ext = BANK_LOGO_EXT[slug] || 'svg';
  const fileName = `${slug}.${ext}`;
  if (fs.existsSync(join(BANK_LOGOS_DIR, fileName))) {
    return fileName;
  }
  return null;
}

/**
 * @param {import('./util.js').CollectResult} bank
 * @returns {string}
 */
function buildBankCardMarkup(bank) {
  const href = `/banks/${bank.slug}/`;
  const logoFile = resolveBankLogoFile(bank.slug);
  if (logoFile) {
    return `<article class="card">
  <a href="${escapeHtml(href)}" class="card-logo-link"><img src="/banks/logos/${escapeHtml(logoFile)}" alt="${escapeHtml(bank.bankName)}" class="card-logo"></a>
</article>`;
  }
  return `<article class="card">
  <a href="${escapeHtml(href)}" class="card-logo-link"><span class="card-logo-fallback">${escapeHtml(bank.bankName)}</span></a>
</article>`;
}

/**
 * @param {import('./util.js').CollectResult[]} all
 */
export function buildBanksIndexHtml(all) {
  const cards = all.map((bank) => buildBankCardMarkup(bank)).join('\n');

  return `<!DOCTYPE html>
<html lang="et">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Pankade avalik info</title>
  <style>
    :root { --bg:#f4f6f8; --card:#fff; --text:#1a2332; --muted:#5c6b7a; --accent:#1e5a8a; --border:#d8e0e8; font-family:'Segoe UI',system-ui,sans-serif; color:var(--text); background:var(--bg); }
    body { margin:0; padding:1.5rem; }
    .wrap { max-width: 960px; margin: 0 auto; }
    h1 { margin: 0 0 0.5rem; }
    .lead { color: var(--muted); }
    .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:1.25rem; margin-top:1.5rem; }
    .card { background:var(--card); border:1px solid var(--border); border-radius:14px; min-height:120px; padding:1.5rem; display:flex; align-items:center; justify-content:center; }
    .card-logo-link { display:flex; align-items:center; justify-content:center; width:100%; min-height:72px; text-decoration:none; }
    .card-logo-link:hover { text-decoration:none; }
    .card-logo-link:hover .card-logo { opacity:0.85; }
    .card-logo { display:block; max-width:100%; max-height:44px; width:auto; height:auto; object-fit:contain; object-position:center center; margin:0 auto; }
    .card-logo-fallback { display:block; font-size:1.05rem; font-weight:700; color:var(--text); text-align:center; line-height:1.25; }
    a { color:var(--accent); text-decoration:none; }
    a:hover { text-decoration:underline; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Pankade avalik info</h1>
    <p class="lead">Kogutud <code>npm run collect-rates</code> skriptiga. Vali pank.</p>
    <div class="grid">${cards}</div>
  </div>
  ${buildAdvisorWidgetHtml()}
</body>
</html>`;
}
