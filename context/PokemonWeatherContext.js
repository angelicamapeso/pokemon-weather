import React, { useState } from 'react';
import { formatWeatherData } from '../api/weatherAPI';

const PokemonWeatherContext = React.createContext({
  weatherData: {},
  initializeWeatherData: () => { },
});

export const PokemonWeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({});

  const initializeWeatherData = (data) => {
    const formattedData = formatWeatherData(data);
    console.debug(formattedData);
    setWeatherData(formattedData);
  }

  return (
    <PokemonWeatherContext.Provider
      value={{
        weatherData,
        initializeWeatherData,
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