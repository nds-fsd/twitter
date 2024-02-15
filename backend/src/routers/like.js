const express = require("express");
const router = express.Router();
const likeController = require("../controllers/like");
const { validateToken } = require("../middlewares/index");

router.get("/:meowId", validateToken, likeController.checkLikeStatus);
router.get("/user/:userId", validateToken, likeController.getMeowsLiked);
router.post("/:meowId", validateToken, likeController.likeMeow);
router.delete("/:meowId", validateToken, likeController.unlikeMeow);

module.exports = router;
