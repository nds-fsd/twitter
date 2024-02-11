const express = require("express");
const router = express.Router();
const cloudinaryController = require("../controllers/cloudinary");
const { consoleLogType, validateToken } = require("../middlewares/index");
const upload = require("multer")();

router.post(
  "/profile/",
  consoleLogType,
  validateToken,
  upload.single("userFile"),
  cloudinaryController.uploadUserProfilePhoto
);
router.post(
  "/background/",
  consoleLogType,
  validateToken,
  upload.single("backgroundFile"),
  cloudinaryController.uploadBackgroundProfilePhoto
);
router.delete(
  "/",
  consoleLogType,
  validateToken,
  cloudinaryController.deleteProfilePhoto
);

module.exports = router;
