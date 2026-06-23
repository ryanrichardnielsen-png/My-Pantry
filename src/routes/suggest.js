const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');
const { pool } = require('../db');

const client = new Anthropic();

router.post('/', async (req, res) => {
  const { prompt } = req.body;

  // Get existing meal names so we don't duplicate
  const { rows } = await pool.query('SELECT name FROM meals');
  const existing = rows.map(r => r.name).join(', ');

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `You are a helpful meal planning assistant. Suggest 5 meal ideas based on this request: "${prompt || 'a good variety of weeknight dinners'}".

${existing ? `We already have these meals in our library, so suggest different ones: ${existing}.` : ''}

Respond with ONLY a JSON array. No explanation, no markdown, just the raw JSON array. Each meal should have:
- name: string
- ingredients: array of { name, quantity, category } where category is one of: Produce, Meat & Seafood, Dairy, Pantry, Frozen, Bakery, Beverages, Household, Other

Example format:
[{"name":"Example Meal","ingredients":[{"name":"Chicken","quantity":"1 lb","category":"Meat & Seafood"}]}]`,
    }],
  });

  try {
    const text = message.content[0].text.trim();
    // Strip markdown code fences if present
    const cleaned = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    const meals = JSON.parse(cleaned);
    res.json({ meals });
  } catch (e) {
    console.error('Suggest parse error:', e.message, message.content[0].text);
    res.status(500).json({ error: 'Failed to parse meal suggestions', raw: message.content[0].text });
  }
});

module.exports = router;
