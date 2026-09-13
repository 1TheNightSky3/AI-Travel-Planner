const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

const authenticateToken = require("../middleware/authMiddleware");

const {
    authorizeRoles,
    authorizeSelfOrAdmin
} = require("../middleware/roleMiddleware");

// CREATE
router.post("/", userController.createUser);

// READ ALL - ADMIN ONLY
router.get(
    "/",
    authenticateToken,
    authorizeRoles("ADMIN"),
    userController.getAllUsers
);

// READ BY ID - OWN PROFILE OR ADMIN
router.get(
    "/:id",
    authenticateToken,
    authorizeSelfOrAdmin,
    userController.getUserById
);

// UPDATE
router.put(
    "/:id",
    authenticateToken,
    authorizeSelfOrAdmin,
    userController.updateUser
);
// DELETE
router.delete(
    "/:id",
    authenticateToken,
    authorizeSelfOrAdmin,
    userController.deleteUser
);

module.exports = router;