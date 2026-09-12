const express = require("express");

const router = express.Router();

const {
    getMyProfile,
    updateMyProfile,
    getAllUsers,
    deleteUser
} = require("../controllers/userController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");


// User can view own profile
router.get(
    "/me",
    authenticateToken,
    getMyProfile
);


// User can update own profile
router.put(
    "/me",
    authenticateToken,
    updateMyProfile
);


// Admin can view all users
router.get(
    "/",
    authenticateToken,
    authorizeRole("admin"),
    getAllUsers
);


// Admin can delete user
router.delete(
    "/:id",
    authenticateToken,
    authorizeRole("admin"),
    deleteUser
);


module.exports = router;
