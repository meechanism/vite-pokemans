import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PokemonSelect from './pages/PokemonSelect/PokemonSelect';
import PokemonList from './pages/PokemonList/PokemonList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },

  {
    path: '/select/:id',
    element: <PokemonSelect />
  },

  {
    path: '/list',
    element: <PokemonList />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
