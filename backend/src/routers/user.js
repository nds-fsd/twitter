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
router.get("/id/:id", validateToken, userController.getUserById);
router.post("/register", validateUser, userController.createUser);
router.post("/login", validateLogin, userController.loginUser);
router.patch(
  "/:username",
  validateToken,
  validateUpdateUser,
  userController.updateUser
);
router.delete("/:username", validateToken, userController.deleteUser);
router.post("/email", async (req, res) => {
  await sendWelcomeEmail({name:'Meower', email: 'cecilia.lorenzo.galarza@gmail.com'});
  return res.status(200).send();
})

module.exports = router;
