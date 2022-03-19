import { WeatherProvider } from './context/WeatherContext';
import { PokemonProvider } from './context/PokemonContext';

import PokemonWeather from './PokemonWeather';

export default function App() {
  return (
    <WeatherProvider>
      <PokemonProvider>
        <PokemonWeather />
      </PokemonProvider>
    </WeatherProvider>
  );
}