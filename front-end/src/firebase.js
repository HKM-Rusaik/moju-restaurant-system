import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBN1MIthapKUdqx3wO4VbmfpU1mgNAphk8",
  authDomain: "moju-restaurant.firebaseapp.com",
  projectId: "moju-restaurant",
  storageBucket: "moju-restaurant.appspot.com",
  messagingSenderId: "756840426870",
  appId: "1:756840426870:web:3c706e025ce85686fade57",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
