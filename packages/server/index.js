import fastify from 'fastify';
import mercurius from 'mercurius';
import cors from '@fastify/cors';

const app = fastify({
  logger: {
    prettyPrint: true,
  },
});

app.register(cors);

const schema = `
  type Query {
    add(x: Int, y: Int): Int
  }
`;

const resolvers = {
  Query: {
    add: async (_, {x, y}) => x + y,
  },
};

app.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
});

app.get('/', async (request, reply) => {
  const query = '{ add(x: 2, y: 2) }';
  return reply.graphql(query);
});

// Hello world
app.get('/hello', (request, reply) => reply.send('hello world'));

app.listen(3001);
