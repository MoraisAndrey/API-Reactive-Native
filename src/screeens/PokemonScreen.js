import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

export default function PokemonScreen({ route }) {
  const { name } = route.params;
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => setPokemon(data));
  }, []);

  if (!pokemon) return <Text>Carregando...</Text>;

  return (
    <View>
      <Text style={{fontSize:30}}>{pokemon.name}</Text>

      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={{ width: 150, height: 150 }}
      />

      <Text>Peso: {pokemon.weight}</Text>
    </View>
  );
}