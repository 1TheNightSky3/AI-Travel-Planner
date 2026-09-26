const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const { authLimiter } = require("../middleware/rateLimiter");
const validate = require("../middleware/validate");

const authController = require("../controllers/authController");


// ===============================
// USER LOGIN
// POST /api/auth/login
// ===============================

router.post(
    "/login",

    // Rate limiting
    authLimiter,

    // Input validation and sanitization
    [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .bail()
            .isEmail()
            .withMessage("Please provide a valid email")
            .normalizeEmail(),

        body("password")
            .notEmpty()
            .withMessage("Password is required")
    ],

    // Validation error handler
    validate,

    // Controller
    authController.login
);


// ===============================
// USER REGISTRATION
// POST /api/auth/register
// ===============================

router.post(
    "/register",

    // Rate limiting
    authLimiter,

    // Input validation and sanitization
    [
        body("full_name")
            .trim()
            .notEmpty()
            .withMessage("Full name is required"),

        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .bail()
            .isEmail()
            .withMessage("Please provide a valid email")
            .normalizeEmail(),

        body("password")
            .notEmpty()
            .withMessage("Password is required")
            .bail()
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),

        body("phone")
            .optional()
            .trim(),

        body("country")
            .optional()
            .trim()
    ],

    // Validation error handler
    validate,

    // Controller
    authController.register
);


module.exports = router;