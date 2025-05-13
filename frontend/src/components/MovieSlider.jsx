import { useContentStore } from "../store/content";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const sliderRef = useRef(null);

  const formattedContentType = contentType === "movie" ? "movies" : "tvshows";
  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);

  useEffect(() => {
    const getContent = async () => {
      try {
        const response = await axios.get(`/api/v1/${contentType}/${category}`);
        setContent(response.data.content.results || []);
      } catch (error) {
        console.error("Error fetching content:", error.message);
      }
    };
    getContent();
  }, [category, contentType]);

  const scrollLeft = () => {
    sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth;
  };

  const scrollRight = () => {
    sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
  };

  return (
    <div className="movie-slider text-white px-5 md:px-20 pt-[10rem] pb-6 relative overflow-visible">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white relative inline-block mb-6">
        <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text">
          {formattedCategoryName} {formattedContentType}
        </span>
        <span className="absolute left-0 -bottom-1 h-1 w-full bg-yellow-400 rounded-full animate-pulse"></span>
      </h2>

      <div className="relative overflow-visible">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black p-2 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-2 relative overflow-visible"
        >
          {content.length > 0 ? (
            content.map((item) => (
              <div
                key={item.id}
                className="shrink-0 w-[150px] h-[225px] rounded-xl overflow-hidden"
              >
                <Link to={`/watch/${item.id}`}>
                  <img
                    src={
                      item.poster_path
                        ? `${SMALL_IMG_BASE_URL}${item.poster_path}`
                        : "/placeholder.jpg"
                    }
                    alt={item.title || item.name}
                    className="object-cover w-full h-full rounded-xl"
                  />
                </Link>

              </div>
            ))
          ) : (
            <p className="text-gray-400">No content available.</p>
          )}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black p-2 rounded-full"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default MovieSlider;
