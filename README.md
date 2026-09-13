# AI-Travel-Planner
# LAB 06 — HTTPS, Rate Limiting, and Security Hardening

## Security Measures Implemented

### 1. HTTPS with SSL Certificate

HTTPS was configured using Nginx and a local SSL certificate.

* SSL certificate and private key were generated for local development.
* Nginx listens on HTTPS port `443`.
* HTTP traffic on port `80` is automatically redirected to HTTPS.
* API requests are proxied from Nginx to the backend server.

**Test Result:**

```text
HTTP → 301 Moved Permanently
Location: https://localhost/

HTTPS → 200 OK
```

---

### 2. Rate Limiting

Rate limiting was implemented using `express-rate-limit`.

The authentication endpoints are limited to **5 requests within 15 minutes**.

```text
Window: 15 minutes
Maximum requests: 5
```

If the limit is exceeded, the server returns:

```text
HTTP/1.1 429 Too Many Requests
```

**Test Result:**
The 6th consecutive login attempt was blocked with HTTP `429`.

---

### 3. Security Headers with Helmet

`Helmet` was added to the Express application to provide security-related HTTP headers.

Important headers verified during testing include:

```text
Content-Security-Policy
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: no-referrer
Cross-Origin-Opener-Policy
Cross-Origin-Resource-Policy
Strict-Transport-Security
```

**Test Result:**
Security headers were successfully returned by the backend.

---

### 4. User Input Validation and Sanitization

`express-validator` was used for validating authentication input.

Validation includes:

* Full name cannot be empty.
* Full name length is restricted.
* Email must have a valid email format.
* Email is trimmed and normalized.
* Password must contain at least 8 characters.
* Invalid requests are rejected with HTTP `400`.

Example invalid request:

```json
{
  "full_name": "A",
  "email": "wrong-email",
  "password": "123"
}
```

**Test Result:**
The server correctly returned validation errors with HTTP `400 Bad Request`.

The application also uses parameterized SQL queries, which helps prevent SQL injection.

---

### 5. Restricted CORS

CORS was configured using an origin whitelist.

Allowed origins include:

```text
http://localhost:5173
http://localhost
https://localhost
```

Requests from unknown origins are rejected.

**Allowed Origin Test:**

```text
Origin: http://localhost:5173

Result:
Access-Control-Allow-Origin: http://localhost:5173
```

**Blocked Origin Test:**

```text
Origin: http://evil.com

Result:
HTTP/1.1 500 Internal Server Error
Error: Not allowed by CORS
```

Therefore, unrestricted:

```text
Access-Control-Allow-Origin: *
```

is no longer used.

---

## Final Security Testing Summary

| Security Feature             | Test Result |
| ---------------------------- | ----------- |
| HTTPS / SSL                  | Passed      |
| HTTP → HTTPS Redirect        | Passed      |
| Authentication Rate Limiting | Passed      |
| Helmet Security Headers      | Passed      |
| Input Validation             | Passed      |
| Restricted CORS              | Passed      |

## Conclusion

The AI Travel Planner backend was hardened by implementing HTTPS, authentication rate limiting, security headers, input validation and normalization, parameterized database queries, and restricted CORS. All implemented security measures were tested successfully in the local Docker environment.
