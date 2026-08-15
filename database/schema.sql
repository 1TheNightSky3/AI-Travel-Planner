CREATE DATABASE IF NOT EXISTS travel_planner;

USE travel_planner;


-- ============================================
-- TRIPS TABLE
-- Existing Mou's table
-- ============================================

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

-- ============================================
-- EXPENSES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS trip_expenses (
    expense_id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT NOT NULL,
    expense_category ENUM(
        'Accommodation',
        'Transportation',
        'Food',
        'Activity',
        'Other'
    ) NOT NULL,
    description VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    expense_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);


-- ============================================
-- USERS TABLE
-- Nusrat's table
-- ============================================

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    country VARCHAR(100),
    profile_picture VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- ============================================
-- USER TRAVEL PREFERENCES TABLE
-- Nusrat's table
-- ============================================

CREATE TABLE IF NOT EXISTS user_travel_preferences (
    preference_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    trip_type ENUM('Solo','Couple','Family','Friends','Group') NOT NULL,
    travel_style ENUM('Adventure','Relaxation','Cultural','Luxury','Budget') NOT NULL,
    preferred_budget DECIMAL(15,2),
    budget_currency CHAR(3),
    preferred_destination VARCHAR(100),
    preferred_trip_duration VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);