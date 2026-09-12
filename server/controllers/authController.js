// const bcrypt = require("bcryptjs");
// const User = require("../models/userModel");

// // Register new user
// const register = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // // Validate input
//         // if (!name || !email || !password) {
//         //     return res.status(400).json({
//         //         message: "Name, email and password are required"
//         //     });
//         // }
//         // Validate input
// if (!name || !email || !password) {
//     return res.status(400).json({
//         message: "Name, email and password are required"
//     });
// }

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// if (!emailRegex.test(email)) {
//     return res.status(400).json({
//         message: "Invalid email format"
//     });
// }

// if (password.length < 6) {
//     return res.status(400).json({
//         message: "Password must be at least 6 characters"
//     });
// }

//         // Check existing email
//         const existingUser = await User.findByEmail(email);

//         if (existingUser.length > 0) {
//             return res.status(409).json({
//                 message: "Email already exists"
//             });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create user
//         const result = await User.create(
//             name,
//             email,
//             hashedPassword,
//             "user"
//         );

//         res.status(201).json({
//             message: "User registered successfully",
//             userId: result.insertId
//         });

//  } catch (error) {
//     console.error("REGISTER ERROR:", error);

//     res.status(500).json({
//         message: "Server error",
//         error: error.message
//     });
// }
// };



// const jwt = require("jsonwebtoken");

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Validate input
//         if (!email || !password) {
//             return res.status(400).json({
//                 message: "Email and password are required"
//             });
//         }

//         // Find user
//         const users = await User.findByEmail(email);

//         if (users.length === 0) {
//             return res.status(401).json({
//                 message: "Invalid email or password"
//             });
//         }

//         const user = users[0];

//         // Verify password
//         const isPasswordValid = await bcrypt.compare(
//             password,
//             user.password
//         );

//         if (!isPasswordValid) {
//             return res.status(401).json({
//                 message: "Invalid email or password"
//             });
//         }

//         // Generate JWT
//         const token = jwt.sign(
//             {
//                 id: user.id,
//                 email: user.email,
//                 role: user.role
//             },
//             process.env.JWT_SECRET,
//             {
//                 expiresIn: "1h"
//             }
//         );

//         res.status(200).json({
//             message: "Login successful",
//             token: token,
//             user: {
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role
//             }
//         });

//     } catch (error) {
//         console.error("LOGIN ERROR:", error);

//         res.status(500).json({
//             message: "Server error",
//             error: error.message
//         });
//     }
// };
// module.exports = {
//     register,
//     login
// };
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// Register new user
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Sanitize input
        const cleanName =
            typeof name === "string" ? name.trim() : "";

        const cleanEmail =
            typeof email === "string"
                ? email.trim().toLowerCase()
                : "";

        // Validate input
        if (!cleanName || !cleanEmail || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        // Validate password
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        // Check existing email
        const existingUser = await User.findByEmail(cleanEmail);

        if (existingUser.length > 0) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const result = await User.create(
            cleanName,
            cleanEmail,
            hashedPassword,
            "user"
        );

        res.status(201).json({
            message: "User registered successfully",
            userId: result.insertId
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Sanitize email
        const cleanEmail =
            typeof email === "string"
                ? email.trim().toLowerCase()
                : "";

        // Validate input
        if (!cleanEmail || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        // Find user
        const users = await User.findByEmail(cleanEmail);

        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = users[0];

        // Verify password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    register,
    login
};