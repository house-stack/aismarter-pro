import express from 'express';
import { generateText } from '../utils/aiClient.js';
import { generateImage } from '../utils/imageClient.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Text generation
router.post('/generate', verifyToken, async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || prompt.length > 2000) return res.status(400).json({ error: 'Invalid prompt' });

  try {
    const result = await generateText(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate text' });
  }
});

// Image generation (NSFW allowed)
router.post('/generate-image', verifyToken, async (req, res) => {
  const { prompt, nsfw = false } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt required' });

  try {
    const image = await generateImage(prompt, nsfw);
    res.json({ image });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image generation failed' });
  }
});

export default router;
