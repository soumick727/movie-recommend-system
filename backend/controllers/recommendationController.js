import { fetchFromTMDB } from "../services/tmdb.service.js";

const genreMap = {
  Action: 28,
  Comedy: 35,
  Drama: 18,
  Horror: 27,
  Adventure: 12,
  SciFi: 878,
  Romance: 10749,
  Mystery: 9648,
  Thriller: 53,
  Family: 10751,
  Documentary: 99,
  Crime: 80,
};
const releaseYearMap = {
  '2020-2025': { min: 2020, max: 2025 },
  '2015-2020': { min: 2015, max: 2020 },
  '2010-2015': { min: 2010, max: 2015 },
  '2005-2010': { min: 2005, max: 2010 },
  '2000-2005': { min: 2000, max: 2005 },
  'Before 2000': { min: 1900, max: 1999 },
};

const durationMap = {
  'Less than 1 hour': { min: 0, max: 60 },
  '1-2 hours': { min: 60, max: 120 },
  '2-3 hours': { min: 120, max: 180 },
  'More than 3 hours': { min: 180, max: Infinity },
}

const languageMap = {
  English: 'en',
  French: 'fr',
  Hindi: 'hi',
  Telugu: 'te',
  Bengali: 'bn',
  Tamil: 'ta',
  Malayalam: 'ml',
  Punjabi: 'pa',
};

export const recommendMovie = async (req, res) => {
  const { answers } = req.body;

  if (!answers || answers.length < 3) {
    return res.status(400).json({ message: 'Not enough answers provided.' });
  }

  try {
    // FIX: Parse genre string into array
    const selectedGenresString = answers[0]; // e.g., "Mystery,Thriller"
    const selectedGenres = selectedGenresString.split(',').map(g => g.trim());

    const genreIds = selectedGenres
      .map((genre) => genreMap[genre] || 18)
      .filter(Boolean)
      .join(',');

    const releaseYear =  releaseYearMap[answers[1]] || { min: 1900, max: 2025 };
    const originalLanguage = answers[2]; 
    const duration = durationMap[answers[3]] || { min: 0, max: Infinity };
    const languageId = languageMap[originalLanguage] || 'en';

    const url = `https://api.themoviedb.org/3/discover/movie?` +
                `with_genres=${genreIds}&` +
                `primary_release_date.gte=${releaseYear.min}-01-01&` +
                `primary_release_date.lte=${releaseYear.max}-12-31&` +
                `with_original_language=${languageId}&` +
                `sort_by=popularity.desc&` +
                `with_runtime.gte=${duration.min}&` +
                `with_runtime.lte=${duration.max}&` +
                `include_adult=false&` +
                `language=en-US&` +
                `api_key=${process.env.TMDB_API_KEY}`;

    const data = await fetchFromTMDB(url);

    const movies = data.results;
    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: 'No movies found for the selected genres, release year, and language.' });
    }

    // show 4 recommended movies
   
    const recommendedMovies = movies.slice(0, Math.min(4, movies.length));

    res.status(200).json({ content: recommendedMovies });
  } catch (error) {
    console.error('Recommendation error:', error.message);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
