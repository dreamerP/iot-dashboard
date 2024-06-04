const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.get("/checkAuth", authController.checkAuth);

module.exports = router;
