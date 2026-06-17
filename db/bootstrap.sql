-- Käivita superuserina (kohanda parool vajadusel):
--   psql -f db/bootstrap.sql
--
-- Seejärel rakenduse kasutajaga:
--   psql "$DATABASE_URL" -f db/schema.sql

CREATE USER pankad_user WITH PASSWORD 'change_me';
CREATE DATABASE pankade_teenused OWNER pankad_user;
GRANT ALL PRIVILEGES ON DATABASE pankade_teenused TO pankad_user;
