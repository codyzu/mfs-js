import {createClient, Provider} from 'urql';
import {Container} from 'reactstrap';
import Home from './Home';

const client = createClient({
  url: 'http://localhost:3001/graphql',
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
