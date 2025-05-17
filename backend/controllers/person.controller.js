import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getPersonDetails(req, res) {
    try {
        const { id } = req.params;
        const url = `https://api.themoviedb.org/3/person/${id}?language=en-US`;
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "Person details fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error fetching person details:", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" });
    }
}

export async function getPersonMovies(req, res) {
    try {
        const { id } = req.params;
        const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`;
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "Person movies fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error fetching person movies:", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" });
    }
}
export async function getPersonTVShows(req, res) {
    try {
        const { id } = req.params;
        const url = `https://api.themoviedb.org/3/person/${id}/tv_credits?language=en-US`;
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "Person TV shows fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error fetching person TV shows:", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" });
    }
}
export async function getPersonImages(req, res) {
    try {
        const { id } = req.params;
        const url = `https://api.themoviedb.org/3/person/${id}/images?language=en-US`;
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "Person images fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error fetching person images:", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" });
    }
}
export async function getPersonCombinedCredits(req, res) {
    try {
        const { id } = req.params;
        const url = `https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`;
        const data = await fetchFromTMDB(url);
        res.json({
            success: true,
            message: "Person combined credits fetched successfully",
            content: data,
        });
    } catch (error) {
        console.error("Error fetching person combined credits:", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" });
    }
}
