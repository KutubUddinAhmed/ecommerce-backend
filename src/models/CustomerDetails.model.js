const mongoose = require("mongoose");

// Define the Customer Schema
const customerDetailsSchema = new mongoose.Schema({
  customer_first_name: {
    type: String,
    required: true,
  },
  customer_last_name: {
    type: String,
    required: true,
  },
  customer_email: {
    type: String,
    required: true,
  },
  customer_phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  customer_country: {
    type: String,
    required: true,
  },
  customer_state: {
    type: String,
    required: true,
  },
  customer_city: {
    type: String,
    required: true,
  },
  customer_street_landmark: {
    type: String,
    required: true,
  },
  customer_pincode: {
    type: Number,
    required: true,
  },
});

// Create and export the Customer model
const CustomerDetails = mongoose.model("Customer", customerDetailsSchema);
module.exports = CustomerDetails;
