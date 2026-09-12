CREATE DATABASE IF NOT EXISTS travel_planner;

USE travel_planner;

Create table if not exists users (
    id int auto_increment primary key ,
    name varchar(100) not null ,
    email varchar(150) not null unique ,
    password varchar(155) not null,
    role enum('user','admin') default 'user',
    created_at timestamp default current_timestamp
);

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