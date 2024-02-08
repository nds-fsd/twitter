const express = require("express");
const router = express.Router();
const cloudinaryController = require("../controllers/cloudinary");
const { consoleLogType, validateToken } = require("../middlewares/index");

router.post(
  "/",
  consoleLogType,
  validateToken,
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
