const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const {
  validateRegisterUser,
  validateUpdateUser,
} = require("../middlewares/user-validator");
const { validateToken } = require("../middlewares/token-validator");
const { validateLogin } = require("../middlewares/login-validator");

router.get("/", validateToken, userController.getAllUsers);
// TODO - remove the route below and add filtering capability to the one above
//  through query parameters (e.g. /users?username=paquito...)
router.get("/:username", validateToken, userController.getUserByUsername);
router.get("/search/:substring", validateToken, userController.searchUsers);
// TODO change to /:id
router.get("/id/:id", validateToken, userController.getUserById);
router.post("/register", validateRegisterUser, userController.createUser);
router.post("/login", validateLogin, userController.loginUser);
// TODO - remove :username, API endpoint only should let edit JWT user
router.patch(
  "/:username",
  validateToken,
  validateUpdateUser,
  userController.updateUser,
);
// TODO - remove :username, API endpoint only should let delete JWT user
router.delete("/:username", validateToken, userController.deleteUser);
router.post("/email", userController.welcomeEmail);

module.exports = router;
