const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

const authenticateToken = require("../middleware/authMiddleware");

const authorizeRole = require("../middleware/roleMiddleware");

const authorizeSelfOrAdmin = require("../middleware/selforAdminMiddleware");


// CREATE

router.post(
    "/",
    authenticateToken,
    authorizeRole("admin"),
    userController.createUser
);


// READ ALL

router.get(
    "/",
    authenticateToken,
    authorizeRole("admin"),
    userController.getAllUsers
);


// READ BY ID

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
    authorizeRole("admin"),
    userController.deleteUser
);

router.post(
    "/",
    authenticateToken,
    postController.createPost
);
module.exports = router;