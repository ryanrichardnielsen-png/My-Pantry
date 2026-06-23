const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic();

// Accepts { images: [{ image: base64string, mediaType: string }] }
router.post('/', async (req, res) => {
  const { images } = req.body;
  if (!images || !images.length) return res.status(400).json({ error: 'No images provided' });

  const pageNote = images.length > 1
    ? `These are ${images.length} pages of the same recipe. Combine all pages into one complete recipe.`
    : 'This is a photo of a recipe from a cookbook or recipe card.';

  // One image block per page, followed by the instruction text
  const content = [
    ...images.map(({ image, mediaType }) => ({
      type: 'image',
      source: { type: 'base64', media_type: mediaType || 'image/jpeg', data: image },
    })),
    {
      type: 'text',
      text: `${pageNote} Extract the recipe and return ONLY a JSON object with no markdown, no explanation.

The JSON must have:
- name: string (recipe name)
- meal_category: one of "Breakfast", "Lunch", "Dinner", "Snack", "Dessert"
- servings: number (default 4 if not shown)
- ingredients: array of { name, quantity, category } where category is one of: Produce, Meat & Seafood, Dairy, Pantry, Frozen, Bakery, Beverages, Household, Other
- method: string (numbered step-by-step instructions, each step on a new line like "1. Preheat oven...")

If the image is not a recipe or is unreadable, return: {"error": "Could not read a recipe from this image."}`,
    },
  ];

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    messages: [{ role: 'user', content }],
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
