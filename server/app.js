const express = require("express");
const cors = require("cors");

const tripRoutes = require("./routes/tripRoutes");
const accommodationRoutes = require("./routes/accommodationRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "AI Travel Planner Backend is running"
    });
});

app.use("/api/trips", tripRoutes);
app.use("/api/accommodations", accommodationRoutes);

module.exports = app;