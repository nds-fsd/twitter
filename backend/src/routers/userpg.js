const express = require("express");
const router = express.Router();
const userpgController = require("../controllers/userpg");
const { validateToken } = require("../middlewares/index");

router.get("/:userId", validateToken, userpgController.getUserpg);
router.post("/:userId", validateToken, userpgController.postUserpg);
router.delete("/:userId", validateToken, userpgController.deleteUserpg);

module.exports = router;
