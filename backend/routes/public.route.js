// backend/routes/public.route.js
import express from "express";
import { getTrendingMovie } from "../controllers/movie.controller.js";

const router = express.Router();

// Publicly accessible trending route
router.get("/trending", getTrendingMovie);

export default router;
