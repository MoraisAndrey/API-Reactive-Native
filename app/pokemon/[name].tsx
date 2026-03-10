import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { saveFavorite, isFavorite } from "../../src/services/favorites";

export default function PokemonScreen() {

  const { name } = useLocalSearchParams();

  const [pokemon, setPokemon] = useState(null);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => setPokemon(data));

    checkFavorite();

  }, [name]);

  const checkFavorite = async () => {

    const result = await isFavorite(name);

    if (result) {
      setFavorite(true);
    }

  };

  if (!pokemon) return <Text>Carregando...</Text>;

  const handleFavorite = async () => {

    const saved = await saveFavorite({
      name: pokemon.name,
      weight: pokemon.weight,
      image: pokemon.sprites.front_default
    });

    if (saved) {
      setFavorite(true);
      Alert.alert("Sucesso", "Pokemon salvo nos favoritos!");
    } else {
      Alert.alert("Aviso", "Esse Pokémon já está nos favoritos.");
    }

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
        style={[styles.button, favorite && styles.buttonDisabled]}
        onPress={handleFavorite}
      >

        <Text style={styles.buttonText}>
          {favorite ? "⭐ Já favoritado" : "Favoritar ⭐"}
        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5"
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 20
  },

  image: {
    width: 200,
    height: 200
  },

  text: {
    fontSize: 20,
    marginTop: 10
  },

  button: {
    marginTop: 30,
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 10
  },

  buttonDisabled: {
    backgroundColor: "#ccc"
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold"
  }

});