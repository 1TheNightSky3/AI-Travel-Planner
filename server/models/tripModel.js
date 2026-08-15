const db = require("../config/database");

const getAllTrips = async () => {
    const [rows] = await db.query("SELECT * FROM trips");
    return rows;
};

const getTripById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM trips WHERE id = ?",
        [id]
    );

    return rows[0];
};

const createTrip = async (
    user_id,
    destination,
    start_date,
    end_date,
    budget,
    description
) => {
    const [result] = await db.query(
        `INSERT INTO trips
        (user_id, destination, start_date, end_date, budget, description)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            user_id,
            destination,
            start_date,
            end_date,
            budget,
            description
        ]
    );

    return result.insertId;
};

const updateTrip = async (
    id,
    destination,
    start_date,
    end_date,
    budget,
    description
) => {
    const [result] = await db.query(
        `UPDATE trips
        SET destination = ?,
            start_date = ?,
            end_date = ?,
            budget = ?,
            description = ?
        WHERE id = ?`,
        [
            destination,
            start_date,
            end_date,
            budget,
            description,
            id
        ]
    );

    return result;
};

const deleteTrip = async (id) => {
    const [result] = await db.query(
        "DELETE FROM trips WHERE id = ?",
        [id]
    );

    return result;
};

module.exports = {
    getAllTrips,
    getTripById,
    createTrip,
    updateTrip,
    deleteTrip
};