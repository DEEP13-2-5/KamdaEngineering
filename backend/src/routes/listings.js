import express from 'express';
import { readListings, writeListings } from '../db.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET all listings
router.get('/', async (req, res) => {
  try {
    const listings = await readListings();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST new listing (Admin only)
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { name, category, price, image, material, capacity, description, specifications } = req.body;
    
    // Validate request based on required fields
    if (!name || !category || !price || !material || !capacity || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const listings = await readListings();
    const newListing = {
      id: `listing-${Date.now()}`,
      name,
      category,
      price,
      image: image || 'https://images.pexels.com/photos/4491443/pexels-photo-4491443.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      material,
      capacity,
      description,
      specifications: Array.isArray(specifications) ? specifications : specifications.split(',').map(s => s.trim()).filter(Boolean),
      createdBy: req.user.id,
      createdAt: new Date().toISOString().split('T')[0]
    };

    listings.push(newListing);
    await writeListings(listings);
    
    res.status(201).json(newListing);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE listing (Admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    let listings = await readListings();
    
    const listingIndex = listings.findIndex(l => l.id === id);
    if (listingIndex === -1) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    listings.splice(listingIndex, 1);
    await writeListings(listings);

    res.json({ message: 'Listing deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
