CREATE TABLE pizzas(
  id SERIAL PRIMARY KEY,
  name VARCHAR (50) NOT NULL,
  image TEXT
);

CREATE TABLE pizzas_toppings(
  pizza INTEGER REFERENCES pizzas(id),
  topping INTEGER REFERENCES toppings(id),
  CONSTRAINT pk_pizza_topping PRIMARY KEY (pizza, topping)
);