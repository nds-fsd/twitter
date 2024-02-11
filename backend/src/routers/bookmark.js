const express = require("express");
const router = express.Router();
const bookmarkController = require("../controllers/bookmark");
const { consoleLogType, validateToken } = require("../middlewares/index");

router.get(
  "/:meowId",
  consoleLogType,
  validateToken,
  bookmarkController.checkBookmarkStatus
);
router.post(
  "/:meowId",
  consoleLogType,
  validateToken,
  bookmarkController.bookmarkMeow
);
router.delete(
  "/:meowId",
  consoleLogType,
  validateToken,
  bookmarkController.unbookmarkMeow
);

module.exports = router;
