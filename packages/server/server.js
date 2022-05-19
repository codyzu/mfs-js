import fastify from 'fastify';
import {makeExecutableSchema} from '@graphql-tools/schema';
import * as db from './src/db.js';

const app = fastify({
  logger: {
    prettyPrint: true,
  },
});

app.register(import('@fastify/cors'));

app.register(import('@fastify/postgres'), {
  connectionString: 'postgres://postgres:postgres@localhost:5433/postgres',
});

const typeDefs = `
  type ToppingType {
    id: Int!
    name: String!
  }

  type Topping {
    id: Int!
    name: String!
    type: ToppingType
  }

  type Pizza {
    id: Int!
    name: String!
    toppings: [Topping]!
  }

  type Query {
    getToppings: [Topping]
    getPizzas: [Pizza]
    add(x: Int, y: Int): Int
  }
`;

const loaders = {
  Topping: {
    type: (queries, context) =>
      db.getToppingTypesForToppings(
        queries.map((q) => q.obj),
        context.app,
      ),
  },
  Pizza: {
    toppings: (queries, context) =>
      db.getToppingsForPizzas(
        queries.map((q) => q.obj),
        context.app,
      ),
  },
};

const resolvers = {
  Query: {
    getToppings: (_, __, context) => db.getToppings(context.app),
    getPizzas: (_, __, context) => db.getPizzas(context.app),
    add: async (_, {x, y}) => x + y,
  },
};

app.register(import('mercurius'), {
  schema: makeExecutableSchema({typeDefs, resolvers}),
  loaders,
  graphiql: true,
});

app.register(import('mercurius-cache'), {
  ttl: 10,
  all: true,
});

app.get('/', async (request, reply) => {
  const query = '{ add(x: 2, y: 2) }';
  return reply.graphql(query);
});

// Hello world
app.get('/hello', (request, reply) => reply.send('hello world'));

export default app;
