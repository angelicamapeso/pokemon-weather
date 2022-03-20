import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { usePokemonWeather } from '../context/PokemonWeatherContext';

import DayWeather from './DayWeather';

export default function DailyWeather() {
  const { pokemonWeatherData } = usePokemonWeather();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Weather</Text>
      <ScrollView horizontal>
        {pokemonWeatherData.daily ?
          pokemonWeatherData.daily.map((day, i) => (
            <DayWeather
              key={i}
              dayData={day}
            />
          ))
          : null
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    paddingRight: 0,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 15,
  },
});