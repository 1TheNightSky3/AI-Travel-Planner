const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// Get logged-in user's own profile
const getMyProfile = async (req, res) => {
    try {
        const users = await User.findById(req.user.id);

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = users[0];

        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });

    } catch (error) {
        console.error("GET PROFILE ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Update logged-in user's own profile
const updateMyProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name && !email && !password) {
            return res.status(400).json({
                message: "Provide at least one field to update"
            });
        }

        let hashedPassword = null;

        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const result = await User.updateById(
            req.user.id,
            name,
            email,
            hashedPassword
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Profile updated successfully"
        });

    } catch (error) {
        console.error("UPDATE PROFILE ERROR:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Admin can see all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll();

        res.status(200).json(users);

    } catch (error) {
        console.error("GET USERS ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Admin can delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Prevent admin from deleting their own account
        if (Number(id) === req.user.id) {
            return res.status(400).json({
                message: "Admin cannot delete their own account"
            });
        }

        const result = await User.deleteById(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        console.error("DELETE USER ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    getMyProfile,
    updateMyProfile,
    getAllUsers,
    deleteUser
};