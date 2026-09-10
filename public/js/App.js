const { useState, useEffect } = React;

function App() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const res = await fetch("/api/movies");
            const data = await res.json();
            setMovies(data);
        } catch (e) {
            console.error("Error al cargar películas:", e);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await fetch(`/api/movies/search?t=${encodeURIComponent(query.trim())}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error al buscar");
            }

            setResult(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!result) return;

        setSaving(true);
        try {
            const res = await fetch("/api/movies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(result)
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error al guardar");
            }

            setResult(null);
            setQuery("");
            fetchMovies();
        } catch (e) {
            setError(e.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="app">
            <h1>Películas y Series</h1>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar película..."
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </form>

            {error && <p className="error">{error}</p>}

            {result && (
                <div className="result">
                    <div className="result-content">
                        {result.Poster && result.Poster !== "N/A" && (
                            <img src={result.Poster} alt={result.Title} className="poster" />
                        )}
                        <div className="result-info">
                            <h2>{result.Title} ({result.Year})</h2>
                            <p><strong>Director:</strong> {result.Director}</p>
                            <p><strong>Género:</strong> {result.Genre}</p>
                            <p><strong>Sinopsis:</strong> {result.Plot}</p>
                            <button onClick={handleSave} disabled={saving}>
                                {saving ? "Guardando..." : "Guardar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <h2>Películas guardadas ({movies.length})</h2>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        {movie.poster && movie.poster !== "N/A" && (
                            <img src={movie.poster} alt={movie.title} />
                        )}
                        <div>
                            <h3>{movie.title} ({movie.year})</h3>
                            <p>{movie.genre}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
