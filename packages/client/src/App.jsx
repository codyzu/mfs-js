import {createClient, Provider, dedupExchange, fetchExchange} from 'urql';
import {cacheExchange} from '@urql/exchange-graphcache';
import {devtoolsExchange} from '@urql/devtools';
import {Outlet} from 'react-router-dom';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import Navigation from './components/Navigation';

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
    <HelmetProvider>
      <Helmet>
        <title>Modern Full-Stack Pizzas</title>
      </Helmet>
      <Provider value={client}>
        <Navigation />
        <Outlet />
      </Provider>
    </HelmetProvider>
  );
}

export default App;
