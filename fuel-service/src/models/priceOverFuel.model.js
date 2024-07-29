const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const priceOverFuelSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  fuel: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'expired'],
    default: 'active',
  },
});

module.exports = mongoose.model("PriceOverFuel", priceOverFuelSchema);
