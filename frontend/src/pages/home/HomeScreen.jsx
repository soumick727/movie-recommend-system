import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Info, Play } from "lucide-react";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useGetTrendingContent from '../../hooks/useGetTrendingContent';
import useGetGenres from '../../hooks/useGenres';
import NavbarHomeScreen from '../../components/NavbarHomeScreen';
import { LARGE_IMG_BASE_URL,MOVIE_CATEGORIES,TV_CATEGORIES } from '../../utils/constants';
import { FaHeart } from 'react-icons/fa';
import { useContentStore } from '../../store/content';
import MovieSlider from '../../components/MovieSlider';


const HomeScreen = () => {
  const trendingContent = useGetTrendingContent();
  const genreNames = useGetGenres();
  const { contentType } = useContentStore();

  const contents = trendingContent?.slice(0, 6) || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const featureContent = contents[currentIndex] || null;

  const matchedGenres = featureContent?.genre_ids?.map((id) => {
    const match = genreNames.find((g) => g.id === id);
    return match?.name;
  }).filter(Boolean);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % contents.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [contents.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contents.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + contents.length) % contents.length);
  };

  return (
    <>
      <NavbarHomeScreen />
      <div className="relative w-full h-screen text-white overflow-hidden max-h-screen">

            {/* Background Image */}
            <AnimatePresence mode="wait">
              {featureContent ? (
                <motion.img
                  key={featureContent?.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  src={`${LARGE_IMG_BASE_URL}${featureContent.backdrop_path || featureContent.poster_path}`}
                  alt={featureContent.title || featureContent.name}
                  className="absolute inset-0 w-full h-full object-cover object-top brightness-[0.6]"
                />
              ) : (
                <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 w-full h-full bg-black/80 flex items-center justify-center text-gray-300 text-lg"
                  >
                    <motion.span
                      className="flex items-center space-x-1 text-xl font-semibold"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span>Loading</span>
                      <motion.span
                        className="inline-block"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatType: "loop" }}
                      >
                        .
                      </motion.span>
                      <motion.span
                        className="inline-block"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.3, ease: "easeInOut", repeatType: "loop" }}
                      >
                        .
                      </motion.span>
                      <motion.span
                        className="inline-block"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.6, ease: "easeInOut", repeatType: "loop" }}
                      >
                        .
                      </motion.span>
                    </motion.span>
                  </motion.div>

              )}
            </AnimatePresence>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 sm:left-4 z-20 bg-black/50 hover:bg-black/70 p-2 rounded-full"
            >
              <ChevronLeft className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-2 sm:right-4 z-20 bg-black/50 hover:bg-black/70 p-2 rounded-full"
            >
              <ChevronRight className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Feature Card */}
            <div className="absolute bottom-4 sm:bottom-10 left-3 right-3 sm:left-10 sm:max-w-xl z-10">
              <AnimatePresence mode="wait">
                {featureContent && (
                  <motion.div
                    key={`card-${featureContent.id}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-black/40 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-xl space-y-3 sm:space-y-4"
                  >
                    <div className="absolute -inset-1 rounded-xl bg-black/30 blur-md z-[-1]" />

                    <p className="text-yellow-400 text-xs sm:text-sm font-semibold">✨ Trending Now</p>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-yellow-300 drop-shadow">
                      {featureContent?.title || featureContent?.name}
                    </h1>

                    <p className="text-xs sm:text-sm text-gray-300">
                      {featureContent?.release_date || featureContent?.first_air_date} &nbsp;|&nbsp;
                      <span className="bg-gray-700 px-1.5 py-0.5 rounded text-[10px] sm:text-xs">U/A 16+</span>
                      &nbsp;|&nbsp; {featureContent?.original_language?.toUpperCase()}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed line-clamp-4 sm:line-clamp-3">
                      {featureContent?.overview}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {matchedGenres?.map((genre) => (
                        <span
                          key={genre}
                          className="bg-white text-black text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full shadow"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1 sm:pt-2">
                      <Link
                        to={`/watch/${featureContent?.id}`}
                        className="flex items-center gap-2 bg-white hover:bg-white/90 text-black font-bold py-1.5 px-3 sm:py-2 sm:px-4 rounded text-sm transition"
                      >
                        <Play className="w-4 h-4 sm:w-5 sm:h-5" /> Play
                      </Link>

                      <Link
                        to={`/watch/${featureContent?.id}`}
                        className="flex items-center gap-2 bg-gray-500/70 hover:bg-gray-600 text-white py-1.5 px-3 sm:py-2 sm:px-4 rounded text-sm transition"
                      >
                        <Info className="w-4 h-4 sm:w-5 sm:h-5" /> More Info
                      </Link>

                      <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm font-semibold transition">
                        <FaHeart className="text-red-400" /> Wishlist
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
      </div>
      <div className="flex flex-col gap-10 bg-black py-10">
        {
          contentType === "movie" ? (
            MOVIE_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
          ) : (
            TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
          )


        }
      </div>
    
    </>
  );
};

export default HomeScreen;

