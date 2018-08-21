DROP TABLE IF EXISTS steps;
DROP TABLE IF EXISTS quantities;
DROP TABLE IF EXISTS measurements;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipes; 

CREATE TABLE recipes(
  id SERIAL8 PRIMARY KEY,
  name VARCHAR(255),
  description TEXT
);

CREATE TABLE ingredients(
  id SERIAL8 PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE measurements(
  id SERIAL8 PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE quantities(
  id SERIAL8 PRIMARY KEY,
  recipeId INT8 REFERENCES recipes(id) ON DELETE CASCADE,
  ingredientId INT8 REFERENCES ingredients(id) ON DELETE CASCADE,
  measurementId INT8 REFERENCES measurements(id) ON DELETE CASCADE,
  ingredientQuantity DECIMAL(8,2)
);

CREATE TABLE steps(
  id SERIAL8 PRIMARY KEY,
  recipeId INT8 REFERENCES recipes(id) ON DELETE CASCADE,
  stepNumber INT8,
  stepDescription TEXT
);
