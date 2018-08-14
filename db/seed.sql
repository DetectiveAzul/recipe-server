INSERT INTO
recipes (name, description)
VALUES ('Lasagna', 'Italian Pasta');

SELECT * FROM recipes;

INSERT INTO
ingredients (name, description, measure_type)
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
quantities(recipe_id, ingredient_id, measurement_id, ingredient_quantity)
VALUES(1, 1, 1, 4);

SELECT * FROM quantities;

INSERT INTO
recipe_steps(recipe_id, step_number, step_description)
VALUES(1, 1, 'Throw the eggs');

SELECT * FROM recipe_steps;
