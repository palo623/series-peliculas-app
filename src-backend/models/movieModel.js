let db = null;

try {
    const admin = require("firebase-admin");
    const path = require("path");
    const keyPath = path.join(__dirname, "../../firebase-key.json");

    try {
        require("fs").accessSync(keyPath);
        const serviceAccount = require(keyPath);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        db = admin.firestore();
        console.log("Firestore conectado");
    } catch (e) {
        console.warn("firebase-key.json no encontrado. Modo local (sin Firestore).");
    }
} catch (e) {
    console.warn("firebase-admin no disponible. Modo local.");
}

const slugifyTitle = (title) =>
    title
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "untitled";

const MovieModel = {
    formatData: (rawJson) => ({
        title: rawJson.Title,
        year: rawJson.Year,
        director: rawJson.Director,
        genre: rawJson.Genre,
        plot: rawJson.Plot,
        poster: rawJson.Poster,
        createdAt: new Date().toISOString()
    }),

    saveToDatabase: async (movieData) => {
        if (!db) {
            console.log("Modo local: no se guarda en Firestore.");
            return slugifyTitle(movieData.title);
        }

        try {
            const title = movieData.title?.trim();
            const movieId = slugifyTitle(title);
            const docRef = db.collection("movies").doc(movieId);
            const existing = await docRef.get();

            if (existing.exists) {
                console.log(`La película "${title}" ya existe en Firestore.`);
                return movieId;
            }

            await docRef.set(movieData);
            console.log("Guardado con ID:", movieId);
            return movieId;
        } catch (error) {
            console.error("Error en Firestore:", error.message || error);
            throw error;
        }
    },

    getAllMovies: async () => {
        if (!db) {
            return [];
        }

        try {
            const snapshot = await db.collection("movies").orderBy("createdAt", "desc").get();
            const movies = [];
            snapshot.forEach((doc) => {
                movies.push({ id: doc.id, ...doc.data() });
            });
            return movies;
        } catch (error) {
            console.error("Error al listar películas:", error.message || error);
            throw error;
        }
    }
};

module.exports = { MovieModel };
