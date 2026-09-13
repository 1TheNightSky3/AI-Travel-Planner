
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");

const tripRoutes = require("./routes/tripRoutes");
const accommodationRoutes = require("./routes/accommodationRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const userRoutes = require("./routes/userRoutes");
const travelPreferenceRoutes = require("./routes/travelPreferenceRoutes");

const app = express();

// Security headers
app.use(helmet());

// CORS
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost",
    "https://localhost"
];

app.use(cors({
    origin: function (origin, callback) {

        // Allow requests without an Origin header
        // such as Postman or curl
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    }
}));

// Parse JSON request body
app.use(express.json());

// Rate limiter for authentication endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: "Too many authentication attempts. Please try again later."
    }
});

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "AI Travel Planner Backend is running"
    });
});

// Authentication routes
app.use("/api/auth", authLimiter, authRoutes);

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
