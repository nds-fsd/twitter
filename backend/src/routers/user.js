const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const {
  consoleLogType,
  validateUser,
  validateLogin,
  validateUpdateUser,
  validateToken,
} = require("../middlewares/index");

router.get("/", consoleLogType, validateToken, userController.getAllUsers);
router.get(
  "/:username",
  consoleLogType,
  validateToken,
  userController.getUserByUsername
);
router.get(
  "/id/:id",
  consoleLogType,
  validateToken,
  userController.getUserById
);
router.post(
  "/register",
  consoleLogType,
  validateUser,
  userController.createUser
);
router.post("/login", consoleLogType, validateLogin, userController.loginUser);
router.patch(
  "/:username",
  consoleLogType,
  validateToken,
  validateUpdateUser,
  userController.updateUser
);
router.delete(
  "/:username",
  consoleLogType,
  validateToken,
  userController.deleteUser
);

module.exports = router;
