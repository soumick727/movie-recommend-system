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

const languageMap = {
  English: 'en',
  French: 'fr',
  Hindi: 'hi',
  Telugu: 'te',
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

    const releaseYear = answers[1]; 
    const originalLanguage = answers[2]; 
    const languageId = languageMap[originalLanguage] || 'en';

    const url = `https://api.themoviedb.org/3/discover/movie?` +
                `with_genres=${genreIds}&` +
                `primary_release_year=${releaseYear}&` +
                `with_original_language=${languageId}&` +
                `sort_by=popularity.desc&` +
                `language=en-US&` +
                `api_key=${process.env.TMDB_API_KEY}`;

    const data = await fetchFromTMDB(url);

    const movies = data.results;
    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: 'No movies found for the selected genres, release year, and language.' });
    }

    const recommended = movies[Math.floor(Math.random() * movies.length)];

    res.status(200).json({ content: recommended });
  } catch (error) {
    console.error('Recommendation error:', error.message);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
