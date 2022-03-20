import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { usePokemonWeather } from './context/PokemonWeatherContext';
import { CLEAR, WEATHER_TO_COLORS } from './constants/weatherConstants';

export default function PokemonWeather() {
  const { pokemonWeatherData, initializePokemonWeatherData } = usePokemonWeather();
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.debug("Location denied.");
        return;
      }

      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      await initializePokemonWeatherData({ lat: latitude, long: longitude });
    })()
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (pokemonWeatherData?.current?.descrip) {
      if (WEATHER_TO_COLORS[pokemonWeatherData.current.descrip]) {
        setBgColor(WEATHER_TO_COLORS[pokemonWeatherData.current.descrip].mid);
        return;
      } else {
        console.warn('Unknown Weather Description: ' + pokemonWeatherData.current.descrip);
      }
    }

    setBgColor(WEATHER_TO_COLORS[CLEAR].mid);
  }, [pokemonWeatherData]);

  return (
    <View style={styles.container(bgColor)}>
      <Text>Open up App.js to start working on your app!!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: bgColor => ({
    flex: 1,
    backgroundColor: bgColor,
    alignItems: 'center',
    justifyContent: 'center',
  }),
});
