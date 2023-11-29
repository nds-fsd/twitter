const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { consoleLogType } = require("../middlewares/index");

router.get("/", consoleLogType, userController.getAllUsers);
router.get("/:id", consoleLogType, userController.getUserById);
router.post("/", consoleLogType, userController.createUser);
router.patch("/:id", consoleLogType, userController.updateUser);
router.delete("/:id", consoleLogType, userController.deleteUser);

module.exports = router;
