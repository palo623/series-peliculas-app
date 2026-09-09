import { MovieModel } from "./movieModel.js";

const OMDB_API_KEY = "TU_API_KEY_OMDB";

export const MovieController = {
    processMovieRequest: async (movieTitle) => {
        try {
            console.log(`1. Buscando "${movieTitle}" en OMDb...`);
            const response = await fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=${OMDB_API_KEY}`);
            const data = await response.json();

            if (data.Response === "False") throw new Error(data.Error);

            const cleanData = MovieModel.formatData(data);
            console.log("2. Datos limpios:", cleanData);
            
            await MovieModel.saveToDatabase(cleanData);
        } catch (error) {
            console.error("❌ Fallo en el Controlador:", error.message);
        }
    }
};