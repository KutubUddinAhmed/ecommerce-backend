const mongoose = require("mongoose");

// Define the Login Schema
const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

// Create and export the Login model
const Login = mongoose.model("Login", loginSchema);
module.exports = Login;
