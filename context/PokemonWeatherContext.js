import React, { useState } from 'react';
import { getWeatherData, formatWeatherData } from '../api/weatherAPI';
import {
  addPokemonTypes,
  getPokemonType,
  formatTypeData,
  addPokemonToWeatherData,
  fetchData,
  formatPokeData,
} from '../api/pokemonAPI';

const PokemonWeatherContext = React.createContext({
  pokemonWeatherData: {},
  pokemonTypes: {},
  pokemon: {},
  initializePokemonWeatherData: () => { },
});

export const PokemonWeatherProvider = ({ children }) => {
  const [pokemonWeatherData, setPokemonWeatherData] = useState({});
  const [pokemonTypes, setPokemonTypes] = useState({});
  const [pokemon, setPokemon] = useState({});

  const initializePokemonWeatherData = async ({ lat, long }) => {
    const weatherData = await getWeatherData({ lat, long });
    const formattedWeatherData = formatWeatherData(weatherData);

    const { typesToFetch, weatherDataWithPokeTypes } = addPokemonTypes(formattedWeatherData);

    const trimmedTypesToFetch = trimTypesToFetch(typesToFetch);
    const rawTypeData = await Promise.all(trimmedTypesToFetch.map(type => getPokemonType(type)));
    const formattedTypeData = formatTypeData(rawTypeData);
    const updatedTypes = addPokemonTypeData(formattedTypeData);

    const { pokeToFetch, weatherDataWithPokemon } = addPokemonToWeatherData(weatherDataWithPokeTypes, updatedTypes);
    const trimmedPokeToFetch = trimPokemonToFetch(pokeToFetch);
    // trimmed data returns array of urls
    const rawPokeData = await Promise.all(trimmedPokeToFetch.map(pokeUrl => fetchData(pokeUrl)));
    const formattedPokeData = formatPokeData(rawPokeData);
    addPokemonData(formattedPokeData);

    setPokemonWeatherData(weatherDataWithPokemon);
  }

  // Pokemon Type functions
  const trimTypesToFetch = (typesToFetch) => {
    const trimmed = [];
    typesToFetch.forEach(type => {
      if (pokemonTypes[type]) {
        return;
      }

      trimmed.push(type);
    });

    return trimmed;
  }

  const addPokemonTypeData = (formattedTypeData) => {
    const currentTypes = { ...pokemonTypes };
    formattedTypeData.forEach(data => {
      currentTypes[data.type] = data.pokemon;
    });
    setPokemonTypes(currentTypes);
    return currentTypes;
  }

  // Pokemon functions
  const trimPokemonToFetch = (pokeToFetch) => {
    const trimmed = [];
    pokeToFetch.forEach(poke => {
      if (pokemon[poke]) {
        return;
      }

      trimmed.push(poke.url);
    });

    return trimmed;
  }

  const addPokemonData = (formattedPokeData) => {
    const currentPokemon = { ...pokemon };
    formattedPokeData.forEach(data => {
      const fData = { ...data };
      currentPokemon[data.name] = fData;
    });
    setPokemon(currentPokemon);
    return currentPokemon;
  }

  return (
    <PokemonWeatherContext.Provider
      value={{
        pokemon,
        pokemonWeatherData,
        initializePokemonWeatherData,
      }}
    >
      {children}
    </PokemonWeatherContext.Provider>
  );
}

export function usePokemonWeather() {
  const context = React.useContext(PokemonWeatherContext);
  if (!context) {
    throw new Error('usePokemonWeather must be called from a descendent of PokemonWeatherProvider');
  }
  return context;
}