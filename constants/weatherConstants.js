// Weather Main Types
// From: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
export const THUNDERSTORM = 'Thunderstorm';
export const DRIZZLE = 'Drizzle';
export const RAIN = 'Rain';
export const SNOW = 'Snow';
export const MIST = 'Mist';
export const SMOKE = 'Smoke';
export const HAZE = 'Haze';
export const DUST = 'Dust';
export const FOG = 'Fog';
export const SAND = 'Sand';
export const ASH = 'Ash';
export const SQUALL = 'Squall';
export const TORNADO = 'Tornado';
export const CLEAR = 'Clear';
export const CLOUDS = 'Clouds';

export const WEATHER_TO_COLORS = {
  [THUNDERSTORM]: {
    light: '#EBD680',
    mid: '#B5A22C',
    dark: '#424407',
  },
  [DRIZZLE]: {
    light: '#A2D0E1',
    mid: '#324A5F',
    dark: '#061329',
  },
  [RAIN]: {
    light: '#92A8BB',
    mid: '#1E365D',
    dark: '#061329',
  },
  [SNOW]: {
    light: '#C8CCC8',
    mid: '#949E94',
    dark: '#23403F',
  },
  [MIST]: {
    light: '#DDCFE6',
    mid: '#A992C8',
    dark: '#372465',
  },
  [SMOKE]: {
    light: '#D5D5D5',
    mid: '#9AA0A8',
    dark: '#273D4E',
  },
  [HAZE]: {
    light: '#ADD1C0',
    mid: '#689689',
    dark: '#215353',
  },
  [DUST]: {
    light: '#CCC1AE',
    mid: '#877B66',
    dark: '#3D3417',
  },
  [FOG]: {
    light: '#C9D5EB',
    mid: '#85A1D5',
    dark: '#113A5A',
  },
  [SAND]: {
    light: '#CCC6AA',
    mid: '#989C81',
    dark: '#314318',
  },
  [ASH]: {
    light: '#C6C7B8',
    mid: '#6E7860',
    dark: '#2C3E1E',
  },
  [SQUALL]: {
    light: '#BDD2CC',
    mid: '#86ACA1',
    dark: '#133D39',
  },
  [TORNADO]: {
    light: '#929B9E',
    mid: '#404E4D',
    dark: '#18261C',
  },
  [CLEAR]: {
    light: '#B3D483',
    mid: '#71AE42',
    dark: '#163909',
  },
  [CLOUDS]: {
    light: '#BDD5D8',
    mid: '#81A9B1',
    dark: '#1B3643',
  },
};