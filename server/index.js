import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import { body, param, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { insertUrl, findByShortCode, incrementClicks } from './db.js';
import { isUri } from 'valid-url';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

const validateUrl = (url) => {
  if (!isUri(url)) {
    throw new Error('Invalid URL format');
  }
  return true;
};

app.post(
  '/api/shorten',
  body('url').custom(validateUrl),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { url } = req.body;
      const id = nanoid();
      const shortCode = nanoid(8); // 8 character short code

      insertUrl(id, url, shortCode);

      const shortened = findByShortCode(shortCode);
      
      res.json({
        id: shortened.id,
        originalUrl: shortened.original_url,
        shortCode: shortened.short_code,
        clicks: shortened.clicks,
        createdAt: shortened.created_at
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to shorten URL' });
    }
  }
);

app.get('/api/stats/:shortCode', param('shortCode').trim(), async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = findByShortCode(shortCode);

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.json({
      id: url.id,
      originalUrl: url.original_url,
      shortCode: url.short_code,
      clicks: url.clicks,
      createdAt: url.created_at
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get URL stats' });
  }
});

app.get('/:shortCode', param('shortCode').trim(), async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = findByShortCode(shortCode);

    if (!url) {
      return res.status(404).send('URL not found');
    }

    incrementClicks(shortCode);
    res.redirect(url.original_url);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`URL shortener service running on port ${port}`);
});