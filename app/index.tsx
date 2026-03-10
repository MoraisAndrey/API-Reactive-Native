import React, { useEffect, useState } from "react";
import { View, TextInput, FlatList, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { router } from "expo-router";

export default function Home() {

  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPokemons();
  }, []);

  async function loadPokemons() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
      const data = await response.json();
      setPokemons(data.results);
    } catch (error) {
      console.log("Erro ao buscar pokemons:", error);
    } finally {
      setLoading(false);
    }
  }

  const filtered = pokemons.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
        <Text>Carregando Pokédex...</Text>
      </View>
    );
  }

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
        numColumns={2}
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
    padding: 20,
    backgroundColor: "#f2f2f2"
  },

  search: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "white"
  },

  card: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    margin: 10,
    padding: 20,
    borderRadius: 15,
    elevation: 3
  },

  image: {
    width: 120,
    height: 120
  },

  name: {
    fontSize: 18,
    textTransform: "capitalize",
    marginTop: 10,
    fontWeight: "bold"
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }

});