import { StyleSheet, Text, View } from 'react-native';
import { usePokemonWeather } from '../context/PokemonWeatherContext';

export default function CurrentWeather() {
  const { pokemonWeatherData } = usePokemonWeather();

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={[styles.white, styles.main, styles.center]}>
          {pokemonWeatherData?.current?.temp ?
            Math.floor(pokemonWeatherData.current.temp) + '°' :
            '--'
          }
        </Text>
        <Text style={[styles.white, styles.small, styles.center]}>
          {'Feels like ' +
            (pokemonWeatherData?.current?.feels_like ?
              Math.floor(pokemonWeatherData.current.feels_like) + '°' :
              '--')
          }
        </Text>
      </View>
      <View style={[styles.leftBorder, styles.textBox]}>
        <Text style={[styles.white, styles.descrip]}>
          {pokemonWeatherData?.current?.descrip ?
            pokemonWeatherData.current.descrip :
            '--'
          }
        </Text>
        <Text style={[styles.white, styles.small]}>
          {'Humidity: ' +
            (pokemonWeatherData?.current?.humidity ?
              pokemonWeatherData.current.humidity + '%' :
              '--')
          }
        </Text>
        <Text style={[styles.white, styles.small]}>
          {'Wind: ' +
            (pokemonWeatherData?.current?.wind_speed ?
              Math.floor(pokemonWeatherData.current.wind_speed * 3.6) + ' km/h' :
              '--')
          }
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    padding: 30,
  },
  leftBorder: {
    borderLeftWidth: 1,
    borderLeftColor: 'white',
  },
  white: {
    color: 'white',
  },
  center: {
    textAlign: 'center',
  },
  main: {
    fontSize: 70,
  },
  small: {
    fontSize: 17,
  },
  descrip: {
    fontSize: 25,
    paddingBottom: 15,
  },
});