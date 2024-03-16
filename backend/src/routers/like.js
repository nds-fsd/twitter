const express = require("express");
const router = express.Router();
const likeController = require("../controllers/like");
const { validateToken } = require("../middlewares/token-validator");

// TODO - change the route below to "/" and use query params to filter by meowId
//  If meowId is not found, return 404 instead of isLiked: false. If Like is found, return 200
//  Also, allow filtering by userId and remove the route below (/user/:userId)
router.get("/:meowId", validateToken, likeController.checkLikeStatus);
router.get("/user/:userId", validateToken, likeController.getMeowsLiked);
// TODO - change the route below to "/" and use the body to send the meowId
router.post("/:meowId", validateToken, likeController.likeMeow);
// TODO - change the route below to "/:likeId"
//  (if we are asking to delete a like, it means we know its id beforehand)
router.delete("/:meowId", validateToken, likeController.unlikeMeow);

module.exports = router;
