const express = require("express");

const meowRouter = require("./meow");
const userRouter = require("./user");
const followRouter = require("./follow");
const likeRouter = require("./like");
const bookmarkRouter = require("./bookmark");
const cloudinaryRouter = require("./cloudinary");
const notificationRouter = require("./notification");
const messageRouter = require("./message");
const chatRouter = require("./chat");

const router = express.Router();

router.use("/meows", meowRouter);
router.use("/users", userRouter);
router.use("/follows", followRouter);
router.use("/likes", likeRouter);
router.use("/bookmarks", bookmarkRouter);
router.use("/cloudinary", cloudinaryRouter);
router.use("/notifications", notificationRouter);

router.use("/chats", chatRouter);
router.use("/messages", messageRouter);

module.exports = router;
