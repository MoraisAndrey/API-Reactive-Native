import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { saveFavorite } from "../services/favorites";
export default function PokemonScreen() {

  const { name } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => setPokemon(data));
  }, [name]);

  if (!pokemon) return <Text>Carregando...</Text>;

  const handleFavorite = () => {
    saveFavorite({
      name: pokemon.name,
      weight: pokemon.weight
    });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {pokemon.name}
      </Text>

      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={styles.image}
      />

      <Text style={styles.text}>
        Peso: {pokemon.weight}
      </Text>

      <Text style={styles.text}>
        Altura: {pokemon.height}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleFavorite}
      >
        <Text style={styles.buttonText}>
          Favoritar ⭐
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  title: {
    fontSize: 32,
    textTransform: "capitalize",
    marginBottom: 20
  },

  image: {
    width: 150,
    height: 150
  },

  text: {
    fontSize: 18,
    marginTop: 10
  },

  button: {
    marginTop: 20,
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 8
  },

  buttonText: {
    fontWeight: "bold"
  }
});