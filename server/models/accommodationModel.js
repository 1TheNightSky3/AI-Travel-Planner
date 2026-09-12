const db = require("../config/database");

const getAllAccommodations = async () => {
    const [rows] = await db.query(
        "SELECT * FROM accommodations"
    );

    return rows;
};

const getAccommodationById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM accommodations WHERE accommodation_id = ?",
        [id]
    );

    return rows[0];
};

const createAccommodation = async (
    destination,
    accommodation_name,
    address,
    price_per_night,
    rating,
    facilities
) => {
    const [result] = await db.query(
        `INSERT INTO accommodations
        (destination, accommodation_name, address,
         price_per_night, rating, facilities)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            destination,
            accommodation_name,
            address,
            price_per_night,
            rating,
            facilities
        ]
    );

    return result.insertId;
};

const updateAccommodation = async (
    id,
    destination,
    accommodation_name,
    address,
    price_per_night,
    rating,
    facilities
) => {
    const [result] = await db.query(
        `UPDATE accommodations
        SET destination = ?,
            accommodation_name = ?,
            address = ?,
            price_per_night = ?,
            rating = ?,
            facilities = ?
        WHERE accommodation_id = ?`,
        [
            destination,
            accommodation_name,
            address,
            price_per_night,
            rating,
            facilities,
            id
        ]
    );

    return result;
};

const deleteAccommodation = async (id) => {
    const [result] = await db.query(
        "DELETE FROM accommodations WHERE accommodation_id = ?",
        [id]
    );

    return result;
};

module.exports = {
    getAllAccommodations,
    getAccommodationById,
    createAccommodation,
    updateAccommodation,
    deleteAccommodation
};