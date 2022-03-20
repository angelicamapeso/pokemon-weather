import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { usePokemonWeather } from '../context/PokemonWeatherContext';

import { CLEAR, WEATHER_TO_COLORS } from '../constants/weatherConstants';
import { STAT_ARRAY } from '../constants/pokemonConstants';

import TypeLabel from './TypeLabel';

export default function CurrentPokemon() {
  const { pokemon, pokemonWeatherData } = usePokemonWeather();
  const [currentPokemon, setCurrentPokemon] = useState({});
  const [colorSet, setColorSet] = useState({});

  useEffect(() => {
    const selectedPokemon = getPokemonData();
    setCurrentPokemon(selectedPokemon);

    const selectedColorSet = getColorSet();
    setColorSet(selectedColorSet);
  }, [pokemonWeatherData]);

  const getPokemonData = () => {
    if (!pokemonWeatherData?.current?.pokemon?.name) {
      return {};
    }

    const poke = pokemon[pokemonWeatherData.current.pokemon.name];
    if (!poke) {
      return {};
    }

    return poke;
  }

  const getColorSet = () => {
    if (pokemonWeatherData?.current?.descrip) {
      if (WEATHER_TO_COLORS[pokemonWeatherData.current.descrip]) {
        return WEATHER_TO_COLORS[pokemonWeatherData.current.descrip];
      } else {
        console.warn('Unknown Weather Description: ' + pokemonWeatherData.current.descrip);
      }
    }

    return WEATHER_TO_COLORS[CLEAR];
  }

  const formatPokemonName = (name) => {
    return (
      name.split('-')
        .map(namePart => namePart[0].toUpperCase() + namePart.slice(1))
        .join(' ')
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {currentPokemon.img ?
          <Image
            resizeMode='contain'
            style={styles.pokeImg} source={{ uri: currentPokemon.img }}
          />
          : null
        }
        {currentPokemon.name ?
          <View style={styles.stats}>
            <View>
              <Text style={styles.statDescrip}>
                You might find a
                <Text style={styles.pokeName(colorSet.dark)}>{' ' + formatPokemonName(currentPokemon.name) + ' '}</Text>
                today!
              </Text>
            </View>
            <View style={styles.statNums}>
              {
                STAT_ARRAY.map((stat, i) => {
                  if (currentPokemon?.[stat]?.shrt
                    && currentPokemon?.[stat]?.val
                  ) {
                    return (
                      <Text key={i} style={[styles.center, styles.statNum(colorSet.dark)]}>
                        <Text style={styles.bold}>{currentPokemon[stat].shrt}</Text>
                        {'\n' + currentPokemon[stat].val}
                      </Text>
                    );
                  } else {
                    return null;
                  }
                })
              }
            </View>
          </View>
          : null
        }
        {currentPokemon.types ?
          <View style={styles.typeBox}>
            {
              currentPokemon.types.map((type, i) =>
                <TypeLabel
                  key={i}
                  style={styles.typeLabel}
                  type={type}
                />
              )
            }
          </View>
          : null
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    flex: 0.4,
    margin: 22,
    marginBottom: 50,
    borderRadius: 20,
  },

  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  pokeImg: {
    flex: 0.5,
  },

  pokeName: (textColor) => ({
    color: textColor,
    fontWeight: 'bold',
  }),

  stats: {
    flex: 0.5,
    padding: 15,
  },

  statDescrip: {
    fontSize: 16,
    color: 'white',
    flexWrap: 'wrap',
    textAlign: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },

  statNums: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 15,
  },

  statNum: (textColor) => ({
    fontSize: 16,
    color: textColor,
  }),

  typeBox: {
    width: '100%',
    position: 'absolute',
    bottom: -28,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  typeLabel: {
    marginRight: 20,
  },

  center: {
    textAlign: 'center',
  },

  bold: {
    fontWeight: 'bold',
  }
});