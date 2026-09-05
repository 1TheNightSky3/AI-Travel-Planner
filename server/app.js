const express = require("express");
const cors = require("cors");

const tripRoutes = require("./routes/tripRoutes");
const accommodationRoutes = require("./routes/accommodationRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const userRoutes = require("./routes/userRoutes");
const travelPreferenceRoutes = require("./routes/travelPreferenceRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "AI Travel Planner Backend is running"
    });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Trip routes
app.use("/api/trips", tripRoutes);

// Accommodation routes
app.use("/api/accommodations", accommodationRoutes);

// User routes
app.use("/api/users", userRoutes);

// Travel preference routes
app.use("/api/preferences", travelPreferenceRoutes);

// Expense routes
app.use("/api/expenses", expenseRoutes);

module.exports = app;