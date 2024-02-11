const express = require("express");

const meowRouter = require("./meow");
const userRouter = require("./user");
const followRouter = require("./follow");
const likeRouter = require("./like");
const cloudinaryRouter = require("./cloudinary");
const webpushRouter = require("./webpush");
const router = express.Router();

router.use("/meow", meowRouter);
router.use("/user", userRouter);
router.use("/follow", followRouter);
router.use("/like", likeRouter);
router.use("/cloudinary", cloudinaryRouter);
router.use("/webpush", webpushRouter);

module.exports = router;
