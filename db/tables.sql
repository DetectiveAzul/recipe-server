DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes(
  id SERIAL8 PRIMARY KEY,
  name VARCHAR(255),
  description TEXT
);
