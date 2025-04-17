import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingTv(req, res) {
    try {
        const url = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "Trending TV shows fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error fetching trending TV shows:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function getPopularTv(req, res) {
    try {
        const url = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "Popular TV shows fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error fetching popular TV shows:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function searchTvs(req, res) {
    try {
        const { query } = req.query;
        const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`;
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "Search TV shows fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error searching TV shows:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function getGenres(req, res) {
    try {
        const url = "https://api.themoviedb.org/3/genre/tv/list?language=en-US";
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "TV genres fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error fetching TV genres:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function getTvVideos(req, res) {
    try {
        const { TvId } = req.params;
        const url = `https://api.themoviedb.org/3/tv/${TvId}/videos?language=en-US`;
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "TV show videos fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error fetching TV videos:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function getTvDetails(req, res) {
    try {
        const { TvId } = req.params;
        const url = `https://api.themoviedb.org/3/tv/${TvId}?language=en-US`;
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "TV show details fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error fetching TV details:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function getSimilarTvs(req, res) {
    try {
        const { TvId } = req.params;
        const url = `https://api.themoviedb.org/3/tv/${TvId}/similar?language=en-US&page=1`;
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "Similar TV shows fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error fetching similar TV shows:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function getTvsByCategory(req, res) {
    try {
        const { category } = req.params;
        const validCategories = ["airing_today", "on_the_air", "top_rated", "popular"];
        if (!validCategories.includes(category)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category parameter",
            });
        }
        const url = `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`;
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: `TV shows by '${category}' fetched successfully`,
            content: data,
        });
    } catch (error) {
        console.error("Error fetching TV shows by category:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
