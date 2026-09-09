import { collection, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from "../config/firebase.js";

const slugifyTitle = (title) =>
    title
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "untitled";

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
            if (!db) {
                throw new Error("Firestore no está inicializado. Revisa tu configuración en src/config/firebase.js");
            }

            const title = movieData.title?.trim();
            const movieId = slugifyTitle(title);
            const docRef = doc(collection(db, "movies"), movieId);
            const existing = await getDoc(docRef);

            if (existing.exists()) {
                console.log(`⚠️ La película "${title}" ya existe en Firestore.`);
                return movieId;
            }

            await setDoc(docRef, movieData);
            console.log("✅ Guardado con ID:", movieId);
            return movieId;
        } catch (error) {
            console.error("❌ Error en Firestore:", error.message || error);
            throw error;
        }
    }
};