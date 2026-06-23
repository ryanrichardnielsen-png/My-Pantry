const express = require('express');
const router = express.Router();
const { pool } = require('../db');

router.get('/', async (req, res) => {
  const { rows } = await pool.query(
    `SELECT m.*, json_agg(i.* ORDER BY i.id) FILTER (WHERE i.id IS NOT NULL) AS ingredients
     FROM meals m
     LEFT JOIN ingredients i ON i.meal_id = m.id
     GROUP BY m.id
     ORDER BY m.name`
  );
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { name, notes, method, source_url, servings, meal_category, ingredients } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { rows: [meal] } = await client.query(
      'INSERT INTO meals (name, notes, method, source_url, servings, meal_category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, notes || null, method || null, source_url || null, servings || 4, meal_category || 'Dinner']
    );
    if (ingredients && ingredients.length) {
      for (const ing of ingredients) {
        await client.query(
          'INSERT INTO ingredients (meal_id, name, quantity, category) VALUES ($1, $2, $3, $4)',
          [meal.id, ing.name, ing.quantity || null, ing.category || 'Other']
        );
      }
    }
    await client.query('COMMIT');
    res.status(201).json(meal);
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
});

router.get('/:id', async (req, res) => {
  const { rows } = await pool.query(
    `SELECT m.*, json_agg(i.* ORDER BY i.id) FILTER (WHERE i.id IS NOT NULL) AS ingredients
     FROM meals m
     LEFT JOIN ingredients i ON i.meal_id = m.id
     WHERE m.id = $1
     GROUP BY m.id`,
    [req.params.id]
  );
  if (!rows.length) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});

router.put('/:id', async (req, res) => {
  const { name, notes, method, source_url, servings, meal_category, ingredients } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { rows: [meal] } = await client.query(
      'UPDATE meals SET name=$1, notes=$2, method=$3, source_url=$4, servings=$5, meal_category=$6 WHERE id=$7 RETURNING *',
      [name, notes || null, method || null, source_url || null, servings || 4, meal_category || 'Dinner', req.params.id]
    );
    if (!meal) return res.status(404).json({ error: 'Not found' });
    await client.query('DELETE FROM ingredients WHERE meal_id=$1', [meal.id]);
    if (ingredients && ingredients.length) {
      for (const ing of ingredients) {
        await client.query(
          'INSERT INTO ingredients (meal_id, name, quantity, category) VALUES ($1, $2, $3, $4)',
          [meal.id, ing.name, ing.quantity || null, ing.category || 'Other']
        );
      }
    }
    await client.query('COMMIT');
    res.json(meal);
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
});

router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM meals WHERE id=$1', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
