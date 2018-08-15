INSERT INTO
recipes (name, description)
VALUES ('Lasagna', 'Italian Pasta');

SELECT * FROM recipes;

INSERT INTO
ingredients (name)
VALUES ('Egg');

SELECT * FROM ingredients;


INSERT INTO
measurements(name)
VALUES ('unit');

INSERT INTO
measurements(name)
VALUES ('pint');

SELECT * FROM measurements;

INSERT INTO
quantities(recipeId, ingredientId, measurementId, ingredientQuantity)
VALUES(1, 1, 1, 4);

SELECT * FROM quantities;

INSERT INTO
steps(recipeId, stepNumber, stepDescription)
VALUES(1, 1, 'Throw the eggs');

SELECT * FROM steps;
