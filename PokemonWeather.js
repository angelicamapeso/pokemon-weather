import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { usePokemonWeather } from './context/PokemonWeatherContext';
import { getWeatherData, extractWeatherConditions } from './api/weatherAPI';
import { weatherConditionsToPokeTypes } from './api/pokemonAPI';

export default function PokemonWeather() {
  const { weatherData, initializeWeatherData } = usePokemonWeather();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.debug("Location denied.");
        return;
      }

      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      const data = await getWeatherData({ lat: latitude, long: longitude });
      initializeWeatherData(data);
    })()
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
