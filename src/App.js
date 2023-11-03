import ListPokemon from './Compenent/ListPokemon';
import Pokedex from './Compenent/Pokedex';
import { Link, Routes, Route } from 'react-router-dom';
import './App.css';



function App() {
  return (
    <div className="App"> 
      <header>
        <ul className='nav'>
             <li><Link to='/'>ListPokemon</Link></li>
             <li><Link to='/pokedex'>Pokedex</Link></li>
         </ul>
         <div className='title'>
         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" alt='Pokemon' />
          </div>
         <Routes>
          
             <Route path='/' element={<ListPokemon />} />
             <Route path='/pokedex' element={<Pokedex />} />
         </Routes>
     </header>    
   

    </div>
  );
}

export default App;
