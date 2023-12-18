const express = require("express");
const router = express.Router();
const followController = require("../controllers/follow");
const { consoleLogType } = require("../middlewares/index");

router.get("/", consoleLogType, followController.getAllFollows);
router.get("/:id", consoleLogType, followController.getFollowById);
router.post("/", consoleLogType, followController.createFollow);
router.patch("/:id", consoleLogType, followController.updateFollow);
router.delete("/:id", consoleLogType, followController.deleteFollow);

module.exports = router;
