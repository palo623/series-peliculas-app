import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from "../config/firebase.js";

export const MovieModel = {
    formatData: (rawJson) => ({
        title: rawJson.Title,
        year: rawJson.Year,
        director: rawJson.Director,
        poster: rawJson.Poster,
        createdAt: new Date().toISOString()
    }),
    existsMovie: async (movieTitle) => {
        const q = query(
            collection(db, "movies"),
            where("title", "==", movieTitle.trim())
        );

        const snapshot = await getDocs(q);
        return !snapshot.empty;
    },
    saveToDatabase: async (movieData) => {
        try {
            if (!db) {
                throw new Error("Firestore no está inicializado. Revisa tu configuración en src/config/firebase.js");
            }

            const title = movieData.title?.trim();
            const alreadyExists = await MovieModel.existsMovie(title);

            if (alreadyExists) {
                console.log(`⚠️ La película "${title}" ya existe en Firestore.`);
                return null;
            }

            const docRef = await addDoc(collection(db, "movies"), movieData);
            console.log("✅ Guardado con ID:", docRef.id);
            return docRef.id;
        } catch (error) {
            console.error("❌ Error en Firestore:", error.message || error);
            throw error;
        }
    }
};