const express = require("express");

const meowRouter = require("./meow");
const userRouter = require("./user");
const followRouter = require("./follow");
const likeRouter = require("./like");
const bookmarkRouter = require("./bookmark");
const cloudinaryRouter = require("./cloudinary");
const router = express.Router();

router.use("/meow", meowRouter);
router.use("/user", userRouter);
router.use("/follow", followRouter);
router.use("/like", likeRouter);
router.use("/bookmark", bookmarkRouter);
router.use("/cloudinary", cloudinaryRouter);

module.exports = router;
