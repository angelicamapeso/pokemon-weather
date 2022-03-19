import { PokemonWeatherProvider } from './context/PokemonWeatherContext';
import PokemonWeather from './PokemonWeather';

export default function App() {
  return (
    <PokemonWeatherProvider>
      <PokemonWeather />
    </PokemonWeatherProvider>
  );
}