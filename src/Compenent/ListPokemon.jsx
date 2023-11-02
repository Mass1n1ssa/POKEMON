import React, { useState, useEffect } from 'react';
import './ListPokemon.css';
export default function ListPokemon() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    // Fetch data from the PokeAPI
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=20')
      .then((response) => response.json())
      .then((data) => setPokemonData(data.results))
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

  return (
    <div className="ListPokemon">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="cards">
        {pokemonData.map((pokemon, index) => (
          <div key={index} className="card">
            <p>{pokemon.name}</p>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png`}
              alt={pokemon.name}
            />
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
