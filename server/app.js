const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const corsOptions = require("./middleware/corsOptions");

const tripRoutes = require("./routes/tripRoutes");
const accommodationRoutes = require("./routes/accommodationRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const userRoutes = require("./routes/userRoutes");
const travelPreferenceRoutes = require("./routes/travelPreferenceRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "AI Travel Planner Backend is running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/accommodations", accommodationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/preferences", travelPreferenceRoutes);
app.use("/api/expenses", expenseRoutes);

module.exports = app;