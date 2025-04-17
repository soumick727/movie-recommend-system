import axios from "axios";
import  dotenv from "dotenv";

dotenv.config({ path: "./backend/.env" });

export const fetchFromTMDB = async (url) => {
    if (!process.env.TMDB_API_KEY) {
        throw new Error("TMDB_API_KEY is not defined in environment variables");
    }

  const options = {
    headers: {
        accept: "application/json",
        Authorization: 'Bearer ' + process.env.TMDB_API_KEY
    },
  };
   
  const response = await axios.get(url, options);

    if (response.status !== 200) {
        throw new Error(`Error fetching data from TMDB: ${response.statusText}`);
    }

    return response.data;
}