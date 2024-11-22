const mongoose = require("mongoose");

// Define variant Schema

const variantSchema = new mongoose.Schema({
  variant_id: {
    type: Number,
    unique: true,
    required: true,
  },
  product_id: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
    validate: {
      validator: (v) => Array.isArray(v) && v.length >= 1 && v.length <= 8,
      message: "Images array must contain between 1 and 8 images.",
    },
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  sizes: {
    type: [String],
    required: true,
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: "Sizes array must contain at least one size.",
    },
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  sale_price: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Define Product Schema

const ProductDetailSchema = new mongoose.Schema(
  {
    product_id: {
      type: Number,
      required: true,
      unique: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    product_category: {
      type: String,
      required: true,
    },
    product_sub_category: {
      type: String,
      required: true,
    },

    variants: {
      type: [variantSchema],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "Product must contain at least one variant.",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);

const productDetails = mongoose.model("Product", ProductDetailSchema);

module.exports = productDetails;
