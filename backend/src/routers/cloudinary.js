const express = require("express");
const router = express.Router();
const cloudinaryController = require("../controllers/cloudinary");
const { validateToken } = require("../middlewares/token-validator");
const upload = require("multer")();

router.post(
  "/profile/",
  validateToken,
  upload.single("userFile"),
  cloudinaryController.uploadUserProfilePhoto,
);
router.post(
  "/background/",
  validateToken,
  upload.single("backgroundFile"),
  cloudinaryController.uploadBackgroundProfilePhoto,
);

module.exports = router;
