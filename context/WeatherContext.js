import React, { useState } from 'react';
import { formatWeatherData } from '../api/weatherAPI';

const WeatherContext = React.createContext({
  weatherData: {},
  initializeWeatherData: () => { },
});

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({});

  const initializeWeatherData = (data) => {
    const formattedData = formatWeatherData(data);
    setWeatherData(formattedData);
  }

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        initializeWeatherData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = React.useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be called from a descendent of WeatherProvider');
  }
  return context;
}