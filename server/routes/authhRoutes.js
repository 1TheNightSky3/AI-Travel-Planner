const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");


// USER REGISTRATION
router.post("/register", authController.register);


// USER LOGIN
router.post("/login", authController.login);


module.exports = router;