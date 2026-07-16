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
 * @param {{ sections?: Array<{ title: string, items: Array<{ name: string, summary?: string, url?: string, rates?: string[], details?: string[] }> }> } | null | undefined} catalog
 * @returns {string}
 */
function buildCatalogHtml(catalog) {
  const sections = catalog && Array.isArray(catalog.sections) ? catalog.sections : [];
  if (!sections.length) return '';

  const itemHtml = (item) => {
    const rates =
      item.rates && item.rates.length
        ? `<ul class="cat-rates">${item.rates.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>`
        : '';
    const details =
      item.details && item.details.length
        ? `<ul class="cat-details">${item.details.map((d) => `<li>${escapeHtml(d)}</li>`).join('')}</ul>`
        : '';
    const src = item.url ? ` <a class="cat-src" href="${escapeHtml(item.url)}" title="allikas">↗</a>` : '';
    const summary = item.summary ? `<p class="cat-summary">${escapeHtml(item.summary)}</p>` : '';
    return `<div class="cat-item"><h3>${escapeHtml(item.name)}${src}</h3>${summary}${rates}${details}</div>`;
  };

  const sectionHtml = sections
    .map(
      (section) =>
        `<section class="card"><h2>${escapeHtml(section.title)}</h2>${(section.items || []).map(itemHtml).join('')}</section>`
    )
    .join('\n');

  return `<p class="cat-lead">Tootekataloog</p>\n${sectionHtml}`;
}

/**
 * @param {import('./util.js').CollectResult} data
 * @param {{ sections?: Array<object> } | null} [catalog]
 */
export function buildBankPreviewHtml(data, catalog = null) {
  const fetchedLocal = new Date(data.fetchedAt).toLocaleString('et-EE');
  const deposits = data.rows.filter((row) => row.product_type === 'deposit');
  const accounts = data.rows.filter((row) => row.product_type === 'account');
  const fees = data.rows.filter((row) => row.product_type === 'fee');
  const catalogHtml = buildCatalogHtml(catalog);

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
    ? `<section class="card warn"><h2>Märkused</h2><ul>${data.warnings.map((w) => `<li>${escapeHtml(w)}</li>`).join('')}</ul></section>`
    : '';

  const tableSection = (title, rows, firstCol) =>
    rows.length
      ? `<section class="card"><h2>${title}</h2><table><thead><tr><th>${firstCol}</th><th>Intress</th><th>Tasu</th><th>Allikas</th></tr></thead><tbody>${rowHtml(rows)}</tbody></table></section>`
      : '';

  return `<!DOCTYPE html>
<html lang="et">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(data.bankName)} — avalik pangainfo | Finovo</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --teal:#1F4C50; --teal-dark:#0D2022; --green:#76FB8D; --lime-soft:#EAFEDB;
      --maroon:#581824; --ink:#14241F; --muted:#51625C; --bg:#FFFFFF; --soft:#F4F8F4;
      --line:#E3EAE5; --positive:#1b7f4a; --warn-bg:#fff8e6; --warn-border:#e8c96a;
    }
    * { box-sizing:border-box; }
    body { margin:0; font-family:"Poppins",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; color:var(--ink); background:var(--bg); line-height:1.5; }
    .container { max-width:1080px; margin:0 auto; padding:0 1.5rem; }
    a { color:var(--teal); }
    .site-header { position:sticky; top:0; z-index:70; background:rgba(31,76,80,.96); backdrop-filter:blur(8px); border-bottom:1px solid rgba(255,255,255,.08); }
    .nav { display:flex; align-items:center; gap:1.5rem; padding:.85rem 0; }
    .brand { display:inline-flex; align-items:center; gap:.55rem; }
    .brand-name { font-weight:800; color:#fff; font-size:1.3rem; letter-spacing:-.02em; line-height:1; }
    .nav-actions { margin-left:auto; }
    .back-link { display:inline-flex; align-items:center; gap:.45rem; padding:.5rem 1.1rem; border:1px solid rgba(255,255,255,.3); border-radius:999px; color:#dff3e6; font-weight:600; font-size:.92rem; transition:border-color .14s,color .14s; }
    .back-link:hover { border-color:var(--green); color:var(--green); }
    .hero { background:linear-gradient(180deg,var(--soft) 0%,#fff 75%); padding:2.5rem 0 1.75rem; }
    .hero-head { display:flex; align-items:center; gap:1rem; flex-wrap:wrap; }
    .hero-logo { max-height:52px; max-width:200px; object-fit:contain; }
    .hero h1 { font-weight:700; font-size:2rem; letter-spacing:-.02em; color:var(--maroon); margin:0; }
    .hero .lead { color:var(--muted); font-size:1.02rem; margin:.6rem 0 0; max-width:60ch; }
    .meta { display:flex; flex-wrap:wrap; gap:.5rem; margin-top:.9rem; }
    .pill { background:var(--lime-soft); color:var(--teal); border:1px solid var(--line); border-radius:999px; padding:.3rem .85rem; font-size:.85rem; font-weight:600; }
    .section { padding:1.75rem 0 3.5rem; }
    section.card { background:var(--bg); border:1px solid var(--line); border-radius:16px; padding:1.2rem 1.35rem; margin-bottom:1.1rem; box-shadow:0 4px 18px rgba(20,36,31,.05); }
    section.warn { background:var(--warn-bg); border-color:var(--warn-border); box-shadow:none; }
    h2 { margin:0 0 .8rem; font-size:1.08rem; color:var(--teal); }
    table { width:100%; border-collapse:collapse; }
    th, td { text-align:left; padding:.55rem .45rem; border-bottom:1px solid var(--line); vertical-align:top; }
    th { color:var(--muted); font-size:.82rem; font-weight:600; }
    .rate { color:var(--positive); font-weight:700; }
    ul { margin:0; padding-left:1.2rem; }
    .cat-lead { font-weight:700; font-size:1.25rem; color:var(--maroon); margin:1.5rem 0 .75rem; letter-spacing:-.01em; }
    .cat-item { padding:.6rem 0; border-bottom:1px solid var(--line); }
    .cat-item:last-child { border-bottom:0; }
    .cat-item h3 { margin:0 0 .25rem; font-size:.98rem; }
    .cat-summary { margin:0 0 .4rem; color:var(--muted); font-size:.92rem; }
    .cat-rates, .cat-details { margin:.2rem 0 .4rem; }
    .cat-rates li { font-size:.9rem; }
    .cat-details li { font-size:.88rem; color:var(--muted); }
    .cat-src { text-decoration:none; font-size:.9rem; }
    @media (max-width:560px){ .hero h1 { font-size:1.6rem; } }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="container nav">
      <a class="brand" href="https://genofin.ee/">
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#76FB8D"/><path d="M9 22V17M16 22V10M23 22V14" stroke="#0D2022" stroke-width="3.2" stroke-linecap="round"/></svg>
        <span class="brand-name">Finovo</span>
      </a>
      <div class="nav-actions">
        <a href="/banks/" class="back-link">&#8592; Kõik pangad</a>
      </div>
    </div>
  </header>
  <section class="hero">
    <div class="container">
      <div class="hero-head">
        <img class="hero-logo" src="${escapeHtml(bankLogoSrc(data.slug))}" alt="${escapeHtml(data.bankName)}" />
        <h1>${escapeHtml(data.bankName)}</h1>
      </div>
      <p class="lead">Avalikult kogutud tooteinfo, intressid ja hinnakirjad.</p>
      <div class="meta"><span class="pill">Uuendatud: ${escapeHtml(fetchedLocal)}</span></div>
    </div>
  </section>
  <div class="section">
    <div class="container">
      ${warningsHtml}
      <section class="card"><h2>Allikad</h2><ul>${sourcesHtml}</ul></section>
      ${tableSection('Hoiused', deposits, 'Toode')}
      ${tableSection('Arvelduskontod', accounts, 'Toode')}
      ${tableSection('Tasud / hinnakirjad', fees, 'Kirje')}
      ${catalogHtml}
    </div>
  </div>
</body>
</html>`;
}

/** @type {Record<string, 'svg' | 'png'>} */
const BANK_LOGO_EXT = {
  citadele: 'png',
  wise: 'png',
  bigbank: 'png',
  iutecredit: 'png',
  lightyear: 'png'
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
  <title>Pankade avalik info — Finovo</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --teal:#1F4C50; --teal-dark:#0D2022; --green:#76FB8D; --lime:#DDFDC4;
      --lime-soft:#EAFEDB; --maroon:#581824; --ink:#14241F; --muted:#51625C;
      --bg:#FFFFFF; --soft:#F4F8F4; --line:#E3EAE5;
    }
    * { box-sizing:border-box; }
    body { margin:0; font-family:"Poppins",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; color:var(--ink); background:var(--bg); }
    .container { max-width:1080px; margin:0 auto; padding:0 1.5rem; }
    a { color:var(--teal); text-decoration:none; }

    .site-header { position:sticky; top:0; z-index:70; background:rgba(31,76,80,.96); backdrop-filter:blur(8px); border-bottom:1px solid rgba(255,255,255,.08); }
    .nav { display:flex; align-items:center; gap:1.5rem; padding:.85rem 0; }
    .brand { display:inline-flex; align-items:center; gap:.55rem; }
    .brand-name { font-weight:800; color:#fff; font-size:1.3rem; letter-spacing:-.02em; line-height:1; }
    .nav-actions { margin-left:auto; }
    .back-link { display:inline-flex; align-items:center; gap:.45rem; padding:.5rem 1.1rem; border:1px solid rgba(255,255,255,.3); border-radius:999px; color:#dff3e6; font-weight:600; font-size:.92rem; transition:border-color .14s, color .14s; }
    .back-link:hover { border-color:var(--green); color:var(--green); }

    .hero { background:linear-gradient(180deg,var(--soft) 0%,#fff 75%); padding:3.5rem 0 2.5rem; }
    .eyebrow { display:inline-flex; align-items:center; gap:.5rem; background:var(--lime-soft); color:var(--teal); font-weight:600; font-size:.82rem; padding:.4rem .9rem; border-radius:999px; }
    .eyebrow .dot { width:7px; height:7px; border-radius:50%; background:var(--green); }
    .hero h1 { font-weight:700; font-size:2.4rem; line-height:1.12; letter-spacing:-.02em; color:var(--maroon); margin:1rem 0 .6rem; }
    .hero h1 .accent { color:var(--teal); }
    .hero .lead { color:var(--muted); font-size:1.12rem; line-height:1.5; max-width:56ch; margin:0; }

    .section { padding:2.5rem 0 4rem; }
    .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:1.1rem; }
    .card { background:var(--bg); border:1px solid var(--line); border-radius:16px; min-height:118px; padding:1.4rem; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 18px rgba(20,36,31,.05); transition:transform .14s, box-shadow .14s, border-color .14s; }
    .card:hover { transform:translateY(-3px); box-shadow:0 12px 28px rgba(31,76,80,.12); border-color:var(--green); }
    .card-logo-link { display:flex; align-items:center; justify-content:center; width:100%; min-height:72px; }
    .card-logo { display:block; max-width:100%; max-height:46px; width:auto; height:auto; object-fit:contain; object-position:center center; margin:0 auto; }
    .card-logo-fallback { display:block; font-size:1.05rem; font-weight:700; color:var(--ink); text-align:center; line-height:1.25; }

    @media (max-width:560px) { .hero h1 { font-size:1.9rem; } }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="container nav">
      <a class="brand" href="https://genofin.ee/">
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#76FB8D"/><path d="M9 22V17M16 22V10M23 22V14" stroke="#0D2022" stroke-width="3.2" stroke-linecap="round"/></svg>
        <span class="brand-name">Finovo</span>
      </a>
      <div class="nav-actions">
        <a href="https://genofin.ee/" class="back-link">&#8592; Tagasi genofin.ee</a>
      </div>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <span class="eyebrow"><span class="dot"></span> Avalik pangainfo</span>
      <h1>Pankade <span class="accent">avalik info</span></h1>
      <p class="lead">Kogutud Eesti pankade avalikest allikatest. Vali pank detailide nägemiseks — või küsi pangandusnõustajalt.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="grid">${cards}</div>
    </div>
  </section>
  ${buildAdvisorWidgetHtml()}
</body>
</html>`;
}
