import * as url from 'node:url';
import * as path from 'node:path';
import fastify from 'fastify';
import {makeExecutableSchema} from '@graphql-tools/schema';
import connectionString from '../db/connection-string.js';
import * as db from './src/db.js';

const app = fastify({
  ignoreTrailingSlash: true,
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
        singleLine: true,
        colorize: true,
      },
    },
  },
});

app.register(import('@fastify/cors'));

// Serve the front end app
const dirname = url.fileURLToPath(new URL('.', import.meta.url));
app.register(import('@fastify/static'), {
  root: path.resolve(dirname, '../client/dist'),
  maxAge: '30d',
  wildcard: false, // We will add a wildcard path to redirect everything to index.html
});

// Wildcard any path to the front-end app.
// The front-end will handle 404s, so we always send index.html.
// Fastify will always give precedence to static routes, so this makes the app compatible with react-router.
app.get('*', (_, reply) => reply.sendFile('index.html'));

app.register(import('@fastify/postgres'), {
  connectionString,
});

const typeDefs = `
  type Topping {
    id: Int!
    name: String!
    type: String!
  }

  type Pizza {
    id: String!
    name: String!
    description: String
    image: String
    toppings: [Topping]!
  }

  type Query {
    toppingList: [Topping]!
    pizzaList: [Pizza]!
    pizza(id: String!): Pizza!
  }
`;

const loaders = {
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

// Hello world
app.get('/hello', (request, reply) => reply.send('hello world'));

export default app;
