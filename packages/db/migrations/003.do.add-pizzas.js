import {customAlphabet} from 'nanoid';
import dictionaries from 'nanoid-dictionary';
import urlSlug from 'url-slug';

export function generateSql() {
  return `${insertPizzas()}

${insertToppingTypes()}

${insertToppings()}

${insertPizzaToppings()}`;
}

const {lowercase, numbers} = dictionaries;
const nanoid = customAlphabet(lowercase + numbers, 5);
function nameToId(name) {
  return urlSlug(`${name}-${nanoid()}`);
}

const pizzas = [
  {
    name: 'Napolitaine',
    description:
      'Take a voyage to the south of Italy on its western coast where the combination of fresh basil and mozzarella make for a mouth watering delight!',
    toppings: [
      {name: 'tomato sauce', type: 'sauce'},
      {name: 'mozzarella', type: 'cheese'},
      {name: 'fresh garlic', type: 'vegetable'},
      {name: 'olives', type: 'vegetable'},
      {name: 'anchovies', type: 'meat'},
    ],
    image: '/images/pizza1.jpg',
  },
  {
    name: 'Reine',
    description:
      'A pizza fit for a queen. Using the best ingredients to recreate a classic, this pizza is sure to please even the pickiest of pizza lovers.',
    toppings: [
      {name: 'tomato sauce', type: 'sauce'},
      {name: 'mozzarella', type: 'cheese'},
      {name: 'mushrooms', type: 'vegetable'},
      {name: 'ham', type: 'meat'},
      {name: 'olives', type: 'vegetable'},
    ],
    image: '/images/pizza2.jpg',
  },
];

function insertPizzas() {
  const values = pizzas.map(
    ({name, description, image}) =>
      `('${nameToId(name)}', '${name}', '${description}', '${image}')`,
  );
  return `INSERT INTO pizzas(id, name, description, image) VALUES ${values.join(
    ', ',
  )};`;
}

function insertToppingTypes() {
  // Use a set to remove duplicates
  const toppingTypes = new Set(
    pizzas.flatMap(({toppings}) => toppings).map(({type}) => type),
  );
  const values = [...toppingTypes.values()].map(
    (toppingType) => `('${toppingType}')`,
  );
  return `INSERT INTO topping_types(name) VALUES ${values.join(', ')};`;
}

function insertToppings() {
  // Use a map to remove duplicates based on the topping name (key in the map)
  const toppings = new Map(
    pizzas
      .flatMap(({toppings}) => toppings)
      .map((topping) => [topping.name, topping.type]),
  );
  const values = [...toppings.entries()].map(
    ([topping, type]) =>
      `('${topping}', (SELECT id FROM topping_types WHERE name = '${type}'))`,
  );
  return `INSERT INTO toppings(name, topping_type) VALUES ${values.join(
    ', ',
  )};`;
}

function insertPizzaToppings() {
  const values = pizzas.flatMap(({name, toppings}) =>
    toppings.map(
      ({name: topping}) =>
        `((SELECT id FROM pizzas WHERE name = '${name}'), (SELECT id FROM toppings WHERE name = '${topping}'))`,
    ),
  );
  return `INSERT INTO pizzas_toppings(pizza, topping) VALUES ${values.join(
    ', ',
  )};`;
}
