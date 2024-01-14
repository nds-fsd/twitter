const express = require("express");
const router = express.Router();
const followController = require("../controllers/follow");
const { consoleLogType, validateToken } = require("../middlewares/index");

router.post("/", consoleLogType, validateToken, followController.followUser);
router.delete("/", consoleLogType, followController.unfollowUser);

module.exports = router;
