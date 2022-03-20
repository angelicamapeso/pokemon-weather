import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function DailyWeather({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Weather</Text>
      <ScrollView horizontal>
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    paddingRight: 0,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});