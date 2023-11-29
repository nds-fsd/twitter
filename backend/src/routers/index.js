const express = require("express");

const meowRouter = require("./meow");
const userRouter = require("./user");
const router = express.Router();

router.use("/meow", meowRouter);
router.use("/user", userRouter);

module.exports = router;
