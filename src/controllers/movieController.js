import { MovieModel } from "./movieModel.js";
import { omdbService } from "../services/omdbService.js";

export const MovieController = {
    processMovieRequest: async (movieTitle) => {
        try {
            const data = await omdbService.searchMovie(movieTitle);
            const cleanData = MovieModel.formatData(data);
            console.log("2. Datos limpios:", cleanData);
            
            await MovieModel.saveToDatabase(cleanData);
        } catch (error) {
            console.error("❌ Fallo en el Controlador:", error.message);
        }
    }
};