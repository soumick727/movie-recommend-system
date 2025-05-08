import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContentStore } from '../store/content';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { PlayCircle, Bookmark, Share2, CheckCircle2, Film, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import axios from 'axios';

const WatchPage = () => {
  const { contentType } = useContentStore();
  const castRef = useRef(null);
  const trailerRef = useRef(null);
const [playTrailer, setPlayTrailer] = useState(false);


  const [cast, setCast] = useState([]);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarContent, setSimilarContent] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const { id } = useParams();

useEffect(() => {
  const getTrailers = async () => {
    try {
      const response = await axios.get(`/api/v1/${contentType}/${id}/videos`);
      const allVideos = response.data.content.results || [];
  
      // Prefer 'Trailer' over 'Teaser'
      const mainTrailer = allVideos.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
  
      setTrailers(mainTrailer ? [mainTrailer] : []);
    } catch (error) {
      console.error("Error fetching trailers:", error.message);
      setTrailers([]); // Ensure trailers is reset on error
    } finally {
      setLoading(false);
    }
  };
  getTrailers();
}, [contentType, id]);
  

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(response.data.content || {});
      } catch (error) {
        console.error("Error fetching content details:", error.message);
      }
    };
    fetchDetails();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const response = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(response.data.content.results || []);
      } catch (error) {
        console.error("Error fetching similar content:", error.message);
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/credits`);
        setCast(res.data.content.cast || []);
      } catch (err) {
        console.error("Failed to fetch cast:", err.message);
      }
    };
    fetchCredits();
  }, [contentType, id]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get(`/api/v1/${contentType}/${id}/reviews`);
        setReviews(response.data.content.results || []);
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
      }
    };
    getReviews();
  }, [contentType, id]);
  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const response = await axios.get(`/api/v1/${contentType}/${id}/recommendations`);
        setRecommendations(response.data.content.results || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error.message);
      }
    };
    getRecommendations();
  }, [contentType, id]);

  if (loading || !content) {
    return <div className="text-white text-center py-20">Loading...</div>;
  }

  const {
    title,
    name,
    overview,
    release_date,
    first_air_date,
    genres,
    runtime,
    vote_average,
    backdrop_path,
    poster_path,
  } = content;

  return (
    <section
      className="relative w-full min-h-screen text-white overflow-hidden"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 px-4 sm:px-6 md:px-20 py-10">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <img
            src={poster_path ? `${SMALL_IMG_BASE_URL}${poster_path}` : "/placeholder.jpg"}
            alt={title || name}
            className="w-full max-w-xs md:max-w-sm rounded-xl shadow-2xl mx-auto md:mx-0"
          />

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-1">{title || name}</h1>
            <p className="text-sm text-gray-400 mb-4">
              Directed by <span className="text-white font-semibold">Unknown</span>
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 mb-4">
              <span className="border border-gray-500 px-2 py-0.5 rounded">Not Rated</span>
              <span>{(release_date || first_air_date || "").slice(0, 4)}</span>
              <span>{runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}m` : ""}</span>
              {genres?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {genres.map((g) => (
                    <span
                      key={g.id}
                      className="bg-zinc-800 text-white text-xs px-2 py-1 rounded-full"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-yellow-400 mb-6">
              <div className="flex items-center gap-1">
                <img src="/imdb.png" alt="IMDb" className="w-5 h-5" />
                <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-semibold rounded">{vote_average?.toFixed(1) || "N/A"}</span>
              </div>
              <div className="flex items-center gap-1 text-red-500">
                🍅 <span>100%</span>
              </div>
              <div className="flex items-center gap-1 text-pink-400">
                🍿 <span>80%</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6">
            <button
                  onClick={() => {
                    trailerRef.current?.scrollIntoView({ behavior: "smooth" });
                    setPlayTrailer(true);
                  }}
                  className="flex items-center gap-2 bg-white text-black font-semibold px-5 py-2 rounded-full hover:scale-105 transition"
                >
                  <PlayCircle size={20} />
                  Watch Trailer
                </button>
              <Bookmark className="hover:text-yellow-500 cursor-pointer" />
              <Film className="hover:text-blue-500 cursor-pointer" />
              <CheckCircle2 className="hover:text-green-500 cursor-pointer" />
              <Share2 className="hover:text-pink-500 cursor-pointer" />
            </div>

            <p className="text-gray-300 max-w-2xl">
              {overview?.length > 400 ? overview.slice(0, 400) + "..." : overview}
            </p>
          </div>
        </div>

        {/* Section Divider */}
        <hr className="my-12 border-white/10" />

        {/* Cast Section */}
        {cast.length > 0 && (
          <div className="mt-12 w-full relative">
            <h2 className="text-2xl font-semibold mb-4">Cast</h2>

            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 p-1 md:p-2 rounded-full hover:bg-black transition"
              onClick={() => castRef.current.scrollBy({ left: -200, behavior: "smooth" })}
            >
              <ChevronLeft size={20} className="md:size-5" />
            </button>

            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 p-1 md:p-2 rounded-full hover:bg-black transition"
              onClick={() => castRef.current.scrollBy({ left: 200, behavior: "smooth" })}
            >
              <ChevronRight size={20} className="md:size-5" />
            </button>

            <motion.div
              ref={castRef}
              className="flex overflow-x-auto gap-4 md:gap-6 pb-4 scroll-smooth no-scrollbar px-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {cast.map((actor) => (
                <motion.div
                  key={actor.id}
                  className="flex flex-col items-center min-w-[70px] max-w-[70px] sm:min-w-[90px] sm:max-w-[90px] md:min-w-[100px] md:max-w-[100px]"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link key={actor.id} to={`/person/${actor.id}`}>
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "/default-avatar.png"
                    }
                    alt={actor.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover mb-1 shadow-md"
                  />
                  <p className="text-xs sm:text-sm font-medium text-center truncate w-full">{actor.name}</p>
                  <p className="text-[10px] text-gray-400 text-center truncate w-full">{actor.character}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Section Divider */}
        <hr className="my-12 border-white/10" />

       
        {/* Trailer Section */}
        {trailers.length > 0 && (
            <div className="mt-16" ref={trailerRef}>
              <h2 className="text-3xl font-bold mb-6 text-white">🎬 Watch Trailer</h2>

              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm bg-white/5">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailers[0]?.key}`}
                  width="100%"
                  height="100%"
                  controls
                  playing={playTrailer}
                  className="absolute top-0 left-0"
                />
              </div>
            </div>
          )}

        {/* Section Divider */}
      <hr className="my-12 border-white/10" />

            {/* Reviews Section */}
           {/* Section Divider */}
              <hr className="my-12 border-white/10" />

              {/* Reviews Section */}
              {reviews.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-semibold mb-6 text-white">📝 Audience Reviews</h2>

                  <div className="space-y-6">
                    {reviews.slice(0, 2).map((review) => {
                      const { author, author_details, content, created_at, id } = review;
                      const { avatar_path, rating, username } = author_details;

                      const avatarUrl = avatar_path
                        ? avatar_path.startsWith('/https')
                          ? avatar_path.slice(1)
                          : `https://image.tmdb.org/t/p/w185${avatar_path}`
                        : '/user.png';

                      const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      });

                      return (
                        <div key={id} className="bg-white/5 border border-white/10 p-5 rounded-xl flex gap-4 shadow-md">
                          <img
                            src={avatarUrl}
                            alt={author}
                            className="w-14 h-14 rounded-full object-cover border border-white/20"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="text-white font-medium text-lg">{author}</h3>
                                <p className="text-sm text-gray-400">@{username || "anonymous"}</p>
                              </div>
                              {rating && (
                                <span className="text-yellow-400 font-semibold text-sm">⭐ {rating}/10</span>
                              )}
                            </div>
                            <p className="text-gray-300 mt-2 text-sm">
                              {content.length > 300 ? content.slice(0, 300) + "..." : content}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Posted on {formattedDate}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}



            {similarContent.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-6 text-white">Similar {contentType === "movie" ? "Movies" : "TV Shows"}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {similarContent.slice(0, 8).map((item) => 
                  {
                    if(item.poster_path === null) return null; // Skip if no poster path
                    return (
                      <div key={item.id} className="relative group bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <Link key={item.id} to={`/watch/${item.id}`}>
                        <img
                          src={`${SMALL_IMG_BASE_URL}${item.poster_path}`}
                          alt={item.title || item.name}
                          className="w-full h-auto object-cover rounded-xl"
                        />
                        </Link>
                        <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                          <h3 className="text-white font-semibold text-sm truncate">{item.title || item.name}</h3>
                          <div className="flex justify-between items-center text-xs text-gray-300 mt-1">
                            <span>{(item.release_date || item.first_air_date || '').slice(0, 4)}</span>
                            <span className="bg-yellow-500 text-black px-1.5 py-0.5 rounded-full font-bold">{item.vote_average?.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  
                  )}
                </div>
              </div>
            )}

            {recommendations.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-6 text-white">Recommended {contentType === "movie" ? "Movies" : "TV Shows"}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {recommendations.slice(0, 10).map((item) => (
                    <div key={item.id} className="relative group bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <Link key={item.id} to={`/watch/${item.id}`}>
                      <img
                        src={`${SMALL_IMG_BASE_URL}${item.poster_path}`}
                        alt={item.title || item.name}
                        className="w-full h-auto object-cover rounded-xl"
                      />
                      </Link>
                      <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <h3 className="text-white font-semibold text-sm truncate">{item.title || item.name}</h3>
                        <div className="flex justify-between items-center text-xs text-gray-300 mt-1">
                          <span>{(item.release_date || item.first_air_date || '').slice(0, 4)}</span>
                          <span className="bg-green-400 text-black px-1.5 py-0.5 rounded-full font-bold">{item.vote_average?.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


      </div>
    </section>
  );
};

export default WatchPage;
