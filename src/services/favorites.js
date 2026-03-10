import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export async function saveFavorite(pokemon) {

  try {

    const q = query(
      collection(db, "favorites"),
      where("name", "==", pokemon.name)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      console.log("Pokemon já favoritado");
      return false;
    }

    await addDoc(collection(db, "favorites"), {
      name: pokemon.name ?? "",
      weight: pokemon.weight ?? 0,
      image: pokemon.image ?? "",
      createdAt: new Date()
    });

    console.log("Pokemon salvo!");
    return true;

  } catch (error) {

    console.error("Erro ao salvar:", error);
    return false;

  }
}

export async function isFavorite(name) {

  const q = query(
    collection(db, "favorites"),
    where("name", "==", name)
  );

  const snapshot = await getDocs(q);

  return !snapshot.empty;
}