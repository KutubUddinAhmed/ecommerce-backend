require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./src/config/db");
const cors = require("cors");
const path = require("path");

const router = require("./src/routes/routes.js");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Root route
app.get("/", (req, res) => {
  return res.render("homepage");
});

app.use("/uploads", express.static(path.join("uploads")));
// Routes
app.use(router);

// Database connection
connectDB().catch((err) => {
  console.error("Database connection failed", err);
  process.exit(1);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
