const express = require('express');
const router = express.Router();
const { District, Place, CartItem } = require('../models');

// Get all districts
router.get('/districts', async (req, res) => {
  try {
    const districts = await District.find();
    res.json(districts);
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

module.exports = router;