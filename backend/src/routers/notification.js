const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification");
const { validateToken } = require("../middlewares/index");

router.post("/", validateToken, notificationController.createNotification);
router.put(
  "/:notificationId",
  validateToken,
  notificationController.editNotification
);
router.get(
  "/:username",
  validateToken,
  notificationController.getUserNotification
);
router.delete(
  "/:notificationId",
  validateToken,
  notificationController.deleteNotification
);

module.exports = router;
