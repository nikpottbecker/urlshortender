import Database from '@better-sqlite3/better-sqlite3';

const db = new Database('urls.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS urls (
    id TEXT PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_code TEXT UNIQUE NOT NULL,
    clicks INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export const insertUrl = (id, originalUrl, shortCode) => {
  const stmt = db.prepare(
    'INSERT INTO urls (id, original_url, short_code) VALUES (?, ?, ?)'
  );
  return stmt.run(id, originalUrl, shortCode);
};

export const findByShortCode = (shortCode) => {
  const stmt = db.prepare('SELECT * FROM urls WHERE short_code = ?');
  return stmt.get(shortCode);
};

export const incrementClicks = (shortCode) => {
  const stmt = db.prepare(
    'UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?'
  );
  return stmt.run(shortCode);
};

export default db;