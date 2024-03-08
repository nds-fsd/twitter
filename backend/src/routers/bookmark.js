const express = require("express");
const router = express.Router();
const bookmarkController = require("../controllers/bookmark");
const { validateToken } = require("../middlewares/index");

router.get("/:meowId", validateToken, bookmarkController.checkBookmarkStatus);
router.get(
  "/user/:userId",
  validateToken,
  bookmarkController.getMeowsBookmarked,
);
router.post("/:meowId", validateToken, bookmarkController.bookmarkMeow);
router.delete("/:meowId", validateToken, bookmarkController.unbookmarkMeow);

module.exports = router;
