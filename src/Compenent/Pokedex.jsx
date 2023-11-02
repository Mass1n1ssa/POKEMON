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
    <div>Pokedex</div>
  )
}
