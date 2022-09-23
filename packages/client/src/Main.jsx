import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import CreatePizza from './pages/CreatePizza';
import PizzaDetails from './pages/PizzaDetails';
import Menu from './pages/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {index: true, element: <Home />},
      {path: 'pizzas', element: <Menu />},
      {path: 'pizzas/:pizzaId', element: <PizzaDetails />},
      {path: 'create', element: <CreatePizza />},
    ],
  },
]);

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
