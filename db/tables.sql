DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS ingredients;

CREATE TABLE recipes(
  id SERIAL8 PRIMARY KEY,
  name VARCHAR(255),
  description TEXT
);

CREATE TABLE ingredients(
  id SERIAL8 PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  measure_type VARCHAR(255)
);
