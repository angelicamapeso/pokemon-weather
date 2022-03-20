import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { CLEAR, WEATHER_TO_COLORS } from '../constants/weatherConstants';
import { usePokemonWeather } from '../context/PokemonWeatherContext';

export default function DayWeather({ dayData }) {
  const { pokemon } = usePokemonWeather();

  const [dayPokemon, setDayPokemon] = useState({});
  const [colorSet, setColorSet] = useState({});

  useEffect(() => {
    const selectedColors = getColorSet();
    setColorSet(selectedColors);

    const selectedPokemon = getPokemon();
    setDayPokemon(selectedPokemon);
  }, [dayData])

  const getColorSet = () => {
    let def = WEATHER_TO_COLORS[CLEAR]
    if (!dayData.descrip) {
      return def;
    } else if (!WEATHER_TO_COLORS[dayData.descrip]) {
      console.warn('Colors for Weather descrip not found: ' + dayData.descrip);
      return def;
    } else {
      return WEATHER_TO_COLORS[dayData.descrip];
    }
  }

  const getPokemon = () => {
    let def = {};
    if (!dayData?.pokemon?.name) {
      return def;
    } else if (!pokemon[dayData.pokemon.name]) {
      console.warn('Pokemon data does not exist: ' + dayData.pokemon.name);
      return def;
    } else {
      return pokemon[dayData.pokemon.name];
    }
  }

  const formatPokemonName = (name) => {
    const first = name.split('-')[0];
    return first[0].toUpperCase() + first.slice(1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.card(colorSet.light ? colorSet.light : 'white')}>
        <Text style={[styles.txtColor(colorSet.dark ? colorSet.dark : 'black'), styles.deg]}>
          {dayData.temp ? Math.floor(dayData.temp) + '°' : '--'}
        </Text>
        <Text style={[styles.txtColor(colorSet.dark ? colorSet.dark : 'black'), styles.descrip]}>
          {dayData.descrip ? dayData.descrip : '--'}
        </Text>
        <View style={styles.imgContainer}>
          {
            dayPokemon.img ?
              <Image
                style={styles.img}
                source={{ uri: dayPokemon.img }}
              />
              : null
          }
        </View>
        {
          dayPokemon.name ?
            <Text style={[styles.txtColor(colorSet.dark), styles.pokeName(colorSet.mid)]}>
              {formatPokemonName(dayPokemon.name)}
            </Text>
            : null
        }
      </View>
      <Text style={styles.dayName}>{dayData.day ? dayData.day : '--'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },

  card: (bgColor) => ({
    flex: 1,
    backgroundColor: bgColor,
    borderRadius: 15,
    marginBottom: 5,
    width: 100,
    paddingVertical: 5,
  }),

  dayName: {
    textAlign: 'center',
  },

  txtColor: (txtColor) => ({
    color: txtColor,
  }),

  deg: {
    fontSize: 26,
    textAlign: 'center',
  },

  descrip: {
    fontSize: 16,
    textAlign: 'center',
  },

  imgContainer: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  img: {
    flex: 1,
    resizeMode: 'contain',
    transform: [{ scale: 1.5 }],
    position: 'relative',
    top: 15,
  },

  pokeName: (borderColor) => ({
    borderTopWidth: 1,
    borderColor: borderColor,
    paddingTop: 5,
    textAlign: 'center',
  }),
});