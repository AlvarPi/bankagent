-- Isiklik rahanduse DB: kontod, tehingud, avalike tingimuste snapshotid.

BEGIN;

CREATE TABLE IF NOT EXISTS banks (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  website TEXT
);

INSERT INTO banks (slug, name, website) VALUES
  ('swedbank', 'Swedbank', 'https://www.swedbank.ee'),
  ('seb', 'SEB', 'https://www.seb.ee'),
  ('lhv', 'LHV', 'https://www.lhv.ee'),
  ('luminor', 'Luminor', 'https://www.luminor.ee'),
  ('coop', 'Coop Pank', 'https://www.cooppank.ee'),
  ('citadele', 'Citadele', 'https://www.citadele.ee'),
  ('wise', 'Wise', 'https://wise.com/ee'),
  ('bank-of-america', 'Bank of America', 'https://www.bankofamerica.com'),
  ('holm', 'Holm Bank', 'https://www.holmbank.ee'),
  ('bigbank', 'Bigbank', 'https://www.bigbank.ee'),
  ('iutecredit', 'IuteCredit', 'https://iute.com/et'),
  ('morgan-stanley', 'Morgan Stanley', 'https://www.morganstanley.com'),
  ('nordea', 'Nordea', 'https://www.nordea.com/en')
ON CONFLICT (slug) DO NOTHING;

CREATE TABLE IF NOT EXISTS accounts (
  id SERIAL PRIMARY KEY,
  bank_slug TEXT REFERENCES banks (slug),
  label TEXT NOT NULL,
  iban TEXT,
  currency TEXT NOT NULL DEFAULT 'EUR',
  balance_cents BIGINT NOT NULL DEFAULT 0,
  source TEXT NOT NULL DEFAULT 'manual',
  external_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  account_id INTEGER NOT NULL REFERENCES accounts (id) ON DELETE CASCADE,
  booked_at DATE NOT NULL,
  amount_cents BIGINT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  description TEXT,
  counterparty TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transactions_account_booked
  ON transactions (account_id, booked_at DESC);

CREATE TABLE IF NOT EXISTS public_rate_snapshots (
  id SERIAL PRIMARY KEY,
  bank_slug TEXT NOT NULL REFERENCES banks (slug),
  product_type TEXT NOT NULL,
  label TEXT NOT NULL,
  rate_percent NUMERIC(8, 4),
  fee_cents BIGINT,
  raw_text TEXT,
  source_url TEXT NOT NULL,
  scraped_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_public_rates_bank_scraped
  ON public_rate_snapshots (bank_slug, product_type, scraped_at DESC);

COMMIT;
