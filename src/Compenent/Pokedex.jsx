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

  const removeAllFromPokedex = () => {
    // Supprimer tous les Pokémon du Pokédex
    setPokedex([]);
    localStorage.removeItem('pokedex'); // Supprimer le Pokédex du stockage local
  };

  // Filtrer les Pokémon en fonction de la valeur de recherche
  const filteredPokedex = pokedex.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      
      
      <h1>Votre Pokedex :</h1>
      <div className="nav-bar">
        <input
          type="text"
          placeholder="Chercher un Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          
        />
        
      </div>
      <button onClick={removeAllFromPokedex} className="remove-all-button">
        Remove All
      </button>
      
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
