import axios from "axios";

export const fetchFromTMDB = async (url) => {
    if (!process.env.TMDB_API_KEY) {
        throw new Error("TMDB_API_KEY is not defined in environment variables");
    }

  const options = {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };
    try {
        const { data } = await axios.get(url, options);
        return data;
    } catch (error) {
        console.error("Error fetching data from TMDB:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}