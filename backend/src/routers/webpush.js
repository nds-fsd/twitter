const express = require("express");
const router = express.Router();
const webpushController = require("../controllers/webpush");
const { validateToken } = require("../middlewares/index");

// router.get("/:meowId", validateToken, webpushController.checkLikeStatus);
router.post("/", validateToken, webpushController.subscription);
// router.delete("/:meowId", validateToken, webpushController.unlikeMeow);

module.exports = router;
