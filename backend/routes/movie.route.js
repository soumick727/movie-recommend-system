import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";


import { getTrendingMovie, getPopularMovie, searchMovies, getGenres, getMovieVideos, getMovieDetails, getSimilarMovies, getMoviesByCategory } from "../controllers/movie.controller.js";

const router = express.Router();

// router.post("/", createMovie);
// router.get("/", getAllMovies);
// router.get("/:id", getMovie);
// router.put("/:id", updateMovie);
// router.delete("/:id", deleteMovie);
router.get("/trending", getTrendingMovie);
router.get("/popular", getPopularMovie);
router.get("/search", searchMovies);
router.get("/genres", getGenres);
router.get("/:movieId/videos", getMovieVideos);
router.get("/:movieId/details", getMovieDetails);
router.get("/:movieId/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory); 
export default router;