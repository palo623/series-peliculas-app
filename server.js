const express = require("express");
const cors = require("cors");
const path = require("path");
const movieRoutes = require("./src-backend/routes/movieRoutes");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", movieRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Servidor arrancado en http://localhost:${PORT}`);
});
