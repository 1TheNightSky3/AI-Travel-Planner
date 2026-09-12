
const accommodationModel = require("../models/accommodationModel");


// CREATE
const createAccommodation = async (req, res) => {
    try {
        const {
            destination,
            accommodation_name,
            address,
            price_per_night,
            rating,
            facilities
        } = req.body;

        if (!destination || !accommodation_name || !price_per_night) {
            return res.status(400).json({
                message: "destination, accommodation_name and price_per_night are required"
            });
        }

        const accommodationId =
            await accommodationModel.createAccommodation(
                destination,
                accommodation_name,
                address,
                price_per_night,
                rating,
                facilities
            );

        res.status(201).json({
            message: "Accommodation created successfully",
            accommodationId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create accommodation"
        });
    }
};


// READ ALL
const getAllAccommodations = async (req, res) => {
    try {
        const accommodations =
            await accommodationModel.getAllAccommodations();

        res.status(200).json(accommodations);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch accommodations"
        });
    }
};


// READ BY ID
const getAccommodationById = async (req, res) => {
    try {
        const { id } = req.params;

        const accommodation =
            await accommodationModel.getAccommodationById(id);

        if (!accommodation) {
            return res.status(404).json({
                message: "Accommodation not found"
            });
        }

        res.status(200).json(accommodation);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch accommodation"
        });
    }
};


// UPDATE
const updateAccommodation = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            destination,
            accommodation_name,
            address,
            price_per_night,
            rating,
            facilities
        } = req.body;

        const result =
            await accommodationModel.updateAccommodation(
                id,
                destination,
                accommodation_name,
                address,
                price_per_night,
                rating,
                facilities
            );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Accommodation not found"
            });
        }

        res.status(200).json({
            message: "Accommodation updated successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update accommodation"
        });
    }
};


// DELETE
const deleteAccommodation = async (req, res) => {
    try {
        const { id } = req.params;

        const result =
            await accommodationModel.deleteAccommodation(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Accommodation not found"
            });
        }

        res.status(200).json({
            message: "Accommodation deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete accommodation"
        });
    }
};


module.exports = {
    createAccommodation,
    getAllAccommodations,
    getAccommodationById,
    updateAccommodation,
    deleteAccommodation
};