CREATE TABLE pizzas(
  id TEXT PRIMARY KEY,
  name VARCHAR (50) NOT NULL,
  description TEXT,
  image TEXT
);

CREATE TABLE pizzas_toppings(
  pizza TEXT REFERENCES pizzas(id),
  topping INTEGER REFERENCES toppings(id),
  CONSTRAINT pk_pizza_topping PRIMARY KEY (pizza, topping)
);
