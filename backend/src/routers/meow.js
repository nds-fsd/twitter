const express = require("express");
const router = express.Router();
const meowController = require("../controllers/meow");
const { consoleLogType, validateToken } = require("../middlewares/index");

router.get("/", consoleLogType, validateToken, meowController.getAllMeows);
router.get("/:id", consoleLogType, meowController.getMeowById);
router.post("/", consoleLogType, meowController.createMeow);
router.patch("/:id", consoleLogType, meowController.updateMeow);
router.delete("/:id", consoleLogType, meowController.deleteMeow);

module.exports = router;
