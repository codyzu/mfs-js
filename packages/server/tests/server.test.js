import app from '../server.js';

afterAll(() => app.close());

test('Gets pizzas', async () => {
  const query = `query { 
    pizzaList {
      name
      toppings {
        name
      }
    }
  }
  `;

  const response = await app.inject({
    method: 'POST',
    headers: {'content-type': 'application/json'},
    url: '/graphql',
    payload: JSON.stringify({query}),
  });

  const {data, errors} = await response.json();
  expect(errors).toBeUndefined();
  expect(data).toMatchInlineSnapshot(`
    Object {
      "pizzaList": Array [
        Object {
          "name": "margarite",
          "toppings": Array [
            Object {
              "name": "tomato sauce",
            },
            Object {
              "name": "mozzarella",
            },
            Object {
              "name": "fresh basil",
            },
          ],
        },
        Object {
          "name": "classico",
          "toppings": Array [
            Object {
              "name": "tomato sauce",
            },
            Object {
              "name": "mozzarella",
            },
            Object {
              "name": "ham",
            },
            Object {
              "name": "mushrooms",
            },
          ],
        },
      ],
    }
  `);
});
