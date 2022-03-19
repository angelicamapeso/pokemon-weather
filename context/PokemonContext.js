import React, { useState } from 'react';

const PokemonContext = React.createContext({
  pokemon: {},
  pokemonTypes: {},
  initializePokemon: () => { },
  initializePokemonTypes: () => { },
});

export const PokemonProvider = ({ children }) => {
  const [pokemon, setPokemon] = useState({});
  const [pokemonTypes, setPokemonTypes] = useState({});

  const initializePokemon = (data) => {
    setPokemon(data);
  }

  const initializePokemonTypes = (data) => {
    setPokemonTypes(data);
  }

  return (
    <PokemonContext.Provider
      value={{
        pokemon,
        pokemonTypes,
        initializePokemon,
        initializePokemonTypes,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  const context = React.useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon must be called from a descendent of PokemonProvider');
  }
  return context;
}