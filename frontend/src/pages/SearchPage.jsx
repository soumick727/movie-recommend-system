import {useState} from 'react'
import { Link } from 'react-router-dom'
import { useContentStore } from '../store/content'
import { Search } from 'lucide-react'
import NavbarHomeScreen from '../components/NavbarHomeScreen'
import axios from 'axios'
import toast from 'react-hot-toast'
import { LARGE_IMG_BASE_URL } from '../utils/constants'

const SearchPage = () => {
    const { setContentType } = useContentStore()
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [activeTab, setActiveTab] = useState('movie')
    const handleTabClick = (tab) => {
        setActiveTab(tab)
        tab === 'movies' ? setContentType('movie') : setContentType('tv')
        setSearchResults([]) // Clear search results when switching tabs
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchTerm.trim()) {
            toast.error('Please enter a search term')
            return
        }
        try{
            const response = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`)
            setSearchResults(response.data.content.results || [])
            console.log(response.data.content.results)
            if (response.data.content.results.length === 0) {
                toast.error(`No results found for "${searchTerm}"`)
            } else {
                toast.success(`Found ${response.data.content.results.length} results for "${searchTerm}"`)
            }
        } catch (error) {
            console.error("Error fetching search results:", error)
        }
    }


  return (
   
    <div>
      <NavbarHomeScreen />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
            <button
                className={`px-4 py-2 rounded-lg ${activeTab === 'movies' ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabClick('movies')}
            >
                Movies
            </button>
            <button
                className={`px-4 py-2 rounded-lg ${activeTab === 'tv' ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabClick('tv')}
            >
                TV Shows
            </button>
           
            <button
                className={`px-4 py-2 rounded-lg ${activeTab === 'people' ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabClick('person')}
            >
                People
            </button>
            
        </div>
        <form className='flex gap-2 item-stretch mb-8 max-w-2xl mx-auto' onSubmit={handleSearch}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={"Search for a " + activeTab}
                className="flex-grow px-4 text-white py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg flex items-center gap-2"
            >
                <Search size={18} /> Search
            </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map((item) => (
                <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src={`${LARGE_IMG_BASE_URL}${item.poster_path}`}
                        alt={item.title || item.name}
                        className="w-full h-auto"
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-yellow-400">{item.title || item.name}</h3>
                        <p className="text-gray-300">{item.release_date || item.first_air_date}</p>
                    </div>
                </div>
            ))}
      </div>
    </div>
    </div>
  )
}

export default SearchPage
