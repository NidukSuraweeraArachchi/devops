const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
});

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  districtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
    required: true
  },
  image: {
    type: String
  },
  estimatedCabFare: {
    type: Number
  }
});

const cartItemSchema = new mongoose.Schema({
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const District = mongoose.model('District', districtSchema);
const Place = mongoose.model('Place', placeSchema);
const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = {
  District,
  Place,
  CartItem
};