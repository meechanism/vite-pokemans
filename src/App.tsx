import { useEffect, useState } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL;

type PokemonOption = {
  name: string;
  url: string;
};

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
  const [loading, setLoading] = useState(false);
  const [allPokemon, setAllPokemon] = useState<PokemonOption[]>([]);
  const [selected, setSelected] = useState<number>();
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    // fetch and store our pokemon
    const fetchAllPokemon = async () => {
      const resp = await fetch(`${API_URL}/api/v2/pokemon/`);
      const data = await resp.json();
      const all = data.results.map((p: any) => {
        return { ...p, name: normalize(p.name) };
      });
      setAllPokemon(all);
      setLoading(false);
    };

    fetchAllPokemon();
    setLoading(true);
  }, []);

  useEffect(() => {
    // Pull pokemon info for selected
    const fetchPokemon = async (pid: number) => {
      const resp = await fetch(`${API_URL}/api/v2/pokemon/${pid}`);
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

    if (selected) {
      fetchPokemon(selected);
      setLoading(true);
    }
  }, [selected]);

  const handleSelectPokemon = (e: any) => {
    // extract id
    const url = e.target.value;
    const pid = getPID(url);
    setSelected(pid);
  };

  return (
    <div className="App">
      <h1>Pokemon Selector</h1>

      <select
        disabled={loading}
        onChange={handleSelectPokemon}
        // control the state
        value={pokemon ? pokemon.id : undefined}>
        {allPokemon.map((p: PokemonOption, i) => (
          <option value={getPID(p.url)} key={`p-${i}`}>
            {p.name}
          </option>
        ))}
      </select>

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
