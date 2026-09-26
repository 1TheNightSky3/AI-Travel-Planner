const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

const authenticateToken = require("../middleware/authMiddleware");

const authorizeRole = require("../middleware/roleMiddleware");

const authorizeSelfOrAdmin = require("../middleware/selforAdminMiddleware");


// ==================== CREATE USER ====================

router.post(
    "/",
    authenticateToken,
    authorizeRole("admin"),
    userController.createUser
);


// ==================== READ ALL USERS ====================

router.get(
    "/",
    authenticateToken,
    authorizeRole("admin"),
    userController.getAllUsers
);


// ==================== READ USER BY ID ====================

router.get(
    "/:id",
    authenticateToken,
    authorizeSelfOrAdmin,
    userController.getUserById
);


// ==================== UPDATE USER ====================

router.put(
    "/:id",
    authenticateToken,
    authorizeSelfOrAdmin,
    userController.updateUser
);


// ==================== DELETE USER ====================

router.delete(
    "/:id",
    authenticateToken,
    authorizeRole("admin"),
    userController.deleteUser
);


module.exports = router;