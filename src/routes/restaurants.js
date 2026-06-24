const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

router.post('/', async (req, res) => {
  const { cuisine, vibe, area } = req.body;
  if (!area) return res.status(400).json({ error: 'Please enter your area or neighborhood.' });

  const prompt = `Suggest 5 real restaurants in or near ${area}${cuisine ? ` that serve ${cuisine}` : ''}${vibe ? ` with a ${vibe} vibe` : ''}.

Return ONLY a JSON array with no markdown, no explanation. Each object must have:
- name: the restaurant name
- category: cuisine type (e.g. "Japanese", "Italian", "American")
- description: one sentence about what makes it great
- priceRange: one of "$", "$$", "$$$", "$$$$"
- neighborhood: the specific neighborhood or street area within ${area}

Only include real, well-known restaurants you are confident exist. If you are unsure about a specific place, skip it.`;

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].text.trim();
    let restaurants;
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      restaurants = JSON.parse(jsonMatch ? jsonMatch[0] : text);
    } catch (e) {
      console.error('Claude restaurant parse error:', text);
      return res.status(502).json({ error: 'Could not parse restaurant suggestions. Try again.' });
    }

    const results = restaurants.map(r => ({
      name: r.name,
      category: r.category || 'Restaurant',
      description: r.description || '',
      price: r.priceRange || null,
      address: r.neighborhood || area,
      mapsUrl: `https://maps.google.com/?q=${encodeURIComponent(r.name + ' ' + area)}`,
    }));

    res.json({ restaurants: results });
  } catch (e) {
    console.error('Restaurant suggestion error:', e.message);
    res.status(500).json({ error: 'Something went wrong. Try again.' });
  }
});

module.exports = router;
