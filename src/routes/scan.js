const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic();

// Accepts { image: base64string, mediaType: 'image/jpeg' | 'image/png' | 'image/webp' }
router.post('/', async (req, res) => {
  const { image, mediaType } = req.body;
  if (!image) return res.status(400).json({ error: 'No image provided' });

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: [
        {
          type: 'image',
          source: { type: 'base64', media_type: mediaType || 'image/jpeg', data: image },
        },
        {
          type: 'text',
          text: `This is a photo of a recipe from a cookbook or recipe card. Extract the recipe and return ONLY a JSON object with no markdown, no explanation.

The JSON must have:
- name: string (recipe name)
- meal_category: one of "Breakfast", "Lunch", "Dinner", "Snack", "Dessert"
- servings: number (default 4 if not shown)
- ingredients: array of { name, quantity, category } where category is one of: Produce, Meat & Seafood, Dairy, Pantry, Frozen, Bakery, Beverages, Household, Other
- method: string (numbered step-by-step instructions, each step on a new line like "1. Preheat oven...")

If the image is not a recipe or is unreadable, return: {"error": "Could not read a recipe from this image."}`,
        },
      ],
    }],
  });

  try {
    const raw = message.content[0].text.trim()
      .replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    const result = JSON.parse(raw);
    if (result.error) return res.status(400).json({ error: result.error });
    res.json({ recipe: result });
  } catch (e) {
    console.error('Scan parse error:', e.message, message.content[0].text.slice(0, 200));
    res.status(500).json({ error: 'Could not read a recipe from this image.' });
  }
});

module.exports = router;
