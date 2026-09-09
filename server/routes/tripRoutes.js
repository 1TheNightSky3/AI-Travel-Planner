// const express = require("express");

// const router = express.Router();

// const {
//     createTrip,
//     getAllTrips,
//     getTripById,
//     updateTrip,
//     deleteTrip
// } = require("../controllers/tripController");


// // CREATE
// router.post("/", createTrip);

// // READ ALL
// router.get("/", getAllTrips);

// // READ BY ID
// router.get("/:id", getTripById);

// // UPDATE
// router.put("/:id", updateTrip);

// // DELETE
// router.delete("/:id", deleteTrip);


// module.exports = router;
//-------------------------------------------------------------------
// const express = require("express");
// const router = express.Router();

// const tripController = require("../controllers/tripController");
// const authenticateToken = require("../middleware/authMiddleware");

// router.get("/", authenticateToken, tripController.getAllTrips);
// router.post("/", authenticateToken, tripController.createTrip);
// router.put("/:id", authenticateToken, tripController.updateTrip);
// router.delete("/:id", authenticateToken, tripController.deleteTrip);

// module.exports = router;
//------------------------------------------------------------------------
// const express = require("express");
// const router = express.Router();

// const tripController = require("../controllers/tripController");
// const authenticateToken = require("../middleware/authMiddleware");
// const authorizeRole = require("../middleware/roleMiddleware");

// // Protected routes
// router.get("/", authenticateToken, tripController.getAllTrips);
// router.post("/", authenticateToken, tripController.createTrip);
// router.put("/:id", authenticateToken, tripController.updateTrip);
// router.delete("/:id", authenticateToken, tripController.deleteTrip);

// // Admin-only route
// router.delete(
//     "/admin/all",
//     authenticateToken,
//     authorizeRole("admin"),
//     (req, res) => {
//         res.json({
//             message: "Admin access granted",
//             user: req.user
//         });
//     }
// );

// module.exports = router;
//----
// const express = require("express");

// const router = express.Router();

// const tripController = require("../controllers/tripController");
// const authenticateToken = require("../middleware/authMiddleware");
// const authorizeRole = require("../middleware/roleMiddleware");

// // ===============================
// // ADMIN-ONLY TEST ROUTE
// // ===============================

// router.get(
//     "/admin/test",
//     authenticateToken,
//     authorizeRole("admin"),
//     (req, res) => {
//         res.status(200).json({
//             message: "Admin access granted",
//             user: req.user
//         });
//     }
// );


// // ===============================
// // PROTECTED TRIP ROUTES
// // ===============================

// router.get(
//     "/",
//     authenticateToken,
//     tripController.getAllTrips
// );

// router.post(
//     "/",
//     authenticateToken,
//     tripController.createTrip
// );

// router.put(
//     "/:id",
//     authenticateToken,
//     tripController.updateTrip
// );

// router.delete(
//     "/:id",
//     authenticateToken,
//     tripController.deleteTrip
// );


// module.exports = router;
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
const express = require("express");
const router = express.Router();

const tripController = require("../controllers/tripController");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

// ===============================
// ADMIN-ONLY TEST ROUTE
// ===============================

router.get(
    "/admin/test",
    authenticateToken,
    authorizeRole("admin"),
    (req, res) => {
        res.status(200).json({
            message: "Admin access granted",
            user: req.user
        });
    }
);

// ===============================
// ADMIN-ONLY GET ALL TRIPS
// ===============================

router.get(
    "/admin/all",
    authenticateToken,
    authorizeRole("admin"),
    tripController.getAllTrips
);

// ===============================
// PROTECTED TRIP ROUTES
// ===============================

router.get(
    "/",
    authenticateToken,
    tripController.getAllTrips
);

router.post(
    "/",
    authenticateToken,
    tripController.createTrip
);

router.put(
    "/:id",
    authenticateToken,
    tripController.updateTrip
);

router.delete(
    "/:id",
    authenticateToken,
    tripController.deleteTrip
);

module.exports = router;