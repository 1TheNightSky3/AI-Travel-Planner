const db = require("../config/database");

// Create a new user
const createUser = async (userData) => {
    const [result] = await db.query(
        `INSERT INTO users
        (full_name, email, password, phone, country, role)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            userData.full_name,
            userData.email,
            userData.password,
            userData.phone || null,
            userData.country || null,
            userData.role || "user"
        ]
    );

    return result.insertId;
};


// Get all users
const getAllUsers = async () => {
    const [rows] = await db.query(
        `SELECT user_id, full_name, email, phone, country, role, created_at, updated_at
         FROM users`
    );

    return rows;
};


// Get user by ID
const getUserById = async (userId) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE user_id = ?",
        [userId]
    );

    return rows[0];
};


// Get user by email
const getUserByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows[0];
};


// Update user
const updateUser = async (userId, userData) => {
    const [result] = await db.query(
        `UPDATE users
        SET full_name = ?,
            email = ?,
            phone = ?,
            country = ?
        WHERE user_id = ?`,
        [
            userData.full_name,
            userData.email,
            userData.phone,
            userData.country,
            userId
        ]
    );

    return result;
};


// Delete user
const deleteUser = async (userId) => {
    const [result] = await db.query(
        "DELETE FROM users WHERE user_id = ?",
        [userId]
    );

    return result;
};


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
};