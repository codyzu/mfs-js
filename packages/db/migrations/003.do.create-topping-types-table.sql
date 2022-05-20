CREATE TABLE topping_types(id SERIAL PRIMARY KEY, name VARCHAR (50) NOT NULL);

CREATE TABLE toppings(
  id SERIAL PRIMARY KEY,
  name VARCHAR (50) NOT NULL,
  topping_type INTEGER NOT NULL,
  CONSTRAINT fk_topping_type FOREIGN KEY(topping_type) REFERENCES topping_types(id)
);