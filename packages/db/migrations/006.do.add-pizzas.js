function generateSql() {
  return `${insertPizzas()}

${insertPizzaToppings()}`;
}

const pizzas = [
  ['margarite', ['tomato sauce', 'mozzarella', 'fresh basil']],
  ['classico', ['tomato sauce', 'mozzarella', 'ham', 'mushrooms']],
];

function insertPizzas() {
  const values = pizzas.map(([name]) => `('${name}')`);
  return `INSERT INTO pizzas(name) VALUES ${values.join(', ')};`;
}

function insertPizzaToppings() {
  const values = pizzas.flatMap(([name, toppings]) =>
    toppings.map(
      (topping) =>
        `((SELECT id FROM pizzas WHERE name = '${name}'), (SELECT id FROM toppings WHERE name = '${topping}'))`,
    ),
  );

  return `INSERT INTO pizzas_toppings(pizza, topping) VALUES ${values.join(
    ', ',
  )};`;
}

module.exports = {generateSql};
