import { MovieController } from "../controllers/movieController.js";

<<<<<<< HEAD
const tituloBuscado = "dune"; // Simulación de input
=======
const tituloBuscado = "The Matrix"; // Simulación de input
>>>>>>> 9c67c6dc69d02d906686136ec45bc84d069a429b

if (!window.__movieRequestRan) {
    window.__movieRequestRan = true;
    MovieController.processMovieRequest(tituloBuscado);
}