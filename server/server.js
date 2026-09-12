// const app = require("./app");

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// require("dotenv").config();

// const app = require("./app");

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
require("dotenv").config();

const fs = require("fs");
const http = require("http");
const https = require("https");

const app = require("./app");

const HTTP_PORT = 5000;
const HTTPS_PORT = 5443;

// SSL certificate
const sslOptions = {
    key: fs.readFileSync("./certs/localhost+2-key.pem"),
    cert: fs.readFileSync("./certs/localhost+2.pem")
};

// HTTPS Server
https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server running at https://localhost:${HTTPS_PORT}`);
});

// HTTP → HTTPS Redirect
http.createServer((req, res) => {
    res.writeHead(301, {
        Location: `https://localhost:${HTTPS_PORT}${req.url}`
    });

    res.end();
}).listen(HTTP_PORT, () => {
    console.log(`HTTP Server running at http://localhost:${HTTP_PORT}`);
});