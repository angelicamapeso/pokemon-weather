// Pokemon Types
export const GRASS = 'grass';
export const GROUND = 'ground';
export const FIRE = 'fire';
export const WATER = 'water';
export const ELECTRIC = 'electric';
export const BUG = 'bug';
export const DRAGON = 'dragon';
export const FLYING = 'flying';
export const PSYCHIC = 'psychic';
export const ICE = 'ice';
export const STEEL = 'steel';
export const DARK = 'dark';
export const GHOST = 'ghost';
export const FAIRY = 'fairy';
export const FIGHTING = 'fighting';
export const POISON = 'poison';
export const NORMAL = 'normal';
export const ROCK = 'rock';

// Map of Weather Conditions to Pokemon Types
// Loosely based on: https://pokemongohub.net/post/generation-iii/weather-guide/
export const WEATHER_TO_TYPES = {
  'Thunderstorm': [ELECTRIC, DARK],
  'Drizzle': [WATER, BUG],
  'Rain': [WATER, ELECTRIC, BUG],
  'Snow': [ICE, STEEL],
  'Mist': [DARK, GHOST],
  'Smoke': [POISON, DARK],
  'Haze': [DARK, GHOST],
  'Dust': [ROCK, GROUND],
  'Fog': [DARK, GHOST],
  'Sand': [GROUND, ROCK, NORMAL],
  'Dust': [GROUND, ROCK, NORMAL],
  'Ash': [DARK, FIRE],
  'Squall': [FLYING, DRAGON],
  'Tornado': [FLYING, DRAGON, BUG],
  'Clear': [GRASS, GROUND, FIRE],
  'Clouds': [FAIRY, FIGHTING, POISON],
};