const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic();

router.post('/', async (req, res) => {
  const { cuisine, vibe, area } = req.body;
  if (!area) return res.status(400).json({ error: 'Please tell us your area or neighborhood.' });

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `You are helping a couple choose a restaurant for a date night. Suggest 4 real restaurants based on these preferences:

Area: ${area}
Cuisine / craving: ${cuisine || 'anything good'}
Vibe: ${vibe || 'relaxed date night'}

Return ONLY a JSON array with no markdown. Each restaurant must have:
- name: string (real restaurant name)
- cuisine: string (e.g. "Italian", "Japanese", "Modern American")
- description: string (one warm sentence about why this is a great pick for a date night — mention a signature dish or what makes the atmosphere special)
- price: string (one of "$", "$$", "$$$", "$$$$")

Only suggest real, well-known restaurants that actually exist in or near the specified area. If you are not confident a restaurant exists there, do not include it.

Example: [{"name":"Chez Henri","cuisine":"French Bistro","description":"Cozy candlelit spot known for their duck confit and excellent wine list — perfect for a relaxed evening.","price":"$$$"}]`,
    }],
  });

  try {
    const cleaned = message.content[0].text.trim()
      .replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    const restaurants = JSON.parse(cleaned);
    res.json({ restaurants });
  } catch (e) {
    console.error('Restaurant parse error:', e.message);
    res.status(500).json({ error: 'Could not get suggestions. Try again.' });
  }
});

module.exports = router;
