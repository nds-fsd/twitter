const express = require("express");
const router = express.Router();
const likeController = require("../controllers/like");
const { consoleLogType } = require("../middlewares/index");

router.get("/", consoleLogType, likeController.getAllLikes);
router.get("/:id", consoleLogType, likeController.getLikeById);
router.post("/", consoleLogType, likeController.createLike);
router.patch("/:id", consoleLogType, likeController.updateLike);
router.delete("/:id", consoleLogType, likeController.deleteLike);

module.exports = router;
