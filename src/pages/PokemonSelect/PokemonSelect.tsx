import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PokemonSelect.css';

const API_URL = import.meta.env.VITE_API_URL;

type Pokemon = {
  name: string;
  id: number;
  sprite: string;
  weight: number;
  height: number;
};

const normalize = (name: string) => {
  if (name.length === 0) return name;
  return name.charAt(0).toUpperCase() + name.substring(1);
};

const getPID = (str: string): number => {
  const resp = str
    .split('/')
    .filter((c: string) => c != '')
    .pop();
  return resp ? parseInt(resp, 10) : 0;
};

function App() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    // Pull pokemon info for selected
    const fetchPokemon = async () => {
      const resp = await fetch(`${API_URL}/api/v2/pokemon/${id}`);
      const data = await resp.json();
      setPokemon({
        name: normalize(data.name),
        id: data.id,
        sprite: data.sprites.front_default,
        weight: data.weight,
        height: data.height
      });
      setLoading(false);
    };

    fetchPokemon();
    setLoading(true);
  }, []);

  return (
    <div className="App">
      <h1>Pokemon Selector</h1>

      {loading ? 'Loading...' : ''}

      {pokemon && (
        <div className="pokemon">
          <h3>{pokemon.name}</h3>
          <img alt={pokemon.name} src={pokemon.sprite} />
          <p>Weight: {pokemon.weight}</p>
          <p>Height: {pokemon.height}</p>
        </div>
      )}
    </div>
  );
}

export default App;
