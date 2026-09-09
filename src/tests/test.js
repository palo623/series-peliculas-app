import { MovieController } from "../controllers/movieController.js";

const tituloBuscado = "The Matrix"; // Simulación de input

if (!window.__movieRequestRan) {
    window.__movieRequestRan = true;
    MovieController.processMovieRequest(tituloBuscado);
}