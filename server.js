console.log("server.js loaded");
require('dotenv').config();
const express = require('express');
// Use global fetch when available (Node 18+); otherwise fall back to node-fetch
let fetch = global.fetch;
if (!fetch) {
  try {
    // node-fetch v3 exports as ESM; when required in CommonJS it may be under .default
    const nf = require('node-fetch');
    fetch = nf && nf.default ? nf.default : nf;
  } catch (e) {
    console.error('node-fetch not available and global.fetch missing');
  }
}
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const API_KEY = process.env.BIBLE_API_KEY;
console.log("API key loaded:", API_KEY ? "yes" : "no");

// Test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Bible route
app.get('/bible/:version/:chapter', async (req, res) => {
  const { version, chapter } = req.params;
  // allow overriding whether to include verse spans via query string
  // (e.g. /bible/ID/GEN.1?verseSpans=true)
  const verseSpans = req.query.verseSpans === 'true';
  console.log("Request:", version, chapter, "verseSpans=", verseSpans);

  try {
    const response = await fetch(
      `https://rest.api.bible/v1/bibles/${version}/chapters/${chapter}?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=${verseSpans}`,
      { headers: { 'api-key': API_KEY } }
    );

    console.log("Response status:", response.status);

    const text = await response.text();
    console.log("Response body:", text);

    const data = JSON.parse(text); // may fail if API returned error HTML
    res.json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});