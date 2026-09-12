// const express = require("express");
// const router = express.Router();

// const { register, login } = require("../controllers/authController");

// router.post("/register", register);
// router.post("/login", login);
// module.exports = router;

const express = require("express");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const { register, login } = require("../controllers/authController");

// Rate limiter for login
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Maximum 5 login attempts
    message: {
        message: "Too many login attempts. Please try again after 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Rate limiter for registration
const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Maximum 10 registration attempts
    message: {
        message: "Too many registration attempts. Please try again after 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Authentication routes
router.post("/register", registerLimiter, register);

router.post("/login", loginLimiter, login);

module.exports = router;