import express from "express";

import { getTrendingMovies } from "../controllers/movie.controller.js";

const router = express.Router();

// router.post("/", createMovie);
// router.get("/", getAllMovies);
// router.get("/:id", getMovie);
// router.put("/:id", updateMovie);
// router.delete("/:id", deleteMovie);
router.get("/trending", getTrendingMovies);

export default router;