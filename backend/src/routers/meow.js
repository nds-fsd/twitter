const express = require("express");
const router = express.Router();
const meowController = require("../controllers/meow");
const { validateToken } = require("../middlewares/index");

router.get("/", validateToken, meowController.getFeedMeows);
router.get("/:username", validateToken, meowController.getProfileMeows);
router.get("/:id", validateToken, meowController.getMeowById);
router.get("/replies/:id", validateToken, meowController.getMeowReplies);
router.post("/", validateToken, meowController.createMeow);
router.post("/repost", validateToken, meowController.repostMeow);
router.patch("/:id", validateToken, meowController.updateMeow);
router.delete("/:id", validateToken, meowController.deleteMeow);

module.exports = router;
