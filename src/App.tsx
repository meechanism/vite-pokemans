import { useEffect, useState } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL;

const fetchPokemon = async () => {
  const resp = await fetch(`${API_URL}/api/v2/pokemon/`);
  const data = resp.json();
  return data;
};

type Pokemon = {
  name: string;
  id: number;
  sprite: string;
};

function App() {
  const [count, setCount] = useState(0);
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    // fetch and store our pokemon
    const list = fetchPokemon();
    console.log('list: ', list);
  }, []);
  return (
    <div className="App">
      <h1>Pokemon Selector</h1>
      <select></select>
    </div>
  );
}

export default App;
