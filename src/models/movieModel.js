import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from "./config.js";

export const MovieModel = {
    formatData: (rawJson) => ({
        title: rawJson.Title,
        year: rawJson.Year,
        director: rawJson.Director,
        poster: rawJson.Poster,
        createdAt: new Date().toISOString()
    }),
    saveToDatabase: async (movieData) => {
        try {
            const docRef = await addDoc(collection(db, "movies"), movieData);
            console.log("✅ Guardado con ID:", docRef.id);
            return docRef.id;
        } catch (error) {
            console.error("❌ Error en Firestore:", error);
            throw error;
        }
    }
};