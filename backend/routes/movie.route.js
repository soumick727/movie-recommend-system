import express from "express";



import { getTrendingMovie, getPopularMovie, searchMovies, getGenres, getMovieVideos, getMovieDetails, getSimilarMovies, getMoviesByCategory,getMovieCredits,getMovieRecommendations,getMovieReviews } from "../controllers/movie.controller.js";

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
router.get("/:movieId/credits", getMovieCredits);
router.get("/:movieId/recommendations", getMovieRecommendations);
router.get("/:movieId/reviews", getMovieReviews);

export default router;