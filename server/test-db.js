require("dotenv").config();

const pool = require("./config/database");

async function testUser() {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM users WHERE email = ?",
            ["moutithi@example.com"]
        );

        console.log("USER QUERY SUCCESS!");
        console.log(rows);

        process.exit(0);
    } catch (error) {
        console.error("USER QUERY ERROR!");
        console.error(error);

        process.exit(1);
    }
}

testUser();