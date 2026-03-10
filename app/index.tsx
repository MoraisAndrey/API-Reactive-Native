import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput
} from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {

  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then(res => res.json())
      .then(data => {
        setPokemon(data.results);
        setFilteredPokemon(data.results);
      });
  }, []);

  const handleSearch = (text) => {

    setSearch(text);

    if (text === "") {
      setFilteredPokemon(pokemon);
      return;
    }

    const filtered = pokemon.filter(p =>
      p.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredPokemon(filtered);
  };

  const renderPokemon = ({ item }) => {

    const id = item.url.split("/")[6];

    const image =
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return (

      <Link href={`/pokemon/${item.name}`} asChild>

        <TouchableOpacity style={styles.card}>

          <Image
            source={{ uri: image }}
            style={styles.image}
          />

          <Text style={styles.name}>
            {item.name}
          </Text>

        </TouchableOpacity>

      </Link>

    );
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Pokedex
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Buscar Pokémon..."
        value={search}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredPokemon}
        keyExtractor={(item) => item.name}
        renderItem={renderPokemon}
      />

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10
  },

  search: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    elevation: 3
  },

  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4
  },

  image: {
    width: 80,
    height: 80,
    marginRight: 20
  },

  name: {
    fontSize: 22,
    textTransform: "capitalize",
    fontWeight: "bold"
  }

});