  const mongoose = require('mongoose');

  const foodRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactNumber: { type: String, required: true },
    location: {
      latitude: Number,
      longitude: Number
    },
    quantity: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  const FoodRequest= mongoose.model('FoodRequest', foodRequestSchema);
  module.exports =FoodRequest;
