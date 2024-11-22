const multer = require("multer");
const path = require("path");

// Set up storage and file naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|avif|webp|png/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
  limits: {
    files: 8, // Limit to 8 files
    fileSize: 5 * 1024 * 1024, // Limit each file size to 5 MB
  },
});

// Middleware to handle up to 8 images
const uploadMultipleImages = upload.array("images", 8);

module.exports = uploadMultipleImages;
