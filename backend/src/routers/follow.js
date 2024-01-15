const express = require("express");
const router = express.Router();
const followController = require("../controllers/follow");
const { consoleLogType, validateToken } = require("../middlewares/index");

router.get("/:username", consoleLogType, validateToken, followController.checkFollowStatus);
router.post("/", consoleLogType, validateToken, followController.followUser);
router.delete("/", consoleLogType, validateToken, followController.unfollowUser);

module.exports = router;
