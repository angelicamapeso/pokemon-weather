import {
  THUNDERSTORM,
  DRIZZLE,
  RAIN,
  SNOW,
  MIST,
  SMOKE,
  HAZE,
  DUST,
  FOG,
  SAND,
  ASH,
  SQUALL,
  TORNADO,
  CLEAR,
  CLOUDS,
} from './weatherConstants.js';

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
  [THUNDERSTORM]: [ELECTRIC, DARK],
  [DRIZZLE]: [WATER, BUG],
  [RAIN]: [WATER, ELECTRIC, BUG],
  [SNOW]: [ICE, STEEL],
  [MIST]: [DARK, GHOST],
  [SMOKE]: [POISON, DARK],
  [HAZE]: [DARK, GHOST],
  [DUST]: [GROUND, ROCK, NORMAL],
  [FOG]: [DARK, GHOST],
  [SAND]: [GROUND, ROCK, NORMAL],
  [ASH]: [DARK, FIRE],
  [SQUALL]: [FLYING, DRAGON],
  [TORNADO]: [FLYING, DRAGON, BUG],
  [CLEAR]: [GRASS, GROUND, FIRE],
  [CLOUDS]: [FAIRY, FIGHTING, POISON],
};

export const TYPE_TO_COLORS = {
  [GRASS]: '#22C02A',
  [GROUND]: '#E0B668',
  [FIRE]: '#F08030',
  [WATER]: '#6890F0',
  [ELECTRIC]: '#F8D030',
  [BUG]: '#9CB820',
  [DRAGON]: '#7038F8',
  [FLYING]: '#9096F0',
  [PSYCHIC]: '#F85888',
  [ICE]: '#98D8D8',
  [STEEL]: '#6D8F9C',
  [DARK]: '#504843',
  [GHOST]: '#705898',
  [FAIRY]: '#F09AD9',
  [FIGHTING]: '#C03028',
  [POISON]: '#A040A0',
  [NORMAL]: '#A8A8A8',
  [ROCK]: '#B8A038',
};