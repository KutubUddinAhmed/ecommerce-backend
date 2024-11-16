const mongoose = require("mongoose");

// Define the Order Schema
const orderSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  customer_id: {
    type: Number,
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  total_bill: {
    type: Number,
    required: true,
    min: 0,
  },
  payment_status: {
    type: String,
    required: true,
    enum: ["Unpaid", "Paid"],
    default: "Unpaid",
  },
  product_id: {
    type: Number,
    required: true,
  },
  variant_id: {
    type: Number,
    required: true,
  },
  no_of_items: {
    type: Number,
    required: true,
    min: 1,
  },
  delivery_number: {
    type: Number,
    required: true,
  },
  order_status: {
    type: String,
    required: true,
    enum: ["processing", "shipped", "delivered", "cancel"],
    default: "processing",
  },
});

// Create and export the Order model
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
