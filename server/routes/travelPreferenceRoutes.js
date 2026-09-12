const express = require("express");

const router = express.Router();

const travelPreferenceController = require("../controllers/travelPreferenceController");


// CREATE
router.post("/", travelPreferenceController.createPreference);


// READ ALL
router.get("/", travelPreferenceController.getAllPreferences);


// READ BY ID
router.get("/:id", travelPreferenceController.getPreferenceById);


// UPDATE
router.put("/:id", travelPreferenceController.updatePreference);


// DELETE
router.delete("/:id", travelPreferenceController.deletePreference);


module.exports = router;
