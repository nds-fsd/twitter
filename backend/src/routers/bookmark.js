const express = require("express");
const router = express.Router();
const bookmarkController = require("../controllers/bookmark");
const { validateToken } = require("../middlewares/token-validator");

// TODO - change the route below to "/" and use query params to filter by meowId
//  If meowId is not found, return 404 instead of isBookmarked: false. If bookmark is found, return 200
//  Also, allow filtering by userId and remove the route below (/user/:userId)
router.get("/:meowId", validateToken, bookmarkController.checkBookmarkStatus);
router.get(
  "/user/:userId",
  validateToken,
  bookmarkController.getMeowsBookmarked,
);
// TODO - change the route below to "/" and use the body to send the meowId
router.post("/:meowId", validateToken, bookmarkController.bookmarkMeow);
// TODO - change the route below to "/:bookmarkId"
//  (if we are asking to delete a bookmark, it means we know its id beforehand)
router.delete("/:meowId", validateToken, bookmarkController.unbookmarkMeow);

module.exports = router;
