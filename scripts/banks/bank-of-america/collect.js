/**
 * @param {string} text
 * @param {string} regionLabel
 * @returns {Array<{ label: string; rate_percent: number; tier?: string }>}
 */
export function parseBoaPdfText(text, regionLabel) {
  /** @type {Array<{ label: string; rate_percent: number; tier?: string }>} */
  const rows = [];
  const suffix = regionLabel ? ` (${regionLabel})` : '';

  /**
   * @param {string} label
   * @param {string} chunk
   * @param {RegExp} pattern
   */
  function addFromPattern(label, chunk, pattern) {
    const match = chunk.match(pattern);
    if (!match) return;
    rows.push({
      label: `${label}${suffix}`,
      rate_percent: Number(match[1]),
      tier: label.includes('Advantage Savings') ? 'Less than $5,000' : 'Less than $10,000'
    });
  }

  const tierApy =
    /Less than \$10,000\s+[0-9.]+%\s+([0-9.]+)%/;

  addFromPattern(
    'Advantage Savings APY',
    text,
    /Bank of America Advantage Savings[\s\S]*?Less than \$5,000\s+[0-9.]+%\s+([0-9.]+)%/
  );

  const flexibleChunk = text.split('Flexible CD & IRA CD')[1]?.split('Featured CD')[0] || '';
  addFromPattern('Flexible CD 12 month APY', flexibleChunk, new RegExp(`12 Month Term[\\s\\S]*?${tierApy.source}`));

  const featuredChunk = text.split('Featured CD & IRA CD')[1]?.split('Fixed Term CD')[0] || '';
  const featuredApys = [...featuredChunk.matchAll(/Less than \$10,000\s+[0-9.]+%\s+([0-9.]+)%/g)].map(
    (match) => Number(match[1])
  );
  for (const [index, term] of ['7', '10', '13', '25', '37'].entries()) {
    if (featuredApys[index] == null) continue;
    rows.push({
      label: `Featured CD ${term} month APY${suffix}`,
      rate_percent: featuredApys[index],
      tier: 'Less than $10,000'
    });
  }

  addFromPattern(
    'Fixed term CD 90–179 days APY',
    text,
    /90 - 179 Days\*\*\s+[0-9.]+%\s+([0-9.]+)%/
  );

  return rows;
}

/**
 * @param {string} text
 */
export function parseBoaEffectiveDate(text) {
  return text.match(/Effective as of:\s*(.+)/i)?.[1]?.trim() || null;
}

/**
 * @param {string} text
 */
export function parseBoaRegionLabel(text) {
  const line = text.match(/([^\n]+Consumer & Business Online Rates)/i)?.[1];
  if (!line) return null;
  return line.replace(/\s*Consumer & Business Online Rates.*/i, '').trim();
}
