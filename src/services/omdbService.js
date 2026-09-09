const OMDB_API_KEY = "607a0b75";

export const omdbService = {
    searchMovie: async (movieTitle) => {
        console.log(`1. Buscando "${movieTitle}" en OMDb...`);
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${OMDB_API_KEY}`);
        const data = await response.json();

        if (data.Response === "False") throw new Error(data.Error);

        return data;
    }
};
