import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import axios from 'axios';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w780';

const TrendingCarousel = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % trendingMovies.length);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + trendingMovies.length) % trendingMovies.length);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const res = await axios.get('http://192.168.0.4:5000/api/v1/public/trending');
        const data = res.data.content?.results || [];
        setTrendingMovies(data);
      } catch (err) {
        console.error('❌ Fetch error:', err.message);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (!trendingMovies.length) {
    return (
      <div className="text-white text-center py-16">
        Loading trending movies...
      </div>
    );
  }

  const currentMovie = trendingMovies[current];
  if (!currentMovie) return null;
  const imagePath = currentMovie.backdrop_path || currentMovie.poster_path;

  return (
    <section className="bg-black text-white py-16 px-6">
      <h3 className="text-yellow-400 text-sm uppercase tracking-wider mb-2">
        🔥 Trending Now
      </h3>
      <h2 className="text-3xl md:text-4xl font-bold mb-10">Trending Now</h2>

      <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-lg shadow-xl">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentMovie.id}
            className="flex flex-col md:flex-row w-full h-auto bg-zinc-900 rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
          >
            {/* Movie Poster */}
            <img
              src={
                imagePath
                  ? `${IMAGE_BASE_URL}${imagePath}`
                  : '/fallback.jpg'
              }
              alt={currentMovie.title || currentMovie.name}
              className="w-full md:w-1/2 h-64 md:h-auto object-cover"
            />

            {/* Movie Info */}
            <div className="flex-1 p-6 flex flex-col justify-center bg-gradient-to-tr from-black via-zinc-800 to-zinc-900">
              <h3 className="text-2xl md:text-4xl font-bold mb-4">
                {currentMovie.title || currentMovie.name}
              </h3>
              {currentMovie.overview && (
                <p className="text-sm md:text-base text-gray-300 line-clamp-4">
                  {currentMovie.overview}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
<button
  onClick={prevSlide}
  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition text-white"
>
  <ChevronLeft size={24} />
</button>
<button
  onClick={nextSlide}
  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition text-white"
>
  <ChevronRight size={24} />
</button>

      </div>
    </section>
  );
};

export default TrendingCarousel;
