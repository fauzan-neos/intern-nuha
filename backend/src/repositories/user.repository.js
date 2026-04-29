const { pool } = require("../config/db");

async function findUserByEmail(email) {
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        return result.rows[0];
    } catch (err) {
        throw new Error("Error finding user: " + err.message);
    }
}

async function createUser(fullname, email, password) {
    try {
        const result = await pool.query(
            "INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING id",
            [fullname, email, password]
        );
        return result.rows[0].id;
    } catch (err) {
        throw new Error("Error creating user: " + err.message);
    }
}

module.exports = { createUser, findUserByEmail };