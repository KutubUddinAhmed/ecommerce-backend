const mongoose = require("mongoose");

// Define the User Signup Schema
const userDataSchema = new mongoose.Schema({
  user_first_name: {
    type: String,
    required: function () {
      return !this.google_id;
    },
  },
  user_last_name: {
    type: String,
    required: function () {
      return !this.google_id;
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.google_id;
    },
    minlength: 6,
  },
  confirm_password: {
    type: String,
    required: function () {
      return !this.google_id;
    },
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match.",
    },
  },
  google_id: {
    type: String,
    required: function () {
      return !this.password;
    },
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to ensure confirm_password is not saved in the database
userDataSchema.pre("save", function (next) {
  this.confirm_password = undefined; // Remove confirm_password field
  next();
});

// Create and export the UserSignup model
const UserData = mongoose.model("UserSignup", userDataSchema);
module.exports = UserData;
