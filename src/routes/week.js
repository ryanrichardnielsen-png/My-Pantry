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
  const { rows } = await pool.query(
    `SELECT wp.day_of_week, wp.meal_slot, wp.custom_label, wp.meal_id,
            m.name AS meal_name, m.notes AS meal_notes, m.method AS meal_method,
            json_agg(i.* ORDER BY i.id) FILTER (WHERE i.id IS NOT NULL) AS ingredients
     FROM week_plan wp
     LEFT JOIN meals m ON m.id = wp.meal_id
     LEFT JOIN ingredients i ON i.meal_id = m.id
     WHERE wp.week_start = $1
     GROUP BY wp.day_of_week, wp.meal_slot, wp.custom_label, wp.meal_id, m.name, m.notes, m.method
     ORDER BY wp.day_of_week, wp.meal_slot`,
    [weekStart]
  );
  res.json({ weekStart, days: rows });
});

router.put('/:day', async (req, res) => {
  const { meal_id, custom_label, week, meal_slot } = req.body;
  const weekStart = getWeekStart(week);
  const day = parseInt(req.params.day, 10);
  const slot = meal_slot || 'Dinner';
  await pool.query(
    `INSERT INTO week_plan (week_start, day_of_week, meal_slot, meal_id, custom_label)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (week_start, day_of_week, meal_slot)
     DO UPDATE SET meal_id=$4, custom_label=$5`,
    [weekStart, day, slot, meal_id || null, custom_label || null]
  );
  res.json({ ok: true });
});

router.delete('/:day', async (req, res) => {
  const weekStart = getWeekStart(req.query.week);
  const slot = req.query.slot;
  if (slot) {
    await pool.query(
      'DELETE FROM week_plan WHERE week_start=$1 AND day_of_week=$2 AND meal_slot=$3',
      [weekStart, req.params.day, slot]
    );
  } else {
    await pool.query(
      'DELETE FROM week_plan WHERE week_start=$1 AND day_of_week=$2',
      [weekStart, req.params.day]
    );
  }
  res.status(204).end();
});

module.exports = router;
