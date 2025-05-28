// server.js
const express = require('express');
const bodyParser = require('express').json;
const morgan = require('morgan');
const { encode, decode } = require('./swazi-address6');

const app = express();
const PORT = 3040;

app.use(bodyParser());
app.use(morgan("combined"));

// Encode route
app.post('/encode', (req, res) => {
  const { lat, lng } = req.body;

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return res.status(400).json({ error: 'Invalid lat/lng format' });
  }

  try {
    const code = encode(lat, lng);
    res.json({ code });
  } catch (err) {
    res.status(500).json({ error: 'Encoding failed' });
  }
});

// Decode route
app.get('/decode/:code', (req, res) => {
  const { code } = req.params;

 
  try {
    const location = decode(code);
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: 'Decoding failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Swazi GPS server running on http://localhost:${PORT}`);
});
