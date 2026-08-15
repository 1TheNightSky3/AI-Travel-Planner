const express = require("express");
const cors = require("cors");

const tripRoutes = require("./routes/tripRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "AI Travel Planner Backend is running"
    });
});

// Trip routes
app.use("/api/trips", tripRoutes);

// Expense routes
app.use("/api/expenses", expenseRoutes);

module.exports = app;