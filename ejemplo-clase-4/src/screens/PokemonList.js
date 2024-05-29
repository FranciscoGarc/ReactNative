import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const numColumns = 3;

import PokemonItem from '../components/PokemonItem';
import FormularioPokemon from '../components/FormularioPokemon';

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cantidadPokemon, setCantidadPokemon] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${cantidadPokemon}`);
      const data = await response.json();
      const detailedPokemon = await Promise.all(
        data.results.map(async (result, index) => {
          const response = await fetch(result.url);
          const details = await response.json();
          return { ...result, id: index + 1, details };
        })
      );
      setPokemon(detailedPokemon);
    } catch (error) {
      console.log("Hubo un error listando los pokemones", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cantidadPokemon]);

  const filteredPokemon = pokemon.filter(p => p.name.includes(searchTerm));

  return (
    <View style={styles.container}>
      <FormularioPokemon
        tituloFormulario='Listado de Pokemones usando Fetch'
        labelInput='Ingrese la cantidad de pokemon a cargar: '
        placeHolderInput='20'
        valor={cantidadPokemon}
        setValor={setCantidadPokemon}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
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
  list: {
    justifyContent: 'center',
  },
  loading: {
    marginTop: 20,
  },
});
