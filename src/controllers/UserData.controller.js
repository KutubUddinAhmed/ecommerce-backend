const UserData = require("../models/UserData.model.js");
const bcrypt = require("bcrypt");

// User Signup Controller
const userSignup = async (req, res) => {
  try {
    const { user_first_name, user_last_name, email, password, google_id } =
      req.body;

    // Check if the user already exists
    const existingUser = await UserData.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists." });
    }

    // If using password-based signup, hash the password
    let hashedPassword = null;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // Create a new user
    const newUser = new UserData({
      user_first_name,
      user_last_name,
      email,
      password: hashedPassword,
      google_id,
    });

    await newUser.save();
    res
      .status(201)
      .json({ msg: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

// User Login Controller
const userLogin = async (req, res) => {
  try {
    const { email, password, google_id } = req.body;

    // Check if the user exists
    const user = await UserData.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    // For password-based login
    if (password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ msg: "Invalid password." });
      }
    }

    // For Google-based login
    if (google_id && user.google_id !== google_id) {
      return res.status(401).json({ msg: "Invalid Google ID." });
    }

    res.status(200).json({ msg: "Login successful", user });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

module.exports = { userSignup, userLogin };
