import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Image, ImageBackground} from 'react-native';

const fetchPokemons = async (callback) => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
    const parsed = await response.json();
    const pokemonList = parsed.results;

    const pokemonDetails = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url);
        const detailData = await detailResponse.json();
        return {
          name: detailData.name,
          image: detailData.sprites.front_default,
        };
      })
    );

    callback(pokemonDetails);
  } catch (error) {
    console.error(error);
  }
};

export default function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons(setPokemons);
  }, []);

  return (
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/originals/d6/9e/f6/d69ef6bd0de80cb5f7ee0ff2c0c372e1.jpg' }} // Substitua pelo URL da sua imagem de fundo
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.Titulo}>Pokémon API</Text>
        <FlatList
          data={pokemons}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>
          )}
        />
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  Titulo: {
    fontSize: 60,
    marginVertical: 20,
    color: 'white',
  },
  item: {
    alignItems: 'center',
    margin: 5,
    padding: 10,
    backgroundColor: '#a3a3a3',
    borderRadius: 10,
  },
  itemText: {
    fontSize: 40,
    color: 'white',
  },
  image: {
    width: 250,
    height: 250,
  },
});
