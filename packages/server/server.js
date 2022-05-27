import * as url from 'node:url';
import * as path from 'node:path';
import fastify from 'fastify';
import {makeExecutableSchema} from '@graphql-tools/schema';
import * as db from './src/db.js';

const app = fastify({
  logger: {
    prettyPrint: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname',
    },
  },
});

app.register(import('@fastify/cors'));

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
app.register(import('@fastify/static'), {
  root: path.resolve(dirname, 'public'),
  prefix: '/public/',
});

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
    type: ToppingType!
  }

  type Pizza {
    id: Int!
    name: String!
    image: String
    toppings: [Topping]!
  }

  type Query {
    toppingList: [Topping]!
    pizzaList: [Pizza]!
    pizza(id: Int!): Pizza!
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
    toppingList: (_, __, context) => db.getToppings(context.app),
    pizzaList: (_, __, context) => db.getPizzas(context.app),
    pizza: (_, {id}, context) => db.getPizza(context.app, id),
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
