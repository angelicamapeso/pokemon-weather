import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NORMAL, TYPE_TO_COLORS } from '../constants/pokemonConstants';

export default function TypeLabel({ style, type }) {
  const [typeColor, setTypeColor] = useState('');

  useEffect(() => {
    let def = TYPE_TO_COLORS[NORMAL];
    if (type) {
      if (!TYPE_TO_COLORS[type]) {
        console.warn('Type Color not found: ' + type);
        setTypeColor(def);
        return;
      }

      setTypeColor(TYPE_TO_COLORS[type]);
    } else {
      setTypeColor(def);
    }
  }, [])

  return (
    <View style={[styles.container(typeColor), style]}>
      <Text style={styles.typeTxt}>{type ? type.toUpperCase() : 'UNKNOWN'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: (bgColor) => ({
    backgroundColor: bgColor,
    borderRadius: 100,
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'white',
  }),

  typeTxt: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 5
  },
});