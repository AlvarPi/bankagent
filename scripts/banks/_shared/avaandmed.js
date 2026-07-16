// Eesti riigi avaandmete portaal (andmed.eesti.ee) — nõustaja tööriistad.
// Avalik legacy REST-API, võtit ei vaja:
//   GET /api/datasets?search=<q>&limit=   -> otsing (id + title)
//   GET /api/datasets/{id}                -> files[] (titleEt, format, accessUrls[])
//   fail: accessUrls[0]                   -> päris andmed (JSON/CSV)
// Mudel annab ainult dataset-id + faili-indeksi (mitte suvalise URL-i) → fetch
// piirdub portaali avaldatud URL-idega + privaatvõrgu-kaitse (SSRF).

const API = 'https://andmed.eesti.ee/api';
const UA = 'bankagent-avaandmed/1.0';
const MAX_BYTES = 12_000;

/**
 * @param {string} url
 * @param {number} [timeoutMs]
 */
async function getJson(url, timeoutMs = 15_000) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), timeoutMs);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' }, signal: c.signal });
    if (!res.ok) throw new Error(`${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

/**
 * SSRF-kaitse: luba ainult https ja mitte privaat-/loopback-hostid.
 * @param {string} raw
 */
function isSafeUrl(raw) {
  let u;
  try {
    u = new URL(raw);
  } catch {
    return false;
  }
  if (u.protocol !== 'https:') return false;
  const host = u.hostname.toLowerCase();
  if (host === 'localhost' || host.endsWith('.local') || host.endsWith('.internal')) return false;
  if (/^(127\.|10\.|192\.168\.|169\.254\.|::1$|fc|fd)/.test(host)) return false;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(host)) return false;
  return true;
}

/**
 * @param {string} query
 * @param {number} [limit]
 */
export async function searchDatasets(query, limit = 8) {
  const url = `${API}/datasets?search=${encodeURIComponent(query)}&limit=${Math.min(Number(limit) || 8, 20)}`;
  const d = await getJson(url);
  const items = Array.isArray(d?.data) ? d.data : [];
  return items.map((x) => ({
    id: x.id || x.dct_identifier,
    title: x.title || x.dct_titleEt || x.titleEt || '(pealkiri puudub)',
    publisher: x.organization?.name || x.dct_publisher || null,
    description: (x.description || x.dct_description || '').slice(0, 240) || null
  }));
}

/**
 * @param {string} id
 */
export async function getDataset(id) {
  const d = await getJson(`${API}/datasets/${encodeURIComponent(id)}`);
  const x = d?.data || d;
  const files = Array.isArray(x?.files) ? x.files : [];
  return {
    id: x.id || id,
    title: x.title || x.dct_titleEt || '(pealkiri puudub)',
    description: (x.description || x.dct_description || '').slice(0, 500) || null,
    landingPage: x.landingPage || x.dcat_landingPage || null,
    files: files.map((f, i) => ({
      index: i,
      title: f.titleEt || f.titleEn || f.title || `fail ${i}`,
      format: f.format || null,
      byteSize: f.byteSize || null,
      restricted: Boolean(f.restricted),
      accessUrl: Array.isArray(f.accessUrls) && f.accessUrls[0] ? f.accessUrls[0] : null
    }))
  };
}

/**
 * Tõmbab dataseti faili sisu (kärbitud). URL võetakse portaali enda kirjest,
 * mitte mudeli sisendist.
 * @param {string} id
 * @param {number} fileIndex
 */
export async function fetchDatasetFile(id, fileIndex = 0) {
  const ds = await getDataset(id);
  const file = ds.files[Number(fileIndex) || 0];
  if (!file) return { error: `Failindeks ${fileIndex} puudub (${ds.files.length} faili).` };
  if (file.restricted) return { error: 'Fail on piiratud juurdepääsuga.' };
  if (!file.accessUrl) return { error: 'Failil puudub avalik allalaadimis-URL.' };
  if (!isSafeUrl(file.accessUrl)) return { error: `URL pole lubatud: ${file.accessUrl}` };

  const c = new AbortController();
  const t = setTimeout(() => c.abort(), 15_000);
  try {
    const res = await fetch(file.accessUrl, { headers: { 'User-Agent': UA }, signal: c.signal });
    if (!res.ok) return { error: `Allikas vastas ${res.status}` };
    const text = (await res.text()).slice(0, MAX_BYTES);
    return { title: file.title, format: file.format, url: file.accessUrl, truncated: text.length >= MAX_BYTES, content: text };
  } catch (err) {
    return { error: `Tõmbamine ebaõnnestus: ${err instanceof Error ? err.message : err}` };
  } finally {
    clearTimeout(t);
  }
}

/** Anthropic tool-definitsioonid. */
export const AVAANDMED_TOOLS = [
  {
    name: 'search_avaandmed',
    description:
      'Otsi Eesti riigi avaandmete portaalist (andmed.eesti.ee) andmestikke märksõna järgi. Tagastab andmestike nimekirja (id, pealkiri, avaldaja). Kasuta, kui kasutaja küsib riiklikke/registri-/statistika-andmeid (rahvastik, ettevõtted, majandus, tervis vms).',
    input_schema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Otsingu märksõna eesti keeles, nt "rahvastik" või "äriregister"' },
        limit: { type: 'integer', description: 'Mitu tulemust (vaikimisi 8, max 20)' }
      },
      required: ['query']
    }
  },
  {
    name: 'get_avaandmed_dataset',
    description:
      'Vaata avaandmete andmestiku detaile: kirjeldus + failide loend (pealkiri, formaat, indeks). Kasuta pärast search_avaandmed, et näha, millised failid on saadaval.',
    input_schema: {
      type: 'object',
      properties: { id: { type: 'string', description: 'Andmestiku id search_avaandmed tulemusest' } },
      required: ['id']
    }
  },
  {
    name: 'fetch_avaandmed_file',
    description:
      'Tõmba avaandmete andmestiku faili sisu (kärbitud ~12 kB). Anna andmestiku id ja faili indeks (get_avaandmed_dataset loendist). Tagastab JSON/CSV teksti analüüsiks.',
    input_schema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Andmestiku id' },
        file_index: { type: 'integer', description: 'Faili indeks (vaikimisi 0)' }
      },
      required: ['id']
    }
  }
];

/**
 * @param {string} name
 * @param {Record<string, unknown>} input
 * @returns {Promise<string>}
 */
export async function runAvaandmedTool(name, input) {
  try {
    if (name === 'search_avaandmed') {
      return JSON.stringify(await searchDatasets(String(input.query || ''), Number(input.limit) || 8));
    }
    if (name === 'get_avaandmed_dataset') {
      return JSON.stringify(await getDataset(String(input.id || '')));
    }
    if (name === 'fetch_avaandmed_file') {
      return JSON.stringify(await fetchDatasetFile(String(input.id || ''), Number(input.file_index) || 0));
    }
    return JSON.stringify({ error: `Tundmatu tööriist: ${name}` });
  } catch (err) {
    return JSON.stringify({ error: err instanceof Error ? err.message : String(err) });
  }
}
