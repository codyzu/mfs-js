import app from "../server.js";

afterAll(() => app.close());

test("Gets pizzas", async () => {
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
    method: "POST",
    headers: { "content-type": "application/json" },
    url: "/graphql",
    payload: JSON.stringify({ query }),
  });

  const { data, errors } = await response.json();
  expect(errors).toBeUndefined();
  expect(data).toMatchInlineSnapshot(`
    Object {
      "pizzaList": Array [
        Object {
          "name": "Napolitaine",
          "toppings": Array [
            Object {
              "name": "tomato sauce",
            },
            Object {
              "name": "mozzarella",
            },
            Object {
              "name": "fresh garlic",
            },
            Object {
              "name": "olives",
            },
            Object {
              "name": "anchovies",
            },
          ],
        },
        Object {
          "name": "Reine",
          "toppings": Array [
            Object {
              "name": "tomato sauce",
            },
            Object {
              "name": "mozzarella",
            },
            Object {
              "name": "mushrooms",
            },
            Object {
              "name": "ham",
            },
            Object {
              "name": "olives",
            },
          ],
        },
      ],
    }
  `);
});
