// e-Äriregister (RIK) ettevõtte-otsing nõustajale.
// Avalik autocomplete-teenus, ILMA lepingu/par#oolita:
//   GET https://ariregister.rik.ee/est/api/autocomplete?q=<nimi või regkood>
// Tagastab nime, regkoodi, staatuse, aadressi, ajaloolised nimed, lingi.
// NB: sügavamad andmed (aruanded, juhatus, kasusaajad) vajavad RIK lepingut
// (SOAP-API ariregxmlv6.rik.ee) — pole siin liidestatud.

const AUTOCOMPLETE = 'https://ariregister.rik.ee/est/api/autocomplete';
const UA = 'bankagent-ariregister/1.0';

const STATUS = { R: 'registrisse kantud', L: 'likvideerimisel', N: 'kustutatud', K: 'kustutatud' };
const LEGAL_FORM = {
  '1': 'aktsiaselts (AS)',
  '2': 'osaühing (OÜ)',
  '10': 'välismaa äriühingu filiaal',
  '12': 'täisühing',
  '13': 'usaldusühing',
  '5': 'tulundusühistu',
  '9': 'füüsilisest isikust ettevõtja (FIE)'
};

/**
 * @param {string} query ettevõtte nimi või registrikood
 * @param {number} [limit]
 */
export async function lookupCompany(query, limit = 8) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), 15_000);
  try {
    const res = await fetch(`${AUTOCOMPLETE}?q=${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': UA, Accept: 'application/json' },
      signal: c.signal
    });
    if (!res.ok) return { error: `Äriregister vastas ${res.status}` };
    const json = await res.json();
    const items = Array.isArray(json?.data) ? json.data : [];
    return items.slice(0, Math.min(Number(limit) || 8, 20)).map((x) => ({
      name: x.name,
      regCode: x.reg_code,
      status: STATUS[x.status] || x.status || null,
      legalForm: LEGAL_FORM[String(x.legal_form)] || x.legal_form || null,
      address: x.legal_address || null,
      historicalNames: Array.isArray(x.historical_names) && x.historical_names.length ? x.historical_names : undefined,
      url: x.url || null
    }));
  } catch (err) {
    return { error: `Äriregistri päring ebaõnnestus: ${err instanceof Error ? err.message : err}` };
  } finally {
    clearTimeout(t);
  }
}

/** Anthropic tool-definitsioon. */
export const ARIREGISTER_TOOLS = [
  {
    name: 'lookup_ariregister',
    description:
      'Otsi Eesti e-äriregistrist ettevõtet nime või registrikoodi järgi (avalik andmestik). Tagastab ettevõtte nime, registrikoodi, staatuse, õigusliku vormi, aadressi ja lingi. Kasuta, kui kasutaja küsib konkreetse ettevõtte kohta (nt "kes on registrikood X", "leia ettevõte Y", "mis aadressil on Z"). Sügavamad andmed (aruanded, juhatus) siin puuduvad.',
    input_schema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Ettevõtte nimi või registrikood' },
        limit: { type: 'integer', description: 'Mitu tulemust (vaikimisi 8, max 20)' }
      },
      required: ['query']
    }
  }
];

/**
 * @param {string} name
 * @param {Record<string, unknown>} input
 * @returns {Promise<string>}
 */
export async function runAriregisterTool(name, input) {
  if (name === 'lookup_ariregister') {
    return JSON.stringify(await lookupCompany(String(input.query || ''), Number(input.limit) || 8));
  }
  return JSON.stringify({ error: `Tundmatu tööriist: ${name}` });
}
