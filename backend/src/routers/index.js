const express = require("express");
// const meawRouter = require("./meaw");
const userRouter = require("./user");

const router = express.Router();

// router.use("/meaw", meawRouter);
router.use("/user", userRouter);

module.exports = router;
