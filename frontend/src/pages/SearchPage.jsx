import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContentStore } from '../store/content';
import { Search } from 'lucide-react';
import useGetTrendingContent from '../hooks/useGetTrendingContent';
import NavbarHomeScreen from '../components/NavbarHomeScreen';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LARGE_IMG_BASE_URL } from '../utils/constants';

const SearchPage = () => {
  const trendingContent = useGetTrendingContent() || [];
  const { setContentType } = useContentStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('movie');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // if (tab !== 'person') 
    setContentType(tab);
    setSearchResults([]);
    setSearchTerm('');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    try {
      const response = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setSearchResults(response.data.content.results || []);
      const count = response.data.content.results.length;
      if (count === 0) {
        toast.error(`No results found for "${searchTerm}"`);
      } else {
        toast.success(`Found ${count} results for "${searchTerm}"`);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error(`No results found for "${searchTerm}"`);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 7.5) return 'bg-green-600 text-white';
    if (rating >= 5.0) return 'bg-yellow-400 text-black';
    return 'bg-red-500 text-white';
  };

  const renderCard = (item, type) => {
  const imagePath = type === 'person' ? item.profile_path : item.poster_path;
  const title = item.title || item.name;
  const routePath = type === 'person' ? `/person/${item.id}` : `/watch/${item.id}`;
  const rating = item.vote_average;

  return (
    <div
      key={item.id}
      className="relative bg-gray-900 rounded-xl shadow-md hover:shadow-yellow-400/30 transition-shadow overflow-hidden flex flex-col"
    >
      {/* Rating Badge */}
      {typeof rating === 'number' && type !== 'person' && (
        <span
          className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full shadow-md z-10 ${getRatingColor(
            rating
          )}`}
        >
          ⭐ {rating.toFixed(1)}
        </span>
      )}

      {/* Card Link */}
      <Link to={routePath} onClick={() => setContentType(type)} className="flex flex-col h-full">
        {/* Poster Image */}
        <div className="relative h-[300px] w-full overflow-hidden bg-gray-800">
          {imagePath ? (
            <img
              src={LARGE_IMG_BASE_URL + imagePath}
              alt={title}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
              No Image Available
            </div>
          )}
        </div>

        {/* Title */}
        <div className="p-2 sm:p-3 grow flex items-center justify-center">
          <h3 className="text-sm sm:text-base font-semibold text-yellow-400 text-center line-clamp-2">
            {title}
          </h3>
        </div>
      </Link>
    </div>
  );
};


  return (
    <div className="bg-black min-h-screen text-white">
      <NavbarHomeScreen />
      <div className="container mx-auto px-2 sm:px-4 py-6">
        {/* Tabs */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-6 flex-wrap">
          {['movie', 'tv', 'person'].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 sm:px-6 rounded-full font-medium capitalize transition-all text-sm sm:text-base ${
                activeTab === tab
                  ? 'bg-yellow-400 text-black shadow-md'
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab === 'movie' ? 'Movies' : tab === 'tv' ? 'TV Shows' : 'People'}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-10"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search for a ${activeTab}`}
            className="flex-grow px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-semibold text-sm sm:text-base"
          >
            <Search size={18} /> Search
          </button>
        </form>

		{activeTab !== 'person' && (
		<h2 className="text-2xl flex font-bold text-left mb-6">
			{searchResults.length > 0
			? `Search Results for "${searchTerm}"`
			: `Trending ${activeTab} Content`}
		</h2>
		)}

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {(searchResults.length > 0 ? searchResults : trendingContent).map((item) =>
            renderCard(item, activeTab)
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
