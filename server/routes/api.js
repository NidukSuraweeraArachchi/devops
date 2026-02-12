const express = require('express');
const router = express.Router();
const { District, Place, CartItem } = require('../models');
const { auth, admin } = require('../middleware/authMiddleware');

// Get all districts
router.get('/districts', async (req, res) => {
  try {
    const districts = await District.find();
    res.json(districts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all places (populated)
router.get('/places', async (req, res) => {
  try {
    const places = await Place.find().populate('districtId');
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get district by ID with its places
router.get('/districts/:id', async (req, res) => {
  try {
    const district = await District.findById(req.params.id);
    const places = await Place.find({ districtId: req.params.id });
    res.json({ district, places });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get cart items
router.get('/cart/:userId', async (req, res) => {
  try {
    const cartItems = await CartItem.find({ userId: req.params.userId })
      .populate('placeId');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add to cart
router.post('/cart', async (req, res) => {
  const cartItem = new CartItem({
    placeId: req.body.placeId,
    userId: req.body.userId
  });

  try {
    const newCartItem = await cartItem.save();
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove from cart
router.delete('/cart/:id', async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE District (Admin Only)
router.post('/districts', auth, admin, async (req, res) => {
  const district = new District({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image
  });

  try {
    const newDistrict = await district.save();
    res.status(201).json(newDistrict);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE District (Admin Only)
router.put('/districts/:id', auth, admin, async (req, res) => {
  try {
    const updatedDistrict = await District.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDistrict);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE District (Admin Only)
router.delete('/districts/:id', auth, admin, async (req, res) => {
  try {
    await District.findByIdAndDelete(req.params.id);
    res.json({ message: 'District deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get places by district
router.get('/places/district/:districtId', async (req, res) => {
  try {
    const places = await Place.find({ districtId: req.params.districtId });
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE Place (Admin Only)
router.post('/places', auth, admin, async (req, res) => {
  const place = new Place({
    name: req.body.name,
    description: req.body.description,
    districtId: req.body.districtId,
    image: req.body.image,
    location: req.body.location,
    rating: req.body.rating,
    estimatedCabFare: req.body.estimatedCabFare
  });

  try {
    const newPlace = await place.save();
    res.status(201).json(newPlace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE Place (Admin Only)
router.put('/places/:id', auth, admin, async (req, res) => {
  try {
    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPlace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE Place (Admin Only)
router.delete('/places/:id', auth, admin, async (req, res) => {
  try {
    await Place.findByIdAndDelete(req.params.id);
    res.json({ message: 'Place deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;