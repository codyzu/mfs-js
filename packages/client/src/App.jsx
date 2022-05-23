import {createClient, Provider, defaultExchanges} from 'urql';
import {devtoolsExchange} from '@urql/devtools';
import {Container} from 'reactstrap';
import {Routes, Route} from 'react-router-dom';
import Home from './Home';
import CreatePizza from './CreatePizza';
import Navigation from './Navigation';

const client = createClient({
  url: 'http://localhost:3001/graphql',
  exchanges: [].concat(
    import.meta.env.DEV ? [devtoolsExchange] : [],
    defaultExchanges,
  ),
});

function App() {
  return (
    <Provider value={client}>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePizza />} />
        </Routes>
      </Container>
    </Provider>
  );
}

export default App;
