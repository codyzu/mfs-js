import fastify from 'fastify';
import mercurius from 'mercurius';

const app = fastify();

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

app.get('/hello', (request, reply) => reply.send('hello world'));

app.listen(3000);
