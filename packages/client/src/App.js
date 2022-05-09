import {createClient, Provider} from 'urql';
import logo from './logo.svg';
import './App.css';
import Home from './Home';

const client = createClient({
  url: 'http://localhost:3001/graphql',
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Provider value={client}>
        <Home />
      </Provider>
    </div>
  );
}

export default App;
