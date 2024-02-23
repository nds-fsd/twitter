const express = require("express");
const router = express.Router();
const roomChatController = require("../controllers/roomChat");
const { validateToken } = require("../middlewares/index");

router.get("/:userId", validateToken, roomChatController.getRoomChat);
router.post("/:userId", validateToken, roomChatController.postRoomChat);
router.delete("/:userId", validateToken, roomChatController.deleteRoomChat);

module.exports = router;
