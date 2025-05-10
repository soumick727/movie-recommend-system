import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import NavbarHomeScreen from '../components/NavbarHomeScreen';

const RecommendationResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;

  useEffect(() => {
    if (!movie) {
      navigate('/');
    }
  }, [movie, navigate]);

  if (!movie) return null;

  const {
    title,
    release_date,
    vote_average,
    overview,
    poster_path,
    genres = [],
    runtime,
    status,
    id,
  } = movie;

  return (
    <>
      <NavbarHomeScreen />
      <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white flex items-center justify-center px-4 py-12">
        <div className="max-w-5xl w-full bg-zinc-800 rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-8 p-6 md:p-10">
          {/* Poster */}
          <div className="flex justify-center">
            <Link to={`/watch/${id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
                className="rounded-2xl shadow-md hover:scale-105 transition duration-300"
              />
            </Link>
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              <p className="text-gray-400 text-sm mb-4">
                {release_date} | ⭐ {vote_average} | {runtime ? `${runtime} min` : ''} {status ? `| ${status}` : ''}
              </p>

              {genres?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {genres.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-yellow-600 text-black text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {genre.name || genre}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-gray-300 text-sm leading-relaxed">{overview}</p>
            </div>

            <button
              onClick={() => navigate(`/watch/${id}`)}
              className="mt-6 bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl hover:bg-yellow-400 transition"
            >
              Watch Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendationResult;
