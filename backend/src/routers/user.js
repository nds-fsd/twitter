const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const {
  validateUser,
  validateLogin,
  validateUpdateUser,
} = require("../middlewares/index");

router.get("/", userController.getAllUsers);
router.get("/:username", userController.getUserByUsername);
router.get("/id/:id", userController.getUserById);
router.post(
  "/register",

  validateUser,
  userController.createUser
);
router.post("/login", validateLogin, userController.loginUser);
router.patch("/:username", validateUpdateUser, userController.updateUser);
router.delete("/:username", userController.deleteUser);

module.exports = router;
