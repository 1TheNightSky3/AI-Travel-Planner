const allowedOrigins = [
    "http://localhost"
];

const corsOptions = {
    origin: function (origin, callback) {

        // Allow Postman and server-to-server requests
        // where Origin header is not present
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },

    methods: [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH"
    ],

    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ],

    credentials: true
};

module.exports = corsOptions;