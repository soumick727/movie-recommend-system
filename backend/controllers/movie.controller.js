import { fetchFromTMDB } from "../services/tmdb.service.js";



export async function getTrendingMovie(req, res) {
    try {
        const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "Trending movies fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error fetching trending movies:", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" });
    }
}

export async function getPopularMovie(req,res){
    try {
        const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "Popular movies fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error fetching popular movies:", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" });
    }
}

export async function searchMovies(req,res){
    try {
        const { query } = req.query;
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "Search movies fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error fetching search movies:", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" });
    }
}

export async function getGenres(req,res){
    try {
        const url = "https://api.themoviedb.org/3/genre/movie/list?language=en-US";
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "Genres fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error fetching genres:", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" });
    }
}

export async function getMovieVideos(req,res){
    try {
        const { movieId } = req.params;
        const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "Movie videos fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error fetching movie videos:", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" });
    }
}

export async function getMovieDetails(req,res){
    try {
        const { movieId } = req.params;
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "Movie details fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error fetching movie details:", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" });
    }
}

export async function getSimilarMovies(req,res){
    try {
        const { movieId } = req.params;
        const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`;
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "Similar movies fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error fetching similar movies:", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" });
    }
}

export async function getMoviesByCategory(req,res){
    try {
        const { category } = req.params;
        // Validate the category parameter to ensure it's a valid movie category
        const validCategories = ["now_playing", "upcoming", "top_rated", "popular"];
        // Check if the category is in the list of valid categories
        if (!validCategories.includes(category)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category parameter",
            });
        }
        const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`;
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: `Movies by '${category}' fetched successfully`,
            content: data,
        });
    } catch (error) {
        console.error("Error fetching movies by category:", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" });
    }
}