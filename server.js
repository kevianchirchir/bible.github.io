console.log("server.js loaded");

require('dotenv').config();
const express = require('express');
const cors = require('cors');
let fetch = global.fetch;

if (!fetch) {
  try {
    const nf = require('node-fetch');
    fetch = nf && nf.default ? nf.default : nf;
  } catch (e) {
    console.error('node-fetch not available and global.fetch missing');
  }
}

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: [ 'https://kevianchirchir.github.io' ,
  'http://127.0.0.1:5500']
}));

app.use(express.static('public'));

const API_KEY = process.env.BIBLE_API_KEY;
console.log("API key loaded:", API_KEY ? "yes" : "no");

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.get('/bible/:version/:chapter', async (req, res) => {
  const { version, chapter } = req.params;
  const verseSpans = req.query.verseSpans === 'true';
  console.log("Request received:", version, chapter, "verseSpans=", verseSpans);

  try {
    const response = await fetch(
      `https://rest.api.bible/v1/bibles/${version}/chapters/${chapter}?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=true`,
      { headers: { 'api-key': API_KEY } }
    );

    const text = await response.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch (parseErr) {
      console.error("Error parsing API response:", text);
      return res.status(500).json({ error: "Failed to parse API response" });
    }

    res.json(data);

  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});