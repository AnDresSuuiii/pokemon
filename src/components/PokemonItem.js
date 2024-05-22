import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const numColumns = 3;

export default function PokemonItem({ item }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png` }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.abilities}>Habilidades: {item.abilities}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    margin: 5,
    width: WIDTH / numColumns - 10,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    textTransform: 'capitalize',
  },
  abilities: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  image: {
    width: 80,
    height: 80,
  },
});
