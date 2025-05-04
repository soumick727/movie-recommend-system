import { useContentStore } from "../store/content";
import { useEffect, useState } from "react";
import axios from "axios";

const MovieSlider = ({ category }) => {
    const {contentType} = useContentStore();
    const [content, setContent] = useState(null);

    console.log(category);
    const formattedContentType = contentType === "movie" ? "movies" : "tvshows";
    const formattedCategoryType = category.replaceAll("_"," ").toLowerCase() + category.replaceAll("_", " ").slice(1);
    return (
        <div className="movie-slider text-white">
            <h2>{formattedCategoryType}</h2>
            {/* Add your movie slider implementation here */}
        </div>
    )
}
export default MovieSlider;