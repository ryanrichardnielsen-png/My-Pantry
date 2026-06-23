const express = require('express');
const router = express.Router();
const { pool } = require('../db');

router.get('/', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM staples ORDER BY category, sort_order, name'
  );
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { name, category } = req.body;
  const { rows: [staple] } = await pool.query(
    'INSERT INTO staples (name, category) VALUES ($1, $2) RETURNING *',
    [name, category || 'Other']
  );
  res.status(201).json(staple);
});

router.put('/:id', async (req, res) => {
  const { name, category, is_low } = req.body;
  const { rows: [staple] } = await pool.query(
    `UPDATE staples SET
       name = COALESCE($1, name),
       category = COALESCE($2, category),
       is_low = COALESCE($3, is_low)
     WHERE id=$4 RETURNING *`,
    [name, category, is_low !== undefined ? is_low : null, req.params.id]
  );
  if (!staple) return res.status(404).json({ error: 'Not found' });
  res.json(staple);
});

router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM staples WHERE id=$1', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
