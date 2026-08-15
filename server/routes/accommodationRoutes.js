const express = require("express");

const router = express.Router();

const {
    createAccommodation,
    getAllAccommodations,
    getAccommodationById,
    updateAccommodation,
    deleteAccommodation
} = require("../controllers/accommodationController");


// CREATE
router.post("/", createAccommodation);

// READ ALL
router.get("/", getAllAccommodations);

// READ BY ID
router.get("/:id", getAccommodationById);

// UPDATE
router.put("/:id", updateAccommodation);

// DELETE
router.delete("/:id", deleteAccommodation);

module.exports = router;