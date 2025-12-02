import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import 'dotenv/config';

import authRoutes from './routes/auth.js';
import aiRoutes from './routes/ai.js';
import blogRoutes from './routes/blog.js';
import paymentRoutes from './routes/payments.js';
import './cron.js';

const app = express();

// Security
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Trust proxy (Render/Vercel)
app.set('trust proxy', 1);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => res.json({ message: 'AIsmarter API v2' }));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
