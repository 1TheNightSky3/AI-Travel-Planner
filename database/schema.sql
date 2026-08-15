CREATE DATABASE IF NOT EXISTS travel_planner;

USE travel_planner;

CREATE TABLE IF NOT EXISTS trips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    destination VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    budget DECIMAL(10,2),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS accommodations (
    accommodation_id INT AUTO_INCREMENT PRIMARY KEY,
    destination VARCHAR(255) NOT NULL,
    accommodation_name VARCHAR(255) NOT NULL,
    address VARCHAR(500),
    price_per_night DECIMAL(10,2) NOT NULL,
    rating DECIMAL(3,2),
    facilities TEXT
);