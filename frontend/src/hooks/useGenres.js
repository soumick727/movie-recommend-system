import { useEffect, useState } from "react";
import axios from "axios";
import { useContentStore } from "../store/content";

const useGetGenres = () => {
    
    const [genres, setGenres] = useState([]);
    const {contentType} = useContentStore();

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(`/api/v1/${contentType}/genres`);
                const data = response.data.content?.genres || [];
                setGenres(data);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchGenres();
    }, [contentType]);

    return genres;
}
export default useGetGenres;