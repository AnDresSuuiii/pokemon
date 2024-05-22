import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ActivityIndicator, TextInput } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const numColumns = 3;

import PokemonItem from '../components/PokemonItem';
import FormularioPokemon from '../components/FormularioPokemon';

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cantidadPokemon, setCantidadPokemon] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${cantidadPokemon}`);
      const data = await response.json();

      const detailedData = await Promise.all(data.results.map(async (result, index) => {
        const detailsResponse = await fetch(result.url);
        const details = await detailsResponse.json();
        const abilities = await getAbilitiesInSpanish(details.abilities);
        return {
          ...result,
          id: index + 1,
          abilities: abilities.join(', '),
        };
      }));

      setPokemon(detailedData);
    } catch (error) {
      console.log("Hubo un error listando los pokemones", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cantidadPokemon]);

  const getAbilitiesInSpanish = async (abilities) => {
    try {
      const abilitiesInSpanish = await Promise.all(abilities.map(async (ability) => {
        const response = await fetch(ability.ability.url);
        const data = await response.json();
        return data.names.find(name => name.language.name === "es").name;
      }));
      return abilitiesInSpanish;
    } catch (error) {
      console.log("Hubo un error obteniendo las habilidades en español", error);
      return abilities.map(ability => ability.ability.name);
    }
  };

  const filteredPokemon = pokemon.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={styles.container}>
      <FormularioPokemon
        tituloFormulario='Listado de Pokemones usando Fetch'
        labelInput='Ingrese la cantidad de pokemon a cargar: '
        placeHolderInput='20'
        valor={cantidadPokemon}
        setValor={setCantidadPokemon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar Pokémon por nombre"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredPokemon}
          renderItem={({ item }) => <PokemonItem item={item} />}
          keyExtractor={(item) => item.name}
          numColumns={numColumns}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: WIDTH / numColumns - 10,
    borderRadius: 50,
    paddingHorizontal: 10,
    marginVertical: 20,
    width: '80%',
  },
  list: {
    justifyContent: 'center',
  },
  loading: {
    marginTop: 20,
  },
});
