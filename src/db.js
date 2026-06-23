const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS meals (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS ingredients (
      id SERIAL PRIMARY KEY,
      meal_id INTEGER REFERENCES meals(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      quantity TEXT,
      category TEXT DEFAULT 'Other'
    );

    CREATE TABLE IF NOT EXISTS week_plan (
      id SERIAL PRIMARY KEY,
      week_start DATE NOT NULL,
      day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
      meal_id INTEGER REFERENCES meals(id) ON DELETE SET NULL,
      custom_label TEXT,
      UNIQUE(week_start, day_of_week)
    );

    CREATE TABLE IF NOT EXISTS staples (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT DEFAULT 'Other',
      is_low BOOLEAN DEFAULT FALSE,
      sort_order INTEGER DEFAULT 0
    );
  `);
}

module.exports = { pool, init };
