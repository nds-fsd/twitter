const express = require("express");
const router = express.Router();
const cloudinaryController = require("../controllers/cloudinary");
const { consoleLogType, validateToken } = require("../middlewares/index");

router.post("/", consoleLogType, cloudinaryController.uploadPhoto);
router.delete("/", consoleLogType, cloudinaryController.deletePhoto);

module.exports = router;
