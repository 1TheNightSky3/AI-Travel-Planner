const express = require("express");

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const router = express.Router();

// Only ADMIN
router.get("/", authenticateToken, authorizeRole("ADMIN"), getAllUsers);

// USER + ADMIN
router.get("/:id", authenticateToken, getUserById);

// USER + ADMIN
router.post("/", authenticateToken, createUser);

// USER → own data only
// ADMIN → any user
router.put("/:id", authenticateToken, updateUser);

// Only ADMIN
router.delete("/:id", authenticateToken, authorizeRole("ADMIN"), deleteUser);

module.exports = router;