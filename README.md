# Pankade teenused

Isiklik rahanduse vaade: mitme panga ülevaade, tehingud ja avalike tingimuste võrdlus.

**Ei ole pank** — ainult sinu enda andmed (CSV / tulevikus GoCardless PSD2) + avalikult lehtedelt kogutud intressid/tasud.

## Funktsioonid (v1)

| Moodul | Kirjeldus |
|--------|-----------|
| **Ülevaade** | kogusaldo, viimased tehingud |
| **Kontod** | käsitsi / CSV / (hiljem) GoCardless ühendatud kontod |
| **Tehingud** | imporditud liikumised |
| **Tingimuste võrdlus** | agent kogub avalikke intresse (`npm run collect-rates`) |

## Käivitus

```bash
cd /home/ubuntu/pankade-teenused
cp .env.example .env
# muuda DATABASE_URL

# PostgreSQL (üks kord)
sudo -u postgres psql -f db/bootstrap.sql
psql "$DATABASE_URL" -f db/schema.sql

npm install
npm run dev
```

Ava brauser: `http://localhost:5173`

## Agent (avalik info)

```bash
npm run collect-rates
```

Skript `scripts/collect-public-rates.js` — praegu seed + URL-id; järgmine samm on Playwright parse pangalehtedelt.

## Järgmised sammud

1. CSV import internetipanga ekspordist
2. GoCardless Bank Account Data (oma kontod PSD2 kaudu)
3. Päris scrape agent pangateenuste avalikele lehtedele

## Stack

SvelteKit · Node · PostgreSQL · class-based CSS (ei Tailwind)
