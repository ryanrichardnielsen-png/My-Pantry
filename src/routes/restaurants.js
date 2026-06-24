const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/', async (req, res) => {
  const { cuisine, vibe, area } = req.body;
  if (!area) return res.status(400).json({ error: 'Please enter your area or neighborhood.' });

  const query = cuisine ? `${cuisine} restaurant` : 'restaurant';

  const params = new URLSearchParams({
    near: area,
    query,
    categories: '13000', // Food & Dining
    limit: '6',
    fields: 'name,categories,location,rating,price,photos,fsq_id',
  });

  try {
    const response = await fetch(`https://places.foursquare.com/v3/places/search?${params}`, {
      headers: {
        Authorization: process.env.FOURSQUARE_API_KEY,
        Accept: 'application/json',
      },
    });

    const rawText = await response.text();
    if (!response.ok) {
      console.error('Foursquare error:', response.status, rawText.slice(0, 300));
      return res.status(502).json({ error: `Foursquare ${response.status}: ${rawText.slice(0, 200)}` });
    }
    let data;
    try { data = JSON.parse(rawText); } catch(e) {
      console.error('Foursquare bad JSON:', rawText.slice(0, 300));
      return res.status(502).json({ error: 'Bad response from Foursquare. Check API key.' });
    }

    const results = (data.results || []).map(r => {
      const category = r.categories && r.categories[0] ? r.categories[0].name : 'Restaurant';
      const address = r.location
        ? [r.location.address, r.location.locality].filter(Boolean).join(', ')
        : area;
      const price = r.price ? '$'.repeat(r.price) : null;
      const rating = r.rating ? (r.rating / 2).toFixed(1) : null; // Foursquare is /10, show /5
      const photo = r.photos && r.photos[0]
        ? `${r.photos[0].prefix}300x200${r.photos[0].suffix}`
        : null;
      const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(r.name + ' ' + address)}`;

      return { name: r.name, category, address, price, rating, photo, mapsUrl };
    });

    res.json({ restaurants: results });
  } catch (e) {
    console.error('Restaurant fetch error:', e.message);
    res.status(500).json({ error: 'Something went wrong. Try again.' });
  }
});

module.exports = router;
