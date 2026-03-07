import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { Link } from "expo-router";

export default function HomeScreen() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(res => res.json())
      .then(data => setPokemon(data.results));
  }, []);

  const getIdFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  const filteredPokemon = pokemon.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex:1, backgroundColor:"#fff", paddingTop:50 }}>

      <TextInput
        placeholder="Buscar Pokémon..."
        value={search}
        onChangeText={setSearch}
        style={{
          margin:10,
          padding:10,
          borderWidth:1,
          borderRadius:10
        }}
      />

      <FlatList
        data={filteredPokemon}
        keyExtractor={(item) => item.name}
        numColumns={2}
        renderItem={({ item }) => {
          const id = getIdFromUrl(item.url);

          const image =
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <Link href={`/pokemon/${item.name}`} asChild>
              <TouchableOpacity
                style={{
                  flex:1,
                  margin:10,
                  backgroundColor:"#f2f2f2",
                  borderRadius:10,
                  alignItems:"center",
                  padding:15
                }}
              >
                <Image
                  source={{ uri: image }}
                  style={{ width:80, height:80 }}
                />

                <Text style={{
                  fontSize:18,
                  color:"#000",
                  marginTop:10,
                  textTransform:"capitalize"
                }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            </Link>
          );
        }}
      />
    </View>
  );
}