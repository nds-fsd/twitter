const express = require("express");
const router = express.Router();
const userpgController = require("../controllers/userpg");
const { validateToken } = require("../middlewares/index");

router.get("/:userId", validateToken, userpgController.getUserpg);

module.exports = router;
