const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification");
const { validateToken } = require("../middlewares/token-validator");

router.post("/", validateToken, notificationController.createNotification);
router.patch(
  "/:notificationId",
  validateToken,
  notificationController.editNotification,
);
router.get(
  "/:username", // TODO - use query params to filter by username instead
  validateToken,
  notificationController.getUserNotification,
);
router.delete(
  "/:notificationId",
  validateToken,
  notificationController.deleteNotification,
);

module.exports = router;
