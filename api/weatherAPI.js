import { OPEN_WEATHER_API_KEY } from '@env';

export function getWeatherData({ lat, long }) {
  const apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?'
    + `lat=${lat}`
    + `&lon=${long}`
    + '&units=metric'
    + '&exclude=minutely,hourly,alerts'
    + `&appid=${OPEN_WEATHER_API_KEY}`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error));
}

export function formatWeatherData(data) {
  if (data !== undefined) {

    if (data.current === undefined || data.daily === undefined) {
      console.debug(data);
      console.error('Invalid API data. Data must include "current" and "daily" information.');
      return {};
    }

    const formattedData = {};
    formattedData.current = extractCurrentWeatherInfo(data);
    formattedData.daily = extractDailyWeatherInfo(data);
    return formattedData;
  } else {
    return {};
  }
}

// Current Weather Info
function extractCurrentWeatherInfo(rawData) {
  const {
    feels_like,
    humidity,
    temp,
    weather,
    wind_speed
  } = rawData.current;

  const { main } = weather[0];

  return {
    descrip: main,
    humidity,
    temp,
    feels_like,
    wind_speed,
  };
}

// Daily Weather info
function extractDailyWeatherInfo(rawData) {
  const dailyWeather = rawData.daily.slice(1).map(({
    dt,
    temp: { day: temp, max, min },
    weather,
  }) => {
    // dt is in seconds, so must multiply by 1000
    const dayIndex = new Date(dt * 1000).getDay();
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednseday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const { main } = weather[0];

    return {
      day: dayNames[dayIndex],
      temp,
      descrip: main,
      max,
      min,
    }
  });

  return dailyWeather;
}