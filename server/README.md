```markdown
#  AI-TRAVEL-PLANNER API Documentation

## Base URL
`http://103.191.241.107:5000/api`

---

## 1. POST /api/trips

Create a new trip plan.

### Request Headers

| Header | Type | Value | Required |
| :----- | :--- | :---- | :------- |
| `Content-Type` | `string` | `application/json` | Yes |

### Request Body Schema

| Field | Type | Required | Description |
| :---- | :--- | :------- | :---------- |
| `user_id` | `integer` | **Yes** | ID of the user creating the trip |
| `destination` | `string` | **Yes** | Travel destination (e.g., "Cox's Bazar") |
| `start_date` | `string` (date) | **Yes** | Trip start date in YYYY-MM-DD format |
| `end_date` | `string` (date) | **Yes** | Trip end date in YYYY-MM-DD format |
| `budget` | `number` | **Yes** | Total budget for the trip in BDT |
| `description` | `string` | No | Additional details about the trip |

### Example Request Body

```json
{
  "user_id": 1,
  "destination": "Cox's Bazar",
  "start_date": "2026-08-20",
  "end_date": "2026-08-23",
  "budget": 15000,
  "description": "Beach vacation"
}
```

### Example Responses

**Success (201 Created)**

```json
{
  "message": "Trip created successfully",
  "tripId": 4
}
```

**Validation Failure (400 Bad Request)**

```json
{
  "errCode": 100,
  "errMsg": "User ID is required"
}
```

```json
{
  "errCode": 101,
  "errMsg": "Destination is required"
}
```

```json
{
  "errCode": 102,
  "errMsg": "Start date is required"
}
```

```json
{
  "errCode": 103,
  "errMsg": "End date is required"
}
```

```json
{
  "errCode": 107,
  "errMsg": "Budget is required"
}
```

**Server Failure (500 Internal Server Error)**

```json
{
  "errCode": 104,
  "errMsg": "Failed to create trip due to internal server error"
}
```

---

## 2. GET /api/trips

Retrieve all trips.

### Request Headers

| Header | Type | Value | Required |
| :----- | :--- | :---- | :------- |
| `Content-Type` | `string` | `application/json` | Yes |

### Query Parameters (Optional)

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `user_id` | `integer` | Filter trips by user ID |

### Example Request

```
GET http://103.191.241.107:5000/api/trips
```

### Example Response

**Success (200 OK)**

```json
[
  {
    "id": 2,
    "user_id": 1,
    "destination": "Cox's Bazar",
    "start_date": "2026-08-20T00:00:00.000Z",
    "end_date": "2026-08-23T00:00:00.000Z",
    "budget": "15000.00",
    "description": "Beach vacation",
    "created_at": "2026-08-14T15:23:07.000Z",
    "updated_at": "2026-08-14T19:45:44.000Z"
  },
  {
    "id": 3,
    "user_id": 1,
    "destination": "Cox's Bazar",
    "start_date": "2026-08-20T00:00:00.000Z",
    "end_date": "2026-08-23T00:00:00.000Z",
    "budget": "15000.00",
    "description": "Beach vacation",
    "created_at": "2026-08-14T17:16:29.000Z",
    "updated_at": "2026-08-14T17:16:29.000Z"
  },
  {
    "id": 4,
    "user_id": 1,
    "destination": "Cox's Bazar",
    "start_date": "2026-08-20T00:00:00.000Z",
    "end_date": "2026-08-23T00:00:00.000Z",
    "budget": "15000.00",
    "description": "Beach vacation",
    "created_at": "2026-08-14T19:36:57.000Z",
    "updated_at": "2026-08-14T19:36:57.000Z"
  }
]
```

**Not Found (404 Not Found)**

```json
{
  "errCode": 105,
  "errMsg": "No trips found"
}
```

---

## 3. GET /api/trips/{id}

Retrieve a specific trip by ID.

### Request Headers

| Header | Type | Value | Required |
| :----- | :--- | :---- | :------- |
| `Content-Type` | `string` | `application/json` | Yes |

### URL Parameters

| Parameter | Type | Required | Description |
| :-------- | :--- | :------- | :---------- |
| `id` | `integer` | **Yes** | ID of the trip to retrieve |

### Example Request

```
GET http://103.191.241.107:5000/api/trips/2
```

### Example Response

**Success (200 OK)**

```json
{
  "id": 2,
  "user_id": 1,
  "destination": "Cox's Bazar",
  "start_date": "2026-08-20T00:00:00.000Z",
  "end_date": "2026-08-23T00:00:00.000Z",
  "budget": "15000.00",
  "description": "Beach vacation",
  "created_at": "2026-08-14T15:23:07.000Z",
  "updated_at": "2026-08-14T19:45:44.000Z"
}
```

**Not Found (404 Not Found)**

```json
{
  "errCode": 106,
  "errMsg": "Trip not found"
}
```

---

## 4. PUT /api/trips/{id}

Update an existing trip by ID.

### Request Headers

| Header | Type | Value | Required |
| :----- | :--- | :---- | :------- |
| `Content-Type` | `string` | `application/json` | Yes |

### URL Parameters

| Parameter | Type | Required | Description |
| :-------- | :--- | :------- | :---------- |
| `id` | `integer` | **Yes** | ID of the trip to update |

### Request Body Schema

| Field | Type | Required | Description |
| :---- | :--- | :------- | :---------- |
| `user_id` | `integer` | No | Updated user ID |
| `destination` | `string` | No | Updated destination |
| `start_date` | `string` (date) | No | Updated start date |
| `end_date` | `string` (date) | No | Updated end date |
| `budget` | `number` | No | Updated budget |
| `description` | `string` | No | Updated description |

### Example Request Body

```json
{
  "user_id": 1,
  "destination": "Cox's Bazar",
  "start_date": "2026-08-20",
  "end_date": "2026-08-23",
  "budget": 15000,
  "description": "Beach vacation"
}
```

### Example Response

**Success (200 OK)**

```json
{
  "message": "Trip updated successfully"
}
```

**Not Found (404 Not Found)**

```json
{
  "errCode": 106,
  "errMsg": "Trip not found"
}
```

---

## 5. DELETE /api/trips/{id}

Delete a trip by ID.

### Request Headers

| Header | Type | Value | Required |
| :----- | :--- | :---- | :------- |
| `Content-Type` | `string` | `application/json` | Yes |

### URL Parameters

| Parameter | Type | Required | Description |
| :-------- | :--- | :------- | :---------- |
| `id` | `integer` | **Yes** | ID of the trip to delete |

### Example Request

```
DELETE http://103.191.241.107:5000/api/trips/2
```

### Example Response

**Success (200 OK)**

```json
{
  "message": "Trip deleted successfully"
}
```

**Not Found (404 Not Found)**

```json
{
  "errCode": 106,
  "errMsg": "Trip not found"
}
```



## 🚀 Quick Start

### Create a Trip
```bash
curl -X POST http://103.191.241.107:5000/api/trips \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "destination": "Cox'\''s Bazar",
    "start_date": "2026-08-20",
    "end_date": "2026-08-23",
    "budget": 15000,
    "description": "Beach vacation"
  }'
```

### Get All Trips
```bash
curl http://103.191.241.107:5000/api/trips
```

### Get Single Trip
```bash
curl http://103.191.241.107:5000/api/trips/2
```

### Update a Trip
```bash
curl -X PUT http://103.191.241.107:5000/api/trips/2 \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Saint Martin",
    "budget": 20000
  }'
```

### Delete a Trip
```bash
curl -X DELETE http://103.191.241.107:5000/api/trips/2
```

---

