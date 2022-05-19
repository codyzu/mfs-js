import SQL from '@nearform/sql';

export async function getToppings({pg}) {
  const {rows} = await pg.query('SELECT * FROM toppings');
  return rows;
}

export async function getPizzas({pg}) {
  const {rows} = await pg.query('SELECT * FROM pizzas');
  return rows;
}

export async function getToppingsForPizzas(pizzas, {pg}) {
  const pizzaIds = pizzas.map((p) => p.id);
  const {rows} = await pg.query(
    SQL`SELECT json_agg(toppings.*) as toppings
        FROM pizzas
        INNER JOIN pizzas_toppings
          ON pizzas_toppings.pizza = pizzas.id
          AND pizzas.id = ANY(${pizzaIds})
        INNER JOIN toppings
          ON toppings.id = pizzas_toppings.topping
        GROUP BY pizzas.id`,
  );
  return rows.map((r) => r.toppings);
}

export async function getToppingTypesForToppings(toppings, {pg}) {
  const toppingNames = toppings.map((t) => t.name);
  const {rows} = await pg.query(
    SQL`SELECT topping_types.*
        FROM topping_types
        INNER JOIN toppings
          ON toppings.topping_type = topping_types.id
          AND toppings.name = ANY(${toppingNames})`,
  );
  return rows;
}
