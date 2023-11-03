// import React, { useState, useEffect } from 'react';
// import './Pokedex.css';

// export default function Pokedex() {
//   // Charger le pokedex depuis le stockage local lors du montage initial.
//   const [pokedex, setPokedex] = useState([]);

//   // Utilisez useEffect pour charger le pokedex lors du montage initial.
//   useEffect(() => {
//     const storedPokedex = localStorage.getItem('pokedex');
//     if (storedPokedex) {
//       setPokedex(JSON.parse(storedPokedex));
//     }
//   }, []); // Le tableau vide [] signifie que cela s'exécute une seule fois au montage.

//   // Fonction pour supprimer un Pokémon du pokedex
//   const removeFromPokedex = (index) => {
//     const updatedPokedex = [...pokedex];
//     updatedPokedex.splice(index, 1);
//     setPokedex(updatedPokedex);
//     // Mettez à jour le stockage local avec le pokedex mis à jour.
//     localStorage.setItem('pokedex', JSON.stringify(updatedPokedex));
//   };

//   return (
//     <div>
//       <h1>Pokedex</h1>
//       <div className="pokedex">
//         {pokedex.map((pokemon, index) => (
//           <div key={index} className="pokedex-card">
//             <p>{pokemon.name}</p>
//             <img
//               src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
//               alt={pokemon.name}
//             />
//             <button onClick={() => removeFromPokedex(index)}>Remove</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import './Pokedex.css';

export default function Pokedex() {
  const [pokedex, setPokedex] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedPokedex = localStorage.getItem('pokedex');
    if (storedPokedex) {
      setPokedex(JSON.parse(storedPokedex));
    }
  }, []);

  const removeFromPokedex = (index) => {
    const updatedPokedex = [...pokedex];
    updatedPokedex.splice(index, 1);
    setPokedex(updatedPokedex);
    localStorage.setItem('pokedex', JSON.stringify(updatedPokedex));
  };

  const filteredPokedex = pokedex.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='main'>
      <h1>Pokedex</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search in Pokedex..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="pokedex">
        {filteredPokedex.map((pokemon, index) => (
          <div key={index} className="pokedex-card">
            <p>{pokemon.name}</p>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
            />
            <button onClick={() => removeFromPokedex(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
