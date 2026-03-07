import { View, Text, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function PokemonScreen() {
  const { name } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => setPokemon(data));
  }, []);

  if (!pokemon) return <Text>Carregando...</Text>;

  return (
    <View style={{
      flex:1,
      backgroundColor:"#fff",
      alignItems:"center",
      justifyContent:"center"
    }}>
      <Text style={{
        fontSize:32,
        fontWeight:"bold",
        textTransform:"capitalize"
      }}>
        {pokemon.name}
      </Text>

      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={{ width:150, height:150, margin:20 }}
      />

      <Text style={{ fontSize:18 }}>Peso: {pokemon.weight}</Text>
      <Text style={{ fontSize:18 }}>Altura: {pokemon.height}</Text>
    </View>
  );
}