import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import NavbarHomeScreen from '../components/NavbarHomeScreen';

const RecommendationResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movies = location.state?.movie; // Expecting an array of movies

  useEffect(() => {
    if (!movies || movies.length === 0) {
      navigate('/');
    }
  }, [movies, navigate]);

  if (!movies || movies.length === 0) return (
    <>
    <NavbarHomeScreen />
    {/* Fallback UI when no movies are found */}
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white flex items-center justify-center">
      <h1 className="text-3xl font-bold">No recommendations found.</h1>
    </div>
    </>

  );

  return (
    <>
      <NavbarHomeScreen />
      <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-4xl text-amber-300 font-bold mb-8 text-center">
          Here are your recommendations!
        </h1>
        <p className="text-lg text-gray-400 mb-8 text-center">
          Based on your preferences, we think you'll love these movies!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
          {movies.map((movie) => {
            const {
              id,
              title,
              poster_path,
              release_date,
              vote_average,
            } = movie;

            return (
              <div
                key={id}
                className="bg-zinc-800 rounded-2xl shadow-lg overflow-hidden flex flex-col items-center p-4"
              >
                <Link to={`/watch/${id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title}
                    className="rounded-2xl shadow-md hover:scale-105 transition duration-300 mb-4"
                  />
                </Link>
                <h2 className="text-lg font-bold text-center mb-2">{title}</h2>
                <p className="text-gray-400 text-sm text-center mb-2">
                  {release_date} | ⭐ {vote_average}
                </p>
                <p className="text-gray-300 text-sm text-center mb-4">
                  {movie.overview.length > 100
                    ? `${movie.overview.substring(0, 100)}...`
                    : movie.overview}
                </p>
                <Link
                  to={`/watch/${id}`}
                  className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-xl hover:bg-yellow-400 transition"
                >
                  Watch Now
                </Link> 
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RecommendationResult;