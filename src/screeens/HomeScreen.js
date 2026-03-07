import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
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
          <TouchableOpacity
            onPress={() => navigation.navigate("Pokemon", { name: item.name })}
          >
            <Text style={{fontSize:20, margin:10}}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}