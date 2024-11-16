const express = require("express");
const app = express();
// const connectDB = require("./config/db");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

// connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
