const express = require("express");

const router = express.Router();

const {
    createTrip,
    getAllTrips,
    getTripById,
    updateTrip,
    deleteTrip
} = require("../controllers/tripController");


// CREATE
router.post("/", createTrip);

// READ ALL
router.get("/", getAllTrips);

// READ BY ID
router.get("/:id", getTripById);

// UPDATE
router.put("/:id", updateTrip);

// DELETE
router.delete("/:id", deleteTrip);


module.exports = router;