function generateSql() {
  return `${insertPizzas()}

${insertToppingTypes}

${insertToppings()}`;
}

const pizzas = [
  [
    'Napolitaine',
    [
      ['tomato sauce', 'sauce'],
      ['mozzarella', 'cheese'],
      ['fresh garlic', 'vegetable'],
      ['olives', 'vegetable'],
      ['anchovies', 'meat'],
    ],
  ],
  [
    'Reine',
    [
      ['tomato sauce', 'sauce'],
      ['mozzarella', 'cheese'],
      ['mushrooms', 'vegetable'],
      ['ham', 'meat'],
      ['olives', 'vegetable'],
    ],
  ],
];

function insertPizzas() {
  const values = pizzas.map(([name]) => `('${name}')`);
  return `INSERT INTO pizzas(name) VALUES ${values.join(', ')};`;
}

function insertToppingTypes() {
  const toppingTypes = new Set(
    pizzas.flatMap(([_, toppings]) =>
      toppings.map(([_, toppingType]) => toppingType),
    ),
  );
  const values = [...toppingTypes.values()].map(
    (toppingType) => `('${toppingType}')`,
  );
  return `INSERT INTO topping_types(name) VALUES ${values.join(', ')};`;
}

function insertToppings() {
  const toppings = new Map(pizzas.flatMap(([_, toppings]) => toppings));
  const values = [...toppings.entries()].map(
    ([topping, type]) =>
      `('${topping}', (SELECT id FROM topping_types WHERE name = '${type}'))`,
  );
  return `INSERT INTO toppings(name, topping_type) VALUES ${values.join(
    ', ',
  )};`;
}

module.exports = {generateSql};
