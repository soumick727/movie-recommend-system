import { fetchFromTMDB } from "../services/tmdb.service.js";

//const Base_URL = "https://api.themoviedb.org/3/movie";

export const getTrendingMovies = async (req, res) => {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
        res.status(200).json({
            success: true,
            message: "Trending movies fetched successfully",
            movies: data.results,
        });
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        res.status(500).json({ success: false, message: "Error fetching trending movies" });
    }
}