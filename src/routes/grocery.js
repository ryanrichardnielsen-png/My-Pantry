const express = require('express');
const router = express.Router();
const { pool } = require('../db');

function getWeekStart(dateStr) {
  const d = dateStr ? new Date(dateStr) : new Date();
  const day = d.getUTCDay();
  const diff = d.getUTCDate() - day + (day === 0 ? -6 : 1);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), diff))
    .toISOString().slice(0, 10);
}

router.get('/', async (req, res) => {
  const weekStart = getWeekStart(req.query.week);

  const { rows: mealIngredients } = await pool.query(
    `SELECT i.name, i.quantity, i.category
     FROM week_plan wp
     JOIN meals m ON m.id = wp.meal_id
     JOIN ingredients i ON i.meal_id = m.id
     WHERE wp.week_start = $1
     ORDER BY i.category, i.name`,
    [weekStart]
  );

  const { rows: staples } = await pool.query(
    `SELECT name, category FROM staples WHERE is_low = TRUE ORDER BY category, name`
  );

  // Group by category
  const grouped = {};
  for (const row of [...mealIngredients, ...staples]) {
    const cat = row.category || 'Other';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push({ name: row.name, quantity: row.quantity || null });
  }

  res.json({ weekStart, categories: grouped });
});

module.exports = router;
