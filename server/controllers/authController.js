const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    createUser,
    getUserByEmail,
    getUserById
} = require("../models/userModel");


// ===============================
// USER REGISTRATION
// POST /api/auth/register
// ===============================
const register = async (req, res) => {
    try {
        const {
            full_name,
            email,
            password,
            phone,
            country
        } = req.body;

        // 1. Validate required input
        if (!full_name || !email || !password) {
            return res.status(400).json({
                message: "Full name, email and password are required"
            });
        }

        // 2. Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long"
            });
        }

        // 3. Check whether email already exists
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        // 4. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Create user
        // IMPORTANT:
        // Every normal registration creates a USER.
        // Client cannot choose admin role.
        const userId = await createUser({
            full_name,
            email,
            password: hashedPassword,
            phone,
            country,
            role: "user"
        });

        // 6. Return success response
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                user_id: userId,
                full_name,
                email,
                role: "user"
            }
        });

    } catch (error) {
        console.error("Registration error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// USER LOGIN
// POST /api/auth/login
// ===============================
const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // 2. Find user by email
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // 3. Compare entered password with hashed password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // 4. Generate JWT token
        const token = jwt.sign(
            {
                user_id: user.user_id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        );

        // 5. Return token
        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                user_id: user.user_id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    register,
    login
};