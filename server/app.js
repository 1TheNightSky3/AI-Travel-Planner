// const express = require("express");
// const cors = require("cors");

// const tripRoutes = require("./routes/tripRoutes");
// const authRoutes = require("./routes/authRoutes");
// const app = express();

// app.use(cors());

// app.use(express.json());

// app.get("/", (req, res) => {
//     res.json({
//         message: "AI Travel Planner Backend is running"
//     });
// });

// app.use("/api/trips", tripRoutes);
// app.use("/api/auth", authRoutes);
// module.exports = app;

// const express = require("express");
// const cors = require("cors");

// const tripRoutes = require("./routes/tripRoutes");
// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//     res.json({
//         message: "AI Travel Planner Backend is running"
//     });
// });

// app.use("/api/trips", tripRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// module.exports = app;

// const express = require("express");
// const cors = require("cors");
// const helmet = require("helmet");

// const tripRoutes = require("./routes/tripRoutes");
// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");

// const app = express();

// // Security Headers
// app.use(helmet());

// // Restricted CORS
// app.use(cors({
//     origin: "https://travelgenie.me",
//     methods: ["GET", "POST", "PUT", "DELETE"]
// }));

// // Parse JSON request body
// app.use(express.json());

// // Home route
// app.get("/", (req, res) => {
//     res.json({
//         message: "AI Travel Planner Backend is running"
//     });
// });

// // Routes
// app.use("/api/trips", tripRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// module.exports = app;

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const tripRoutes = require("./routes/tripRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Security Headers
app.use(helmet());

// Restricted CORS
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Parse JSON request body
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "AI Travel Planner Backend is running"
    });
});

// Routes
app.use("/api/trips", tripRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

module.exports = app;