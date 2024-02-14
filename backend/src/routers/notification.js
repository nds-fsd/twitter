const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification");
const { validateToken } = require("../middlewares/index");

router.post("/", validateToken, notificationController.createNotification);
router.get("/", validateToken, notificationController.getNotification);
router.delete(
  "/:notificationId",
  validateToken,
  notificationController.deleteNotification
);

module.exports = router;
