import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBkJhofMTbnEV5nfg4hlvNbK_ZI9AT5JEA",
  authDomain: "proyecto-peliculas-5fa16.firebaseapp.com",
  projectId: "proyecto-peliculas-5fa16",
  storageBucket: "proyecto-peliculas-5fa16.firebasestorage.app",
  messagingSenderId: "665188747912",
  appId: "1:665188747912:web:2a97f6a8bcd79cb3c96d3d",
  measurementId: "G-82M6WQ60RN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);