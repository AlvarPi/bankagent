import { escapeHtml, formatFee, formatRate } from '../_shared/preview.js';
import { COOP_CATALOG } from './catalog.js';

/**
 * @param {import('../_shared/util.js').CollectResult} data
 */
export function buildCoopPreviewHtml(data) {
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

  const catalogHtml = COOP_CATALOG.map((section) => {
    const itemsHtml = section.items
      .map((item) => {
        const title = item.url
          ? `<a href="${escapeHtml(item.url)}">${escapeHtml(item.name)}</a>`
          : escapeHtml(item.name);
        const rates =
          item.rates?.length ?
            `<ul class="item-rates">${item.rates.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>`
          : '';
        const details =
          item.details?.length ?
            `<ul class="item-details">${item.details.map((d) => `<li>${escapeHtml(d)}</li>`).join('')}</ul>`
          : '';
        return `<article class="item">
          <h3>${title}</h3>
          <p>${escapeHtml(item.summary)}</p>
          ${rates}
          ${details}
        </article>`;
      })
      .join('\n');

    return `<section>
      <h2>${escapeHtml(section.title)}</h2>
      <div class="items">${itemsHtml}</div>
    </section>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="et">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Coop Pank — avalik info</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f4f6f8;
      --card: #fff;
      --text: #1a2332;
      --muted: #5c6b7a;
      --accent: #1e494d;
      --accent-soft: #eaf6ec;
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
    h3 { margin: 0 0 0.35rem; font-size: 1rem; }
    .items { display: grid; gap: 0.85rem; }
    .item { border-top: 1px solid var(--border); padding-top: 0.85rem; }
    .item:first-child { border-top: 0; padding-top: 0; }
    .item p { margin: 0.25rem 0 0.5rem; color: var(--muted); }
    ul { margin: 0; padding-left: 1.2rem; }
    ul.item-rates li { color: var(--positive); font-weight: 600; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 0.55rem 0.45rem; border-bottom: 1px solid var(--border); vertical-align: top; }
    th { color: var(--muted); font-size: 0.85rem; }
    .rate { color: var(--positive); font-weight: 700; }
    a { color: var(--accent); }
    .back { display: inline-block; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <div class="wrap">
    <a class="back" href="/banks/">← kõik pangad</a>
    <h1>Coop Pank</h1>
    <p class="lead">Avalikult kogutud intressid, tooted, laenud, kampaaniad ja teenused (cooppank.ee).</p>
    <div class="meta">
      <span class="pill">Kogutud: ${escapeHtml(fetchedLocal)}</span>
      <span class="pill">${data.rows.length} intressi/tasu rida</span>
    </div>
    ${warningsHtml}
    <section>
      <h2>Allikad</h2>
      <ul>${sourcesHtml}</ul>
    </section>
    ${
      deposits.length
        ? `<section><h2>Hoiused (kogutud)</h2><table><thead><tr><th>Toode</th><th>Intress</th><th>Tasu</th><th>Allikas</th></tr></thead><tbody>${rowHtml(deposits)}</tbody></table></section>`
        : ''
    }
    ${
      accounts.length
        ? `<section><h2>Arvelduskontod (kogutud)</h2><table><thead><tr><th>Toode</th><th>Intress</th><th>Tasu</th><th>Allikas</th></tr></thead><tbody>${rowHtml(accounts)}</tbody></table></section>`
        : ''
    }
    ${
      fees.length
        ? `<section><h2>Tasud / hinnakirjad (kogutud)</h2><table><thead><tr><th>Kirje</th><th>Intress</th><th>Tasu</th><th>Allikas</th></tr></thead><tbody>${rowHtml(fees)}</tbody></table></section>`
        : ''
    }
    ${catalogHtml}
  </div>
</body>
</html>`;
}
