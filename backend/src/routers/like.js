const express = require("express");
const router = express.Router();
const likeController = require("../controllers/like");
const { consoleLogType, validateToken } = require("../middlewares/index");

router.get(
  "/:meowId",
  consoleLogType,
  validateToken,
  likeController.checkLikeStatus
);
router.get(
  "/user/:userId",
  consoleLogType,
  validateToken,
  likeController.getMeowsLiked
);
router.post("/:meowId", consoleLogType, validateToken, likeController.likeMeow);
router.delete(
  "/:meowId",
  consoleLogType,
  validateToken,
  likeController.unlikeMeow
);

module.exports = router;
