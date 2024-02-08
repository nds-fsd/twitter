const express = require("express");
const router = express.Router();
const cloudinaryController = require("../controllers/cloudinary");
const { consoleLogType, validateToken } = require("../middlewares/index");
const upload = require("multer")();

router.post(
  "/",
  consoleLogType,
  validateToken,
  upload.single('file'),
  cloudinaryController.uploadUserProfilePhoto
);
router.post(
  "/",
  consoleLogType,
  validateToken,
  cloudinaryController.uploadBackgroundProfilePhoto
);
router.delete(
  "/",
  consoleLogType,
  validateToken,
  cloudinaryController.deleteProfilePhoto
);

module.exports = router;
