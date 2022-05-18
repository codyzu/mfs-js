import {createClient, Provider, defaultExchanges} from 'urql';
import {devtoolsExchange} from '@urql/devtools';
import {Container} from 'reactstrap';
import Home from './Home';

const client = createClient({
  url: 'http://localhost:3001/graphql',
  exchanges: [devtoolsExchange, ...defaultExchanges],
});

function App() {
  return (
    <Provider value={client}>
      <Container>
        <Home />
      </Container>
    </Provider>
  );
}

export default App;
