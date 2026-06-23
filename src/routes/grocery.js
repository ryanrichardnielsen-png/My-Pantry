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

  // Cooking measurements that don't translate to a purchase unit
  const cookingMeasures = /^(tbsp|tsp|cup|cups|tablespoon|teaspoon|pinch|dash|to taste|handful|splash|sprig|sprigs|clove|cloves|slice|slices|strip|strips)\b/i;

  function shoppingQty(quantity, category) {
    if (!quantity) return null;
    const q = quantity.trim();
    // Always strip pure cooking measurements
    if (cookingMeasures.test(q)) return null;
    // Strip quantities that start with a number then a cooking measure
    if (/^\d[\d\s/\.]*\s*(tbsp|tsp|cup|cups|tablespoon|teaspoon|pinch|dash|sprig|sprigs|clove|cloves)\b/i.test(q)) return null;
    // Strip "to taste" and similar
    if (/^to taste$/i.test(q)) return null;
    // Pantry items bought in bottles/jars — strip cooking amounts
    if (category === 'Pantry' && /^\d[\d\s/\.]*\s*(tbsp|tsp|cup|oz)\b/i.test(q)) return null;
    // Keep shopping units: lb, lbs, oz (package), can, pack, bunch, loaf, jar, bottle, bag, box, head, count
    return q;
  }

  // Deduplicate by name (case-insensitive), keeping first occurrence
  const seen = new Set();
  const grouped = {};
  for (const row of [...mealIngredients, ...staples]) {
    const key = row.name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    const cat = row.category || 'Other';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push({ name: row.name, quantity: shoppingQty(row.quantity, row.category) });
  }

  res.json({ weekStart, categories: grouped });
});

module.exports = router;
