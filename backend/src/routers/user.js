const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const {consoleLogType, validateUser, validateLogin, validateUpdateUser} = require("../middlewares/index");

router.get("/", consoleLogType, userController.getAllUsers);
router.get("/:username", consoleLogType, userController.getUserByUsername);
router.get("/id/:id", consoleLogType, userController.getUserById);
router.post(
  "/register",
  consoleLogType,
  validateUser,
  userController.createUser
);
router.post("/login", consoleLogType, validateLogin, userController.loginUser);
router.patch("/:username", consoleLogType, validateUpdateUser, userController.updateUser);
router.delete("/:username", consoleLogType, userController.deleteUser);

module.exports = router;
