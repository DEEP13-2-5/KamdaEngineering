import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './src/db.js';
import { setupDefaultAdmin } from './src/routes/auth.js';
import authRoutes from './src/routes/auth.js';
import listingsRoutes from './src/routes/listings.js';
import quotesRoutes from './src/routes/quotes.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Initialize Database & Default Data
await initDB();
await setupDefaultAdmin();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingsRoutes);
app.use('/api/quotes', quotesRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Basic Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
