const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const authenticateToken = require("./middleware/authMiddleware");
const authorizeRole = require("./middleware/roleMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Public route
app.get("/", (req, res) => {
    res.json({
        message: "Authentication & Authorization API is running"
    });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// User CRUD routes
app.use("/api/users", userRoutes);

// Protected route
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({
        message: "You accessed a protected route",
        user: req.user
    });
});

// Admin-only protected route
app.get(
    "/api/admin",
    authenticateToken,
    authorizeRole("ADMIN"),
    (req, res) => {
        res.json({
            message: "Welcome Admin",
            user: req.user
        });
    }
);

module.exports = app;