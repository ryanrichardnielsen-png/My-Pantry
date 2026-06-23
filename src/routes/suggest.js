const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');
const { pool } = require('../db');

const client = new Anthropic();

router.post('/', async (req, res) => {
  const { prompt } = req.body;

  const { rows } = await pool.query('SELECT name FROM meals');
  const existing = rows.map(r => r.name).join(', ');

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `You are a helpful cooking and meal planning assistant for a couple's meal planning app.

The user said: "${prompt || 'suggest some weeknight dinners'}"

First, decide if this is:
A) A general food/cooking QUESTION (e.g. "how long does salmon keep?", "what can I make with chicken and spinach?", "whats the difference between broiling and baking?")
B) A meal suggestion REQUEST (e.g. "Italian pasta", "quick breakfasts", "cake", "seafood dinners")

If A — a question: respond with a JSON object: {"answer": "your plain text answer here"}. Be concise and practical, 2-4 sentences max.

If B — a suggestion request: respond with a JSON array of 5 meals. ${existing ? `We already have these meals so suggest different ones: ${existing}.` : ''} Each meal must have:
- name: string
- meal_category: one of "Breakfast", "Lunch", "Dinner", "Snack", "Dessert"
- ingredients: array of { name, quantity, category } where category is one of: Produce, Meat & Seafood, Dairy, Pantry, Frozen, Bakery, Beverages, Household, Other
- method: string with numbered step-by-step cooking instructions, each step on its own line

Respond with ONLY the raw JSON — no markdown, no explanation, no code fences.`,
    }],
  });

  try {
    const cleaned = message.content[0].text.trim()
      .replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    const parsed = JSON.parse(cleaned);

    // Question response
    if (parsed.answer) return res.json({ answer: parsed.answer });

    // Meal suggestions (array)
    const meals = Array.isArray(parsed) ? parsed : parsed.meals || [];
    res.json({ meals });
  } catch (e) {
    console.error('Suggest parse error:', e.message, message.content[0].text);
    res.status(500).json({ error: 'Something went wrong. Try rephrasing.' });
  }
});

module.exports = router;
