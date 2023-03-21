import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PokemonList.css';
import { PokemonOption } from './PokemonTypes';

const API_URL = import.meta.env.VITE_API_URL;
const MAX_POKEMON = 1281;
const LIMIT = 50;

enum SORT_TYPE {
  ID,
  NAME
}

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
  const [page, setPage] = useState(0);
  const [sortType, setSortType] = useState<SORT_TYPE>(SORT_TYPE.ID);
  const [allPokemon, setAllPokemon] = useState<PokemonOption[]>([]);
  const [renderedPokemon, setRenderedPokemon] = useState<PokemonOption[]>([]);

  useEffect(() => {
    const offset = page * LIMIT;

    // Only fetch more pokemon if we havent already loaded them
    if (allPokemon.length <= offset || offset === 0) {
      // fetch and store our pokemon
      const fetchAllPokemon = async () => {
        const resp = await fetch(
          `${API_URL}/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`
        );
        const data = await resp.json();
        const all = data.results.map((p: any) => {
          return { ...p, name: normalize(p.name), id: getPID(p.url) };
        });

        // Do specified sort
        setAllPokemon(all);
        setLoading(false);
      };

      fetchAllPokemon();
      setLoading(true);
    } else {
      setRenderedPokemon(allPokemon.splice(page * LIMIT, LIMIT));
    }
  }, [page]);

  const sortList = () => {
    if (sortType === SORT_TYPE.ID) setSortType(SORT_TYPE.NAME);
    else setSortType(SORT_TYPE.ID);
  };

  const prevClick = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const nextClick = () => {
    if (page <= MAX_POKEMON) {
      setPage(page + 1);
    }
  };

  const sort = (list: PokemonOption[]) => {
    let newList: PokemonOption[] = [];
    if (sortType === SORT_TYPE.NAME) {
      newList = list.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (sortType === SORT_TYPE.ID) {
      newList = list.sort((a, b) => (a.id > b.id ? 1 : -1));
    }
    return newList;
  };

  return (
    <div className="List">
      <h1>Pokemon List</h1>

      {loading ? (
        'Loading...'
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>
                Name{' '}
                <button className="sort" onClick={() => sortList()}>
                  sort
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sort(allPokemon).map((p: PokemonOption, i) => (
              <tr key={`p-${i}`}>
                <td>{p.id}</td>
                <td>
                  <Link to={`/select/${p.id}`}>{p.name}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div>
        <button disabled={page === 0 || loading} onClick={() => prevClick()}>
          Previous
        </button>
        <button
          disabled={page === MAX_POKEMON || loading}
          onClick={() => nextClick()}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
