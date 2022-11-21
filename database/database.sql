CREATE DATABASE music_app;

USE music_app;

CREATE TABLE users (
    username VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL
);

CREATE TABLE friends (
    id INT PRIMARY KEY auto_increment,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    FOREIGN KEY(username) REFERENCES users(username)
);




INSERT INTO users(username, name, password, email) VALUES ('user_test', 'test', 'test', 'test@test.com');