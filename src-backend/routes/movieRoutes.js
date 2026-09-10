const express = require("express");
const router = express.Router();
const { omdbService } = require("../services/omdbService");
const { MovieModel } = require("../models/movieModel");

router.get("/health", async (req, res) => {
    let firestore = false;
    try {
        const admin = require("firebase-admin");
        const apps = admin.apps;
        firestore = apps.length > 0;
    } catch (e) {
        firestore = false;
    }
    res.json({
        status: "ok",
        firestore,
        timestamp: new Date().toISOString()
    });
});

router.get("/movies/search", async (req, res) => {
    const { t } = req.query;
    if (!t) {
        return res.status(400).json({ error: "Falta el parámetro 't' (título)" });
    }
    try {
        const data = await omdbService.searchMovie(t);
        const cleanData = MovieModel.formatData(data);
        res.json(cleanData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/movies", async (req, res) => {
    try {
        const movieId = await MovieModel.saveToDatabase(req.body);
        res.json({ ok: true, id: movieId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/movies", async (req, res) => {
    try {
        const movies = await MovieModel.getAllMovies();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
