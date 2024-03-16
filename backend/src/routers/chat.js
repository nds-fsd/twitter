const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat");
const { validateToken } = require("../middlewares/token-validator");

router.get("/chat/:chatId", validateToken, chatController.getChat);
router.get("/user/:userId", validateToken, chatController.getUserChat);
router.post("/", validateToken, chatController.createChat);

module.exports = router;
