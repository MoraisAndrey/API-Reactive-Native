import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then(res => res.json())
      .then(data => setPokemon(data.results));
  }, []);

  return (
    <View>
      <FlatList
        data={pokemon}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Link href={`/pokemon/${item.name}`} asChild>
            <TouchableOpacity>
              <Text style={{ fontSize: 20, margin: 10 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}