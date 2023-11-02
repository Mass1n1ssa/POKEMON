  // // Pokedex.js
  // import React, { useState, useEffect } from 'react';
  // import './styles/Pokedex.css';

  // export default function Pokedex() {
  //   const [searchTerm, setSearchTerm] = useState('');
  //   const [searchedPokemon, setSearchedPokemon] = useState(null);
  //   const [pokemonData, setPokemonData] = useState([]);

  //   useEffect(() => {
  //     // Fetch data from the PokeAPI
  //     fetch('https://pokeapi.co/api/v2/pokemon/?limit=20')
  //       .then(response => response.json())
  //       .then(data => setPokemonData(data.results))
  //       .catch(error => console.error('Error fetching Pokemon data:', error));
  //   }, []); // Empty dependency array to ensure the effect runs once on component mount

  //   const filteredPokemon = pokemonData.filter(pokemon =>
  //     pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  //   const handleSearch = (e) => {
  //     setSearchTerm(e.target.value);
  //     setSearchedPokemon(pokemonData.find(pokemon => pokemon.name.toLowerCase() === e.target.value.toLowerCase()));
  //   };
  //   const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  //   return (
  //     <div className="pokedex">
  //       <div className="search-bar">
  //         <input
  //           type="text"
  //           placeholder="Search Pokemon..."
  //           value={searchTerm}
  //           onChange={handleSearch}
  //         />
  //       </div>
  //       <div className="cards">
  //         {filteredPokemon.map(pokemon => (
  //           <div key={pokemon.name} className="card">
  //             <p>{pokemon.name}</p>
  //             <img src={imageUrl} alt={pokemon.name} />
  //           </div>
  //         ))}
  //       </div>
  //       {searchedPokemon && (
  //         <div className="searched-pokemon">
  //           <h2>{searchedPokemon.name}</h2>
  //           {/* Add additional details here */}
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

  // Pokedex.js
  // Pokedex.js
  // Pokedex.js
  // Pokedex.js
import React, { useState, useEffect } from 'react';
import './styles/Pokedex.css';

export default function Pokedex() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    // Fetch data from the PokeAPI
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=20')
      .then((response) => response.json())
      .then((data) => {
        // Fetch details for each Pokemon to get the id
        const promises = data.results.map((pokemon) =>
          fetch(pokemon.url)
            .then((response) => response.json())
            .then((pokemonDetails) => ({
              ...pokemonDetails,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png`,
            }))
        );

        Promise.all(promises)
          .then((pokemonDetailsArray) => setPokemonData(pokemonDetailsArray))
          .catch((error) => console.error('Error fetching Pokemon details:', error));
      })
      .catch((error) => console.error('Error fetching Pokemon data:', error));
  }, []); // Empty dependency array to ensure the effect runs once on component mount

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearchedPokemon(
      pokemonData.find(
        (pokemon) => pokemon.name.toLowerCase() === e.target.value.toLowerCase()
      )
    );
  };

  const handleRemoveCard = (id) => {
    const updatedPokemonData = pokemonData.filter((pokemon) => pokemon.id !== id);
    setPokemonData(updatedPokemonData);
  };

  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Pokedex">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="cards">
        {filteredPokemon.map((pokemon) => (
          <div key={pokemon.name} className="card">
            <p>{pokemon.name}</p>
            <img src={pokemon.image} alt={pokemon.name} />
            <button onClick={() => handleRemoveCard(pokemon.id)}>Remove</button>
          </div>
        ))}
      </div>
      {searchedPokemon && (
        <div className="searched-pokemon">
          <h2>{searchedPokemon.name}</h2>
          {/* Add additional details here */}
        </div>
      )}
    </div>
  );
}
