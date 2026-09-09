import { MovieController } from "../controllers/movieController.js";

const tituloBuscado = "Dune"; // Simulación de input

if (!window.__movieRequestRan) {
    window.__movieRequestRan = true;
    MovieController.processMovieRequest(tituloBuscado);
}