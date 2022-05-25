import {createClient, Provider, dedupExchange, fetchExchange} from 'urql';
import {cacheExchange} from '@urql/exchange-graphcache';
import {devtoolsExchange} from '@urql/devtools';
import {Container} from 'reactstrap';
import {Routes, Route} from 'react-router-dom';
import Home from './Home';
import CreatePizza from './CreatePizza';
import Navigation from './Navigation';
import PizzaDetails from './PizzaDetails';

const client = createClient({
  url: 'http://localhost:3001/graphql',
  exchanges: [].concat(import.meta.env.DEV ? [devtoolsExchange] : [], [
    dedupExchange,
    cacheExchange({
      resolvers: {
        Query: {
          getPizza(_, args) {
            return {__typename: 'Pizza', id: args.id};
          },
        },
      },
    }),
    fetchExchange,
  ]),
});

function App() {
  return (
    <Provider value={client}>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePizza />} />
          <Route path="/pizza/:pizzaId" element={<PizzaDetails />} />
        </Routes>
      </Container>
    </Provider>
  );
}

export default App;
