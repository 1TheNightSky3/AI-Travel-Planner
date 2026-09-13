const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const {
    registerValidation,
    loginValidation
} = require("../middleware/validationMiddleware");

// REGISTER
router.post(
    "/register",
    registerValidation,
    authController.register
);

// LOGIN
router.post(
    "/login",
    loginValidation,
    authController.login
);

module.exports = router;