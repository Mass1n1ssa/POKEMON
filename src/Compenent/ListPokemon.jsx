// import React, { useState, useEffect } from 'react';
// import './ListPokemon.css';

// export default function ListPokemon() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [pokemonData, setPokemonData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedPokemon, setSelectedPokemon] = useState(null);
//   const [pokedex, setPokedex] = useState(() => {
//     const storedPokedex = localStorage.getItem('pokedex');
//     return storedPokedex ? JSON.parse(storedPokedex) : [];
//   });

//   const fetchPokemonData = (page) => {
//     const offset = (page - 1) * 20;
//     const limit = 60 - offset > 20 ? 20 : 60 - offset;
//     fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
//       .then((response) => response.json())
//       .then((data) =>
//         setPokemonData(
//           data.results.map((pokemon, index) => ({
//             ...pokemon,
//             image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset + index + 1}.png`,
//             index: offset + index,
//           }))
//         )
//       )
//       .catch((error) => console.error('Error fetching Pokemon data:', error));
//   };

//   const fetchPokemonDetails = (pokemonName, index) => {
//     fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setSelectedPokemon({
//           Number: data.id,
//           name: data.name,
//           height: data.height,
//           weight: data.weight,
//           base_experience: data.base_experience,
//           types: data.types.map((type) => type.type.name),
//           image: data.sprites.front_default,
//           index: index,
//         });
//       })
//       .catch((error) => console.error('Error fetching Pokemon details:', error));
//   };

//   useEffect(() => {
//     fetchPokemonData(currentPage);
//   }, [currentPage]);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleAdd = (index) => {
//     const selectedPokemon = filteredPokemon[index];

//     // Ajouter le Pokémon au pokedex.
//     setPokedex((prevPokedex) => [
//       ...prevPokedex,
//       {
//         ...selectedPokemon,
//         image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
//           selectedPokemon.index + 1
//         }.png`,
//         id: selectedPokemon.index + 1,
//       },
//     ]);

//     // Sauvegarder le pokedex dans le stockage local.
//     localStorage.setItem(
//       'pokedex',
//       JSON.stringify([
//         ...pokedex,
//         {
//           ...selectedPokemon,
//           image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
//             selectedPokemon.index + 1
//           }.png`,
//           id: selectedPokemon.index + 1,
//         },
//       ])
//     );

//     // Supprimer le Pokémon de la liste principale.
//     const updatedPokemonData = [...pokemonData];
//     updatedPokemonData.splice(index, 1);
//     setPokemonData(updatedPokemonData);
//   };

//   const handleShowInfo = (pokemon) => {
//     fetchPokemonDetails(pokemon.name, pokemon.index);
//   };

//   const handleHideInfo = () => {
//     setSelectedPokemon(null);
//   };

//   const filteredPokemon = pokemonData.filter((pokemon) =>
//     pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleNextPage = () => {
//     if (currentPage < 3) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div className="ListPokemon">
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Trouve Ton Pokemon..."
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//       </div>
//       <div className="cards">
//         {filteredPokemon.map((pokemon, index) => (
//           <div key={index} className="card">
//             <p>#{pokemon.index + 1}</p>
//             <p>{pokemon.name}</p>
//             <img
//               src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
//                 pokemon.index + 1
//               }.png`}
//               alt={pokemon.name}
//             />
//             <button onClick={() => handleShowInfo(pokemon)}>Info</button>
//             <button onClick={() => handleAdd(index)}>ADD</button>
//           </div>
//         ))}
//       </div>
//       <div className="Changement de page">
//         <button onClick={handlePreviousPage} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <button onClick={handleNextPage} disabled={currentPage === 3}>
//           Next
//         </button>
//       </div>
//       {selectedPokemon && (
//         <div className="pokemon-info">
//           <h1>Pokemon Info</h1>
//           <p>{selectedPokemon.Number}</p>
//           <h2>{selectedPokemon.name}</h2>
//           <img src={selectedPokemon.image} alt={selectedPokemon.name} />
//           <p>Height: {selectedPokemon.height} decimetres</p>
//           <p>Weight: {selectedPokemon.weight} hectograms</p>
//           <p>Base experience: {selectedPokemon.base_experience}</p>
//           <p>Types: {selectedPokemon.types.join(', ')}</p>
//           <button onClick={handleHideInfo}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import './ListPokemon.css';

export default function ListPokemon() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokedex, setPokedex] = useState(() => {
    const storedPokedex = localStorage.getItem('pokedex');
    return storedPokedex ? JSON.parse(storedPokedex) : [];
  });

  const fetchPokemonData = (page) => {
    const offset = (page - 1) * 20;
    const limit = 60 - offset > 20 ? 20 : 60 - offset;
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then((data) =>
        setPokemonData(
          data.results.map((pokemon, index) => ({
            ...pokemon,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset + index + 1}.png`,
            index: offset + index,
          }))
        )
      )
      .catch((error) => console.error('Error fetching Pokemon data:', error));
  };

  const fetchPokemonDetails = (pokemonName, index) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedPokemon({
          Number: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          base_experience: data.base_experience,
          types: data.types.map((type) => type.type.name),
          image: data.sprites.front_default,
          index: index,
        });
      })
      .catch((error) => console.error('Error fetching Pokemon details:', error));
  };

  useEffect(() => {
    fetchPokemonData(currentPage);
  }, [currentPage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAdd = (index) => {
    const selectedPokemon = filteredPokemon[index];
  
    // Vérifiez si le Pokémon n'est pas déjà dans le Pokédex.
    if (!pokedex.find(pokemon => pokemon.index === selectedPokemon.index)) {
      // Ajoutez le Pokémon au Pokédex.
      setPokedex((prevPokedex) => [
        ...prevPokedex,
        {
          ...selectedPokemon,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            selectedPokemon.index + 1
          }.png`,
          id: selectedPokemon.index + 1,
        },
      ]);
      
      // Sauvegardez le Pokédex mis à jour dans le stockage local.
      localStorage.setItem(
        'pokedex',
        JSON.stringify([
          ...pokedex,
          {
            ...selectedPokemon,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              selectedPokemon.index + 1
            }.png`,
            id: selectedPokemon.index + 1,
          },
        ])
      );

      // Supprimez le Pokémon de la liste principale.
      const updatedPokemonData = [...pokemonData];
      updatedPokemonData.splice(index, 1);
      setPokemonData(updatedPokemonData);
    }
  };

  const handleShowInfo = (pokemon) => {
    fetchPokemonDetails(pokemon.name, pokemon.index);
  };

  const handleHideInfo = () => {
    setSelectedPokemon(null);
  };

  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNextPage = () => {
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="ListPokemon">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Trouve Ton Pokemon..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="cards">
        {filteredPokemon.map((pokemon, index) => (
          <div key={index} className="card">
            <p>#{pokemon.index + 1}</p>
            <p>{pokemon.name}</p>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                pokemon.index + 1
              }.png`}
              alt={pokemon.name}
            />
            <button onClick={() => handleShowInfo(pokemon)}>Info</button>
            <button onClick={() => handleAdd(index)}>ADD</button>
          </div>
        ))}
      </div>
      <div className="Changement de page">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === 3}>
          Next
        </button>
      </div>
      {selectedPokemon && (
        <div className="pokemon-info">
          <h1>Pokemon Info</h1>
          <p>{selectedPokemon.Number}</p>
          <h2>{selectedPokemon.name}</h2>
          <img src={selectedPokemon.image} alt={selectedPokemon.name} />
          <p>Height: {selectedPokemon.height} decimetres</p>
          <p>Weight: {selectedPokemon.weight} hectograms</p>
          <p>Base experience: {selectedPokemon.base_experience}</p>
          <p>Types: {selectedPokemon.types.join(', ')}</p>
          <button onClick={handleHideInfo}>Close</button>
        </div>
      )}
    </div>
  );
}

