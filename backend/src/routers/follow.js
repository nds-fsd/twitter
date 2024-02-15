const express = require("express");
const router = express.Router();
const followController = require("../controllers/follow");
const { validateToken } = require("../middlewares/index");

router.get("/:username", validateToken, followController.checkFollowStatus);
router.post("/", validateToken, followController.followUser);
router.delete("/", validateToken, followController.unfollowUser);

module.exports = router;
