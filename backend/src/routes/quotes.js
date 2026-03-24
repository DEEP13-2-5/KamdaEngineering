import express from 'express';
import multer from 'multer';
import path from 'path';
import { readQuotes, writeQuotes } from '../db.js';

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images (jpeg, jpg, png, webp) are allowed'));
  }
});

// Submit a new quote request
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, email, company, product, quantity, description } = req.body;
    
    if (!name || !email || !product) {
      return res.status(400).json({ message: 'Name, email, and product are required' });
    }

    const quotes = await readQuotes();
    const newQuote = {
      id: `quote-${Date.now()}`,
      name,
      email,
      company,
      product,
      quantity,
      description,
      photo: req.file ? `/uploads/${req.file.filename}` : null,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    quotes.push(newQuote);
    await writeQuotes(quotes);

    res.status(201).json({ 
      message: 'Quote request submitted successfully',
      quote: newQuote 
    });
  } catch (error) {
    console.error('Error submitting quote:', error);
    res.status(500).json({ message: 'Error submitting quote request' });
  }
});

// Get all quotes (for admin) or specific user quotes (by email)
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    let quotes = await readQuotes();
    
    if (email) {
      quotes = quotes.filter(q => q.email.toLowerCase() === email.toLowerCase());
    }
    
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quotes' });
  }
});

// Admin reply to a quote
router.put('/:id/reply', async (req, res) => {
  try {
    const { id } = req.params;
    const { price, note } = req.body;

    if (!price) {
      return res.status(400).json({ message: 'Price is required' });
    }

    const quotes = await readQuotes();
    const index = quotes.findIndex(q => q.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    quotes[index] = {
      ...quotes[index],
      adminPrice: price,
      adminNote: note,
      status: 'quoted',
      updatedAt: new Date().toISOString()
    };

    await writeQuotes(quotes);
    res.json({ message: 'Reply sent successfully', quote: quotes[index] });
  } catch (error) {
    res.status(500).json({ message: 'Error updating quote reply' });
  }
});

// User status update (approve/reject)
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const quotes = await readQuotes();
    const index = quotes.findIndex(q => q.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    quotes[index] = {
      ...quotes[index],
      status,
      updatedAt: new Date().toISOString()
    };

    await writeQuotes(quotes);
    res.json({ message: `Quote ${status} successfully`, quote: quotes[index] });
  } catch (error) {
    res.status(500).json({ message: 'Error updating quote status' });
  }
});

export default router;
