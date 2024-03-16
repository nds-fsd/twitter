const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message");
const { validateToken } = require("../middlewares/token-validator");

router.get("/:chatId", validateToken, messageController.getMessage);
router.post("/:chatId", validateToken, messageController.postMessage);

module.exports = router;
