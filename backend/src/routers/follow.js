const express = require("express");
const router = express.Router();
const followController = require("../controllers/follow");
const { validateToken } = require("../middlewares/token-validator");

// TODO - Remove :username from the URL, retrieve the followers from the JWT user and
//  when searching for a specific follow, use query params like ?username=otheruser
router.get("/:username", validateToken, followController.checkFollowStatus);
router.post("/", validateToken, followController.followUser);
router.delete("/", validateToken, followController.unfollowUser);

module.exports = router;
