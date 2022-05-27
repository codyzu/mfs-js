import tap from 'tap';
import app from '../server.js';

tap.teardown(() => app.close());

tap.test('Gets pizzas', async () => {
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
  tap.notOk(errors);
  tap.matchSnapshot(data);
});
