const express = require("express");
const router = express.Router();
const followController = require("../controllers/follow");
const { consoleLogType } = require("../middlewares/index");

router.post("/", consoleLogType, followController.followUser);
router.delete("/", consoleLogType, followController.unfollowUser);

module.exports = router;
