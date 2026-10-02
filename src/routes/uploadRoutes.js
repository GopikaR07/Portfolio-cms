const express = require("express");
const router = express.Router();

const uploadController = require("../controllers/uploadController");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/image",
  authMiddleware,
  upload.single("image"),
  uploadController.uploadImage
);

router.get(
  "/media",
  authMiddleware,
  uploadController.getMedia
);

module.exports = router;