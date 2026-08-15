const db = require("../config/database");

const createUser = async (userData) => {
    const [result] = await db.query(
        `INSERT INTO users
        (full_name, email, password, phone, country)
        VALUES (?, ?, ?, ?, ?)`,
        [
            userData.full_name,
            userData.email,
            userData.password,
            userData.phone,
            userData.country
        ]
    );

    return result.insertId;
};

const getAllUsers = async () => {
    const [rows] = await db.query(
        "SELECT * FROM users"
    );

    return rows;
};

const getUserById = async (userId) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE user_id = ?",
        [userId]
    );

    return rows[0];
};

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
    updateUser,
    deleteUser
};
