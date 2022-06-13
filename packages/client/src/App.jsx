import {createClient, Provider, dedupExchange, fetchExchange} from 'urql';
import {cacheExchange} from '@urql/exchange-graphcache';
import {devtoolsExchange} from '@urql/devtools';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import CreatePizza from './pages/CreatePizza';
import Navigation from './components/Navigation';
import PizzaDetails from './pages/PizzaDetails';
import Menu from './pages/Menu';
import routePaths from './route-paths';

const client = createClient({
  url: '/graphql',
  exchanges: [].concat(import.meta.env.DEV ? [devtoolsExchange] : [], [
    dedupExchange,
    cacheExchange({
      resolvers: {
        Query: {
          pizza(_, args) {
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
      <Routes>
        <Route path={routePaths.home} element={<Home />} />
        <Route path={routePaths.pizzas} element={<Menu />} />
        <Route path={routePaths.create} element={<CreatePizza />} />
        <Route path={routePaths.pizza} element={<PizzaDetails />} />
      </Routes>
    </Provider>
  );
}

export default App;
