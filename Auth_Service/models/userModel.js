const pool = require("../config/db");

const findUserByEmail = async (email) => {
    const [rows] = await pool.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows[0];
};

const createUser = async (name, email, hashedPassword, role = "USER") => {
    const [result] = await pool.execute(
        `INSERT INTO users (name, email, password, role)
         VALUES (?, ?, ?, ?)`,
        [name, email, hashedPassword, role]
    );

    return result.insertId;
};

const getAllUsers = async () => {
    const [rows] = await pool.execute(
        "SELECT id, name, email, role, created_at FROM users"
    );

    return rows;
};

const getUserById = async (id) => {
    const [rows] = await pool.execute(
        "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
        [id]
    );

    return rows[0];
};

const updateUser = async (id, name, email, hashedPassword) => {
    const [result] = await pool.execute(
        `UPDATE users
         SET name = ?, email = ?, password = ?
         WHERE id = ?`,
        [name, email, hashedPassword, id]
    );

    return result.affectedRows;
};

const deleteUser = async (id) => {
    const [result] = await pool.execute(
        "DELETE FROM users WHERE id = ?",
        [id]
    );

    return result.affectedRows;
};
module.exports = {
    findUserByEmail,
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};