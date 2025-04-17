import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";


import { getTrendingTv, getPopularTv, searchTvs, getGenres, getTvVideos, getTvDetails, getSimilarTvs, getTvsByCategory } from "../controllers/tv.controller.js";

const router = express.Router();

// router.post("/", createTv);
// router.get("/", getAllTvs);
// router.get("/:id", getTv);
// router.put("/:id", updateTv);
// router.delete("/:id", deleteTv);
router.get("/trending", getTrendingTv);
router.get("/popular", getPopularTv);
router.get("/search", searchTvs);
router.get("/genres", getGenres);
router.get("/:TvId/videos", getTvVideos);
router.get("/:TvId/details", getTvDetails);
router.get("/:TvId/similar", getSimilarTvs);
router.get("/category/:category", getTvsByCategory);
 
export default router;