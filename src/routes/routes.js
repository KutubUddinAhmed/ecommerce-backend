const productDetailsController = require("../controllers/ProductDetails.controller.js");
const uploadMultipleImages = require("../config/multer.config.js");
const router = require("express").Router();

// POST route to handle file uploads and product creation
router.post(
  "/product_details",
  uploadMultipleImages, // Handle file uploads
  productDetailsController.createProduct // Handle product creation
);

// GET route for testing
router.get("/product_details", (req, res) => {
  res.send("Product Details API");
});

module.exports = router;
