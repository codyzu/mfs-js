function generateSql() {
  return `${insertToppingTypes()}

${insertToppings()}`;
}

const toppings = [
  ['ham', 'meat'],
  ['peperoni', 'meat'],
  ['mushrooms', 'vegetable'],
  ['fresh basil', 'vegetable'],
  ['artichoke hearts', 'vegetable'],
  ['mozzarella', 'cheese'],
  ['tomato sauce', 'sauce'],
  ['creme', 'sauce'],
];

function insertToppingTypes() {
  const toppingTypes = new Set(toppings.map(([, toppingType]) => toppingType));
  const values = [...toppingTypes.values()].map(
    (toppingType) => `('${toppingType}')`,
  );
  return `INSERT INTO topping_types(name) VALUES ${values.join(', ')};`;
}

function insertToppings() {
  const values = toppings.map(
    ([topping, type]) =>
      `('${topping}', (SELECT id FROM topping_types WHERE name = '${type}'))`,
  );

  return `INSERT INTO toppings(name, topping_type) VALUES ${values.join(
    ', ',
  )};`;
}

module.exports = {generateSql};
