const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message");
const { validateToken } = require("../middlewares/index");

router.get("/:userId", validateToken, messageController.getMessage);
router.post("/:userId", validateToken, messageController.postMessage);
router.delete("/:userId", validateToken, messageController.deleteMessage);

module.exports = router;
