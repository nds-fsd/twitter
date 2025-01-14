const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const {
  validateUser,
  validateLogin,
  validateUpdateUser,
  validateToken,
} = require("../middlewares/index");
const { sendWelcomeEmail } = require("../service/email-service");

router.get("/", validateToken, userController.getAllUsers);
router.get("/:username", validateToken, userController.getUserByUsername);
router.get("/search/:substring", validateToken, userController.searchUsers);
router.get("/id/:id", validateToken, userController.getUserById);
router.post("/register", validateUser, userController.createUser);
router.post("/login", validateLogin, userController.loginUser);
router.patch(
  "/:username",
  validateToken,
  validateUpdateUser,
  userController.updateUser,
);
router.delete("/:username", validateToken, userController.deleteUser);
router.post("/email", userController.welcomeEmail);

module.exports = router;
