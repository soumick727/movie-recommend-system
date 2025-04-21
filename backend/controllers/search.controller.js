import { fetchFromTMDB } from "../services/tmdb.service.js";

import User from "../models/user.model.js";


export const searchMovies = async (req, res) => {
    try {
        const { query } = req.params;
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
        const data = await fetchFromTMDB(url);

        if(data.results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No movies found",
            });
        }
        
        await User.findByIdAndUpdate(req.user._id, {
            $push: { 
                searchHistory: { 
                    id: data.results[0].id,
                    name: data.results[0].poster_path,
                    title: data.results[0].title,
                    searchType: "movie",
                    searchDate: new Date(),    
                }, 
            },
        });
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
};

export const searchTvs = async(req, res) => {
    try {
        const {query} = req.params;
        const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`;
        const data =  await fetchFromTMDB(url);
        if(data.results.length === 0){
            return res.status(404).json({
                success: false,
                message: "No tvs found",
            });
        }
        await User.findByIdAndUpdate(req.user._id,{
            $push: { 
                searchHistory: { 
                    id:data.results[0].id,
                    name: data.results[0].poster_path,
                    title: data.results[0].name,
                    searchType: "tv",
                    searchDate: new Date(),    
                }, 
        },
        })
        res.json({
            success: true,
            message: "Search tvs fetched successfully",
            content: data,
        })
    } catch (error) {
        
        console.error("Error fetching search tvs:", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" 
        });
    }
};

export const searchPerson = async(req, res) => {
    try {
        const {query} = req.params;
        const url = `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`;
        const data =  await fetchFromTMDB(url);
        if(data.results.length === 0){
            return res.status(404).json({
                success: false,
                message: "No person found",
            });
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push: { 
                searchHistory: { 
                    id:data.results[0].id,
                    name: data.results[0].profile_path,
                    title: data.results[0].name,
                    searchType: "person",
                    searchDate: new Date(),    
                }, 
        },
        })
        res.json({
            success: true,
            message: "Search person fetched successfully",
            content: data,
        })
    } catch (error) {
        
        console.error("Error fetching search person:", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" 
        });
    }
};

export const deleteSearchHistory = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(req.user._id,{
            $pull: { searchHistory: { _id: id },
         },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        if(user.searchHistory.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No search history found",
            });
        }

        res.json({
            success: true,
            message: "Search history deleted successfully",
            content: user.searchHistory,
        })
    }
    catch(error){
        console.error("Error deleting search history:", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" 
        });
    }
}

export const getSearchHistory = async (req, res) => {
    try {
        const user = await User.findById(req.user._id, {
            searchHistory: 1,
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const sortedHistory = user.searchHistory.sort((a, b) => new Date(b.searchDate) - new Date(a.searchDate));
        res.json({
            success: true,
            message: "Search history fetched successfully",
            content: sortedHistory,
        });
    } catch (error) {
        console.error("Error fetching search history:", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" 
        });
    }
}

export const deleteAllSearchHistory = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $set: { searchHistory: [] } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        if(user.searchHistory.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No search history found",
            });
        }

        res.json({
            success: true,
            message: "All search history deleted successfully",
            content: user.searchHistory,
        });
    } catch (error) {
        console.error("Error deleting all search history:", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" 
        });
    }
};
