const express = require("express");
const router = express.Router();
const meowController = require("../controllers/meow");
const { consoleLogType, validateToken } = require("../middlewares/index");

router.get("/", consoleLogType, validateToken, meowController.getFeedMeows);
router.get(
  "/:username",
  consoleLogType,
  validateToken,
  meowController.getProfileMeows
);
router.get("/:id", consoleLogType, validateToken, meowController.getMeowById);
router.get(
  "/likes/:id",
  consoleLogType,
  validateToken,
  meowController.getMeowsLiked
);
router.get(
  "/replies/:id",
  consoleLogType,
  validateToken,
  meowController.getMeowReplies
);
router.post("/", consoleLogType, validateToken, meowController.createMeow);
router.patch("/:id", consoleLogType, meowController.updateMeow);
router.delete("/:id", consoleLogType, meowController.deleteMeow);

module.exports = router;
