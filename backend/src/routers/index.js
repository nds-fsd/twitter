const express = require("express");


const miauRouter = require("./miau");
const userRouter = require("./user");
const router = express.Router();


router.use("/miau", miauRouter)
router.use("/user", userRouter);


module.exports = router;
