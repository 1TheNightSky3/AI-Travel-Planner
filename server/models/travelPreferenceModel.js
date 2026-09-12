const db = require("../config/database");

const createTravelPreference = async (preferenceData) => {
    const [result] = await db.query(
        `INSERT INTO user_travel_preferences
        (
            user_id,
            trip_type,
            travel_style,
            preferred_budget,
            budget_currency,
            preferred_destination,
            preferred_trip_duration
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            preferenceData.user_id,
            preferenceData.trip_type,
            preferenceData.travel_style,
            preferenceData.preferred_budget,
            preferenceData.budget_currency,
            preferenceData.preferred_destination,
            preferenceData.preferred_trip_duration
        ]
    );

    return result.insertId;
};

const getAllTravelPreferences = async () => {
    const [rows] = await db.query(
        `SELECT
            p.*,
            u.full_name,
            u.email
        FROM user_travel_preferences p
        JOIN users u ON p.user_id = u.user_id`
    );

    return rows;
};

const getTravelPreferenceById = async (preferenceId) => {
    const [rows] = await db.query(
        `SELECT
            p.*,
            u.full_name,
            u.email
        FROM user_travel_preferences p
        JOIN users u ON p.user_id = u.user_id
        WHERE p.preference_id = ?`,
        [preferenceId]
    );

    return rows[0];
};

const updateTravelPreference = async (
    preferenceId,
    preferenceData
) => {
    const [result] = await db.query(
        `UPDATE user_travel_preferences
        SET trip_type = ?,
            travel_style = ?,
            preferred_budget = ?,
            budget_currency = ?,
            preferred_destination = ?,
            preferred_trip_duration = ?
        WHERE preference_id = ?`,
        [
            preferenceData.trip_type,
            preferenceData.travel_style,
            preferenceData.preferred_budget,
            preferenceData.budget_currency,
            preferenceData.preferred_destination,
            preferenceData.preferred_trip_duration,
            preferenceId
        ]
    );

    return result;
};

const deleteTravelPreference = async (preferenceId) => {
    const [result] = await db.query(
        `DELETE FROM user_travel_preferences
        WHERE preference_id = ?`,
        [preferenceId]
    );

    return result;
};

module.exports = {
    createTravelPreference,
    getAllTravelPreferences,
    getTravelPreferenceById,
    updateTravelPreference,
    deleteTravelPreference
};
