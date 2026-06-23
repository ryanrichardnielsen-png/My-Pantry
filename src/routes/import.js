const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic();

router.post('/', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL required' });

  let html;
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MyPantry/1.0)' },
      timeout: 10000,
    });
    html = await response.text();
  } catch (e) {
    return res.status(400).json({ error: 'Could not fetch that URL. Make sure it is a valid recipe page.' });
  }

  // Most recipe sites embed structured JSON-LD data even if the page needs JS
  let text = '';

  const jsonLdMatches = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  for (const block of jsonLdMatches) {
    const inner = block.replace(/<[^>]+>/g, '').trim();
    if (inner.includes('Recipe') || inner.includes('ingredient') || inner.includes('instruction')) {
      text = inner.slice(0, 8000);
      break;
    }
  }

  // Fall back to stripped HTML text if no JSON-LD found
  if (!text) {
    text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 8000);
  }

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `Extract the recipe from this webpage text and return ONLY a JSON object with no markdown, no explanation.

The JSON must have:
- name: string (recipe name)
- ingredients: array of { name, quantity, category } where category is one of: Produce, Meat & Seafood, Dairy, Pantry, Frozen, Bakery, Beverages, Household, Other
- method: string (numbered step-by-step instructions, each step on a new line like "1. Preheat oven...")

Webpage text:
${text}`,
    }],
  });

  try {
    const raw = message.content[0].text.trim()
      .replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    const recipe = JSON.parse(raw);
    res.json({ recipe });
  } catch (e) {
    console.error('Import parse error:', e.message, message.content[0].text.slice(0, 200));
    res.status(500).json({ error: 'Could not parse recipe from that page. Try a different recipe site.' });
  }
});

module.exports = router;
