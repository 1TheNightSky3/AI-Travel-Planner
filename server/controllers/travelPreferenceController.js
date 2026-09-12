const TravelPreference = require("../models/travelPreferenceModel");


// CREATE TRAVEL PREFERENCE
const createPreference = async (req, res) => {
    try {
        const preferenceData = req.body;

        if (
            !preferenceData.user_id ||
            !preferenceData.trip_type ||
            !preferenceData.travel_style
        ) {
            return res.status(400).json({
                success: false,
                message: "user_id, trip_type and travel_style are required"
            });
        }

        const preferenceId =
            await TravelPreference.createTravelPreference(preferenceData);

        res.status(201).json({
            success: true,
            message: "Travel preference created successfully",
            preference_id: preferenceId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create travel preference"
        });
    }
};


// GET ALL TRAVEL PREFERENCES
const getAllPreferences = async (req, res) => {
    try {
        const preferences =
            await TravelPreference.getAllTravelPreferences();

        res.status(200).json({
            success: true,
            data: preferences
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve travel preferences"
        });
    }
};


// GET TRAVEL PREFERENCE BY ID
const getPreferenceById = async (req, res) => {
    try {
        const preferenceId = req.params.id;

        const preference =
            await TravelPreference.getTravelPreferenceById(preferenceId);

        if (!preference) {
            return res.status(404).json({
                success: false,
                message: "Travel preference not found"
            });
        }

        res.status(200).json({
            success: true,
            data: preference
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve travel preference"
        });
    }
};


// UPDATE TRAVEL PREFERENCE
const updatePreference = async (req, res) => {
    try {
        const preferenceId = req.params.id;
        const preferenceData = req.body;

        const result =
            await TravelPreference.updateTravelPreference(
                preferenceId,
                preferenceData
            );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Travel preference not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Travel preference updated successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update travel preference"
        });
    }
};


// DELETE TRAVEL PREFERENCE
const deletePreference = async (req, res) => {
    try {
        const preferenceId = req.params.id;

        const result =
            await TravelPreference.deleteTravelPreference(preferenceId);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Travel preference not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Travel preference deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete travel preference"
        });
    }
};


module.exports = {
    createPreference,
    getAllPreferences,
    getPreferenceById,
    updatePreference,
    deletePreference
};
