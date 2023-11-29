const express = require("express");
const router = express.Router();
const miauController = require('../controllers/miau');

router.get("/", miauController.getAllMiaus);
router.get("/:id", miauController.getMiauById);
router.post("/", miauController.createMiau);
router.patch("/:id", miauController.updateMiau);
router.delete("/:id", miauController.deleteMiau);

module.exports = router;
