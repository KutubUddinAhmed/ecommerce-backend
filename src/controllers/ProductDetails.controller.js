const productDetails = require("../models/ProductDetails.model.js");

const ProductDetailsController = {
  // Create a new product
  createProduct: async (req, res) => {
    try {
      const productData = req.body;

      // // // Extract file paths from uploaded files
      const files = req.files;
      console.log("Files: ", files);
      // res.send(files);
      const imageUrls = files.map((file) => file.path);
      // console.log("File PAth :", imageUrls);
      // // Add imageUrls to the productData
      if (imageUrls.length > 0) {
        productData.images = imageUrls; // Save the image URLs to the productData's `images` field
      }

      // // Ensure that variants contain at least one variant with the uploaded images
      if (
        imageUrls.length > 0 &&
        productData.variants &&
        productData.variants.length > 0
      ) {
        productData.variants[0].images = productData.variants[0]?.images || [];
        productData.variants[0]?.images.push(...imageUrls); // Append all image URLs to the first variant
      }

      console.log("Request of the body : ", productData);

      // // Log product data before saving
      // console.log(
      //   "Product Data to be saved:",
      //   JSON.stringify(productData, null, 2)
      // );
      // // Create a new product instance
      // const newProduct = new productDetails(productData);

      // // Save the product to the database
      // const savedProduct = await newProduct.save();

      res.status(201).json({
        message: "Product created successfully",
        // data: savedProduct,
      });
    } catch (error) {
      console.error("Error creating product:", error.message);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await productDetails.find();

      res.status(200).json({
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      console.error("Error fetching products:", error.message);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Get a single product by ID
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productDetails.findOne({ product_id: id });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        message: "Product fetched successfully",
        data: product,
      });
    } catch (error) {
      console.error("Error fetching product:", error.message);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Update a product by ID with Cloudinary image upload
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      let imageUrl;

      // If there's an image file in the request, upload it to Cloudinary
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "Product_Image",
        });

        // Store the uploaded image URL
        imageUrl = result.secure_url;
      }

      // If a new image was uploaded, include it in the update data
      if (imageUrl) {
        if (!updateData.variants || !Array.isArray(updateData.variants)) {
          return res.status(400).json({
            message: "Variants data is required and must be an array.",
          });
        }

        // Add the new image to the images array of the first variant (extend as needed)
        updateData.variants[0].images = updateData.variants[0].images || [];
        updateData.variants[0].images.push(imageUrl);
      }

      // Update the product in the database
      const updatedProduct = await productDetails.findOneAndUpdate(
        { product_id: id },
        updateData,
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (error) {
      console.error("Error updating product:", error.message);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

// Delete a product by ID
deleteProduct: async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await productDetails.findOneAndDelete({
      product_id: id,
    });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
},
  (module.exports = ProductDetailsController);
