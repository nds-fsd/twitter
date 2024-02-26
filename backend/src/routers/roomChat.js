const express = require("express");
const router = express.Router();
const roomChatController = require("../controllers/roomChat");
const { validateToken } = require("../middlewares/index");

router.get("/:roomId", validateToken, roomChatController.getRoomChat);
router.post("/:roomId", validateToken, roomChatController.createRoomChat);

module.exports = router;
