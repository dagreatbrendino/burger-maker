DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci;

USE burgers_db;

CREATE TABLE burgers(
    id INTEGER NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR(50) NOT NULL,
    devoured BOOLEAN DEFAULT FALSE,
    ingredients JSON NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE ingredients(
	id INTEGER NOT NULL AUTO_INCREMENT,
    ingredient_name VARCHAR (50) NOT NULL,
    PRIMARY KEY(`id`)
);



