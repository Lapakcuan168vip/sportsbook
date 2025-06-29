const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 20, // max 20 request/IP/menit
});
app.use('/submit', limiter);

app.get('*', (req, res) => {
  console.log("Route tidak ditemukan:", req.url);
  res.status(404).send("Halaman tidak ditemukan");
});

// Terima data dari AMP
app.post('/submit', (req, res) => {
  const { name, email, hp_bot } = req.body;

  if (hp_bot) {
    return res.status(400).json({ error: "Bot terdeteksi!" });
  }

  return res.json({ name });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ AMP Form server running at http://localhost:${PORT}/amp-page.html`);
});
