INSERT INTO
recipes (name, description, prep_time, cook_time)
VALUES ('Lasagna', 'Italian Pasta', '01:00', '02:00');

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
quantities(recipe_id, ingredient_id, measurement_id, ingredient_quantity)
VALUES(1, 1, 1, 4);

SELECT * FROM quantities;

INSERT INTO
steps(recipe_id, step_number, step_description)
VALUES(1, 1, 'Throw the eggs');

SELECT * FROM steps;
