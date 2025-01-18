-- Create database
CREATE DATABASE red_hearts;

-- Use the database
USE red_hearts;

-- Table for donors
CREATE TABLE donors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    dob DATE,
    gender ENUM('male', 'female', 'other'),
    state VARCHAR(100),
    city VARCHAR(100),
    phone VARCHAR(10),
    email VARCHAR(100),
    blood_type ENUM('A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'),
    medical_history TEXT,
    organ_to_donate VARCHAR(50),
    smoke ENUM('yes', 'no'),
    alcohol ENUM('yes', 'no')
);

-- Table for recipients
CREATE TABLE recipients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    dob DATE,
    gender ENUM('male', 'female', 'other'),
    state VARCHAR(100),
    city VARCHAR(100),
    phone VARCHAR(10),
    email VARCHAR(100),
    blood_type ENUM('A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'),
    organ_required VARCHAR(50),
    medical_history TEXT
);

-- Table for Indian states
CREATE TABLE states (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

-- Table for cities
CREATE TABLE cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    state_id INT,
    name VARCHAR(100),
    FOREIGN KEY (state_id) REFERENCES states(id)
);

-- Insert Indian states
INSERT INTO states (name) VALUES 
('Andhra Pradesh'), ('Bihar'), ('Delhi'), ('Karnataka'), ('Maharashtra');

-- Insert cities for each state
INSERT INTO cities (state_id, name) VALUES
(1, 'Vishakhapatnam'), (1, 'Amaravati'),
(2, 'Patna'), (2, 'Gaya'),
(3, 'New Delhi'), (3, 'South Delhi'),
(4, 'Bangalore'), (4, 'Mysore'),
(5, 'Mumbai'), (5, 'Pune');
