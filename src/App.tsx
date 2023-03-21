import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Learn about Pokemon</h1>
      <ul>
        <li>
          <Link to={'select'}>Select</Link>
        </li>
        <li>
          <Link to={'list'}>Go to list</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
