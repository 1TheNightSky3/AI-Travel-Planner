// const pool = require("../config/database");

// const User = {

//     // Find user by email
//     findByEmail: async (email) => {
//         const [rows] = await pool.execute(
//             "SELECT * FROM users WHERE email = ?",
//             [email]
//         );

//         return rows;
//     },

//     // Create new user
//     create: async (name, email, password, role = "user") => {
//         const [result] = await pool.execute(
//             `INSERT INTO users (name, email, password, role)
//              VALUES (?, ?, ?, ?)`,
//             [name, email, password, role]
//         );

//         return result;
//     }
// };

// module.exports = User;

//--------------------------------------------------------------------------

const pool = require("../config/database");

const User = {

    // Find user by email
    findByEmail: async (email) => {
        const [rows] = await pool.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        return rows;
    },


    // Find user by ID
    findById: async (id) => {
        const [rows] = await pool.execute(
            "SELECT * FROM users WHERE id = ?",
            [id]
        );

        return rows;
    },


    // Create new user
    create: async (name, email, password, role = "user") => {
        const [result] = await pool.execute(
            `INSERT INTO users (name, email, password, role)
             VALUES (?, ?, ?, ?)`,
            [name, email, password, role]
        );

        return result;
    },


    // Update user by ID
    updateById: async (id, name, email, password) => {

        let fields = [];
        let values = [];

        if (name) {
            fields.push("name = ?");
            values.push(name);
        }

        if (email) {
            fields.push("email = ?");
            values.push(email);
        }

        if (password) {
            fields.push("password = ?");
            values.push(password);
        }

        const query = `
            UPDATE users
            SET ${fields.join(", ")}
            WHERE id = ?
        `;

        values.push(id);

        const [result] = await pool.execute(query, values);

        return result;
    },


    // Get all users
    getAll: async () => {
        const [rows] = await pool.execute(
            "SELECT id, name, email, role, created_at FROM users"
        );

        return rows;
    },


    // Delete user by ID
    deleteById: async (id) => {
        const [result] = await pool.execute(
            "DELETE FROM users WHERE id = ?",
            [id]
        );

        return result;
    }

};

module.exports = User;
