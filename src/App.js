import './App.css';
import Home from './Compenent/Home';
import Pokedex from './Compenent/Pokedex';
import { Link, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <Home />
      <Pokedex /> */}
      <ul className='nav'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/pokedex'>Pokedex</Link></li>
      </ul>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pokedex' element={<Pokedex />} />
      </Routes>

    </div>
  );
}

export default App;
