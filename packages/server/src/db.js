import SQL from '@nearform/sql';

export async function getToppings({pg}) {
  const {rows} = await pg.query('SELECT * FROM toppings');
  return rows;
}

export async function getPizzas({pg}) {
  const {rows} = await pg.query('SELECT * FROM pizzas');
  return rows;
}

export async function getPizza({pg}, id) {
  const {rows} = await pg.query(SQL`SELECT * FROM pizzas WHERE id = ${id}`);
  return rows[0];
}

export async function getToppingsForPizzas(pizzas, {pg}) {
  const pizzaIds = pizzas.map((p) => p.id);
  const {rows} = await pg.query(
    SQL`SELECT json_agg(json_build_object('id', toppings.id, 'name', toppings.name, 'typeId', topping_types.id, 'type', topping_types.name)) as toppings
        FROM pizzas
        INNER JOIN pizzas_toppings
          ON pizzas_toppings.pizza = pizzas.id
          AND pizzas.id = ANY(${pizzaIds})
        INNER JOIN toppings
          ON toppings.id = pizzas_toppings.topping
        INNER JOIN topping_types
          ON topping_types.id = toppings.topping_type 
        GROUP BY pizzas.id`,
  );
  return rows.map((r) => r.toppings);
}
