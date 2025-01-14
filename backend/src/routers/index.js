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
const userpgRouter = require("./userpg");

const router = express.Router();

router.use("/meow", meowRouter);
router.use("/user", userRouter);
router.use("/follow", followRouter);
router.use("/like", likeRouter);
router.use("/bookmark", bookmarkRouter);
router.use("/cloudinary", cloudinaryRouter);
router.use("/notification", notificationRouter);

router.use("/userpg", userpgRouter);
router.use("/chat", chatRouter);
router.use("/message", messageRouter);

module.exports = router;
