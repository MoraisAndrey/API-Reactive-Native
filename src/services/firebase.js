import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBh-j2e3ZZcOgHiRYn6A6-gnU8oa3T6YuQ",
  authDomain: "pokedex-dd80c.firebaseapp.com",
  projectId: "pokedex-dd80c",
  storageBucket: "pokedex-dd80c.firebasestorage.app",
  messagingSenderId: "849685859169",
  appId: "1:849685859169:web:ac6b8ec16985f981b69320",
  measurementId: "G-RYGN437P0Z"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);