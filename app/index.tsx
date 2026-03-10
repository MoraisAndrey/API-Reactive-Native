import React, { useEffect, useState } from "react";
import { View, TextInput, FlatList, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Home() {

  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then(res => res.json())
      .then(data => {
        setPokemons(data.results);
      });
  }, []);

  const filtered = pokemons.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.search}
        placeholder="Buscar Pokémon..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {

          const id = item.url.split("/")[6];
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/pokemon/${item.name}`)}
            >

              <Image source={{ uri: image }} style={styles.image} />

              <Text style={styles.name}>
                {item.name}
              </Text>

            </TouchableOpacity>
          );
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },

  search: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20
  },

  card: {
    alignItems: "center",
    marginBottom: 20
  },

  image: {
    width: 100,
    height: 100
  },

  name: {
    fontSize: 18,
    textTransform: "capitalize"
  }
});