const tripModel = require("../models/tripModel");

// CREATE - Add new trip
const createTrip = async (req, res) => {
    try {
        const {
            user_id,
            destination,
            start_date,
            end_date,
            budget,
            description
        } = req.body;

        if (!user_id || !destination || !start_date || !end_date) {
            return res.status(400).json({
                message: "user_id, destination, start_date and end_date are required"
            });
        }

        const tripId = await tripModel.createTrip(
            user_id,
            destination,
            start_date,
            end_date,
            budget,
            description
        );

        res.status(201).json({
            message: "Trip created successfully",
            tripId: tripId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create trip"
        });
    }
};


// READ - Get all trips
const getAllTrips = async (req, res) => {
    try {
        const trips = await tripModel.getAllTrips();

        res.status(200).json(trips);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch trips"
        });
    }
};


// READ - Get trip by ID
const getTripById = async (req, res) => {
    try {
        const { id } = req.params;

        const trip = await tripModel.getTripById(id);

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        res.status(200).json(trip);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch trip"
        });
    }
};


// UPDATE - Edit trip
const updateTrip = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            destination,
            start_date,
            end_date,
            budget,
            description
        } = req.body;

        const result = await tripModel.updateTrip(
            id,
            destination,
            start_date,
            end_date,
            budget,
            description
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        res.status(200).json({
            message: "Trip updated successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update trip"
        });
    }
};


// DELETE - Remove trip
const deleteTrip = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await tripModel.deleteTrip(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        res.status(200).json({
            message: "Trip deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete trip"
        });
    }
};


module.exports = {
    createTrip,
    getAllTrips,
    getTripById,
    updateTrip,
    deleteTrip
};