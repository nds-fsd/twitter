const express = require("express");
const router = express.Router();
const meowController = require("../controllers/meow");
const { consoleLogType } = require("../middlewares/index");

router.get("/", consoleLogType, meowController.getAllMeows);
router.get("/:id", consoleLogType, meowController.getMeowById);
router.post("/", consoleLogType, meowController.createMeow);
router.patch("/:id", consoleLogType, meowController.updateMeow);
router.delete("/:id", consoleLogType, meowController.deleteMeow);

module.exports = router;