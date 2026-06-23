require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { init } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/meals', require('./routes/meals'));
app.use('/api/week', require('./routes/week'));
app.use('/api/grocery', require('./routes/grocery'));
app.use('/api/staples', require('./routes/staples'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;

init()
  .then(() => app.listen(PORT, () => console.log(`My-Pantry running on port ${PORT}`)))
  .catch(err => { console.error('DB init failed:', err); process.exit(1); });
