const mongoose = require("mongoose");

// Define the Order History Schema
const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
    unique: true,
  },
  product_id: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  total_price: {
    type: Number,
    required: true,
    min: 0,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
});

// Define the User Profile Schema
const userProfileSchema = new mongoose.Schema({
  user_first_name: {
    type: String,
    required: true,
  },
  user_last_name: {
    type: String,
    required: true,
  },
  email_address: {
    type: String,
    required: true,
    unique: true,
  },
  user_phone: {
    type: String,
    required: true,
    unique: true,
  },
  user_location: {
    type: String,
    required: true,
  },
  order_history: {
    type: [orderSchema],
    default: [],
  },
});

// Create and export the UserProfile model
const UserProfile = mongoose.model("UserProfile", userProfileSchema);
module.exports = UserProfile;
