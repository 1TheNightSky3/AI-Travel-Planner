const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// CREATE USER / REGISTER
const createUser = async (req, res) => {
    try {
        const userData = req.body;

        // Validate required fields
        if (!userData.full_name || !userData.email || !userData.password) {
            return res.status(400).json({
                success: false,
                message: "full_name, email and password are required"
            });
        }

        // Check if email already exists
        const existingUser = await User.getUserByEmail(userData.email);

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Replace plain password with hashed password
        userData.password = hashedPassword;

        // Create user
        const userId = await User.createUser(userData);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user_id: userId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to register user"
        });
    }
};


// GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();

        res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve users"
        });
    }
};


// GET USER BY ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.getUserById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve user"
        });
    }
};


// UPDATE USER
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;

        const result = await User.updateUser(userId, userData);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update user"
        });
    }
};


// DELETE USER
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const result = await User.deleteUser(userId);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete user"
        });
    }
};


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};