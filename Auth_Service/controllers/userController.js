const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();

        res.status(200).json({
            users
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            user
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        const existingUser = await userModel.findUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = await userModel.createUser(
            name,
            email,
            hashedPassword
        );

        res.status(201).json({
            message: "User created successfully",
            userId
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { id } = req.params;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        const existingUser = await userModel.findUserByEmail(email);

        if (existingUser && existingUser.id != id) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedRows = await userModel.updateUser(
            id,
            name,
            email,
            hashedPassword
        );

        if (updatedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


const deleteUser = async (req, res) => {
    try {
        const deletedRows = await userModel.deleteUser(req.params.id);

        if (deletedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};