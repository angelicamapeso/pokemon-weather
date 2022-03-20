import { NORMAL, WEATHER_TO_TYPES } from "../constants/pokemonConstants";

export function addPokemonTypes(formattedWeatherData) {
  const result = {
    typesToFetch: [],
    weatherDataWithPokeTypes: {},
  };

  if (formattedWeatherData?.current?.descrip === undefined
    || formattedWeatherData?.daily?.[0].descrip === undefined
  ) {
    return result;
  }

  const dataInputCopy = {
    current: { ...formattedWeatherData.current },
    daily: formattedWeatherData.daily.map(data => ({ ...data })),
  }

  const iterableData = [dataInputCopy.current, ...dataInputCopy.daily];
  iterableData.forEach(data => {
    const types = WEATHER_TO_TYPES[data.descrip];
    if (!types) {
      console.debug('Unknown Weather Type: ' + data.descrip);
      data.pokeType = NORMAL;
      addUniqueValue(NORMAL, result.typesToFetch);
      return;
    }

    const selectedType = types[getRandInt(types.length)];
    data.pokeType = selectedType;
    addUniqueValue(selectedType, result.typesToFetch);
  });

  result.weatherDataWithPokeTypes = dataInputCopy;
  return result;
}

// Modifies array!
function addUniqueValue(val, array) {
  if (!array.includes(val)) {
    array.push(val);
  }
}

// Max is exclusive
function getRandInt(max) {
  return Math.floor(Math.random() * max);
}

export function getPokemonType(type) {
  const apiUrl = 'https://pokeapi.co/api/v2/type/'
    + type.toLowerCase();

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
}

export function formatTypeData(rawTypeDataArray) {
  return rawTypeDataArray.map(({
    name: type,
    pokemon,
  }) => {
    const formattedPokemon = pokemon.map(({
      pokemon: { name, url }
    }) => ({
      name,
      url
    }));

    return {
      type,
      pokemon: formattedPokemon,
    };
  });
}

export function addPokemonToWeatherData(weatherDataWithPokeTypes, typeData) {
  const result = {
    pokeToFetch: [],
    weatherDataWithPokemon: {},
  };

  if (weatherDataWithPokeTypes?.current?.pokeType === undefined
    || weatherDataWithPokeTypes?.daily?.[0].pokeType === undefined
  ) {
    return result;
  }

  const dataInputCopy = {
    current: { ...weatherDataWithPokeTypes.current },
    daily: weatherDataWithPokeTypes.daily.map(data => ({ ...data })),
  }

  const iterableData = [dataInputCopy.current, ...dataInputCopy.daily];
  iterableData.forEach(data => {
    const pokemonList = typeData[data.pokeType];
    if (!pokemonList) {
      console.debug('Pokemon Type missing from fetched Data: ' + data.pokeType);
      data.pokemon = {};
      return;
    }

    // want pokemon to be different per day
    let selectedPokemon = pokemonList[getRandInt(pokemonList.length)];
    while (result.pokeToFetch.includes(selectedPokemon)) {
      selectedPokemon = pokemonList[getRandInt(pokemonList.length)];
    }

    data.pokemon = selectedPokemon;
    result.pokeToFetch.push(selectedPokemon);
  });

  result.weatherDataWithPokemon = dataInputCopy;
  return result;
}

export function fetchData(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
}

export function formatPokeData(rawPokeData) {
  return rawPokeData.map(({
    name,
    sprites: {
      other: { 'official-artwork': { front_default: img } },
    },
    stats,
  }) => {
    const statNames = ['hp', 'attack', 'defense'];
    const statData = statNames.reduce((prev, current) => {
      const prevCopy = { ...prev };
      const statsObj = stats.find(({ stat: { name } }) => name === current);

      if (!statsObj?.base_stat) {
        prevCopy[current] = null;
      } else {
        prevCopy[current] = statsObj.base_stat;
      }

      return prevCopy;
    }, {});

    return {
      name,
      img,
      ...statData,
    };
  });
};