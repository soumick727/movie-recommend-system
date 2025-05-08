import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContentStore } from '../store/content'
import { Search } from 'lucide-react'
import NavbarHomeScreen from '../components/NavbarHomeScreen'
import axios from 'axios'
import toast from 'react-hot-toast'
import { LARGE_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants'

const SearchPage = () => {
	const { setContentType } = useContentStore()
	const [searchTerm, setSearchTerm] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [activeTab, setActiveTab] = useState('movie')

	const handleTabClick = (tab) => {
		setActiveTab(tab)
		if (tab !== 'person') setContentType(tab)
		setSearchResults([])
	}

	const handleSearch = async (e) => {
		e.preventDefault()
		if (!searchTerm.trim()) {
			toast.error('Please enter a search term')
			return
		}
		try {
			const response = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`)
			setSearchResults(response.data.content.results || [])
			const count = response.data.content.results.length
			if (count === 0) {
				toast.error(`No results found for "${searchTerm}"`)
			} else {
				toast.success(`Found ${count} results for "${searchTerm}"`)
			}
		} catch (error) {
			if (error.response?.status === 404) {
				toast.error(`No results found for "${searchTerm}"`)
			} else {
				toast.error('An error occurred. Please try again later.')
			}
		}
	}

	return (
		<div className='bg-black min-h-screen text-white'>
			<NavbarHomeScreen />
			<div className='container mx-auto px-4 py-8'>

				{/* Tabs */}
				<div className='flex justify-center gap-4 mb-6'>
					{['movie', 'tv', 'person'].map((tab) => (
						<button
							key={tab}
							className={`py-2 px-6 rounded-full font-medium capitalize transition-all ${
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
				<form onSubmit={handleSearch} className='flex gap-3 max-w-2xl mx-auto mb-10'>
					<input
						type='text'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder={`Search for a ${activeTab}`}
						className='flex-grow px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400'
					/>
					<button
						type='submit'
						className='bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-lg flex items-center gap-2 font-semibold'
					>
						<Search size={20} /> Search
					</button>
				</form>

				{/* Results */}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {searchResults.map((result) => {
                    const imagePath =
                        activeTab === 'person' ? result.profile_path : result.poster_path

                    // Skip rendering if no image is available
                    if (!imagePath) return null

                    const title = result.title || result.name
                    const routePath =
                        activeTab === 'person' ? `/person/${result.id}` : `/watch/${result.id}`

                    return (
                        <div
                            key={result.id}
                            className='bg-gray-900 p-3 rounded-xl shadow-md hover:shadow-yellow-400/30 transition-shadow'
                        >
                            {activeTab === 'person' ? (
                                <div className='flex flex-col items-center'>
                                    <Link to={routePath} >
                                      
                                    <img
                                        src={LARGE_IMG_BASE_URL + imagePath}
                                        alt={title}
                                        className='h-[300px] w-full object-cover rounded-lg'
                                    />
                                    <h3 className='mt-3 text-lg font-semibold text-yellow-400 text-center'>
                                        {title}
                                    </h3>
                                    </Link>
                                </div>
                            ) : (
                                <Link to={routePath} onClick={() => setContentType(activeTab)}>
                                    <img
                                        src={LARGE_IMG_BASE_URL + imagePath}
                                        alt={title}
                                        className='h-[300px] w-full object-cover rounded-lg'
                                    />
                                    <h3 className='mt-3 text-lg font-semibold text-yellow-400'>
                                        {title}
                                    </h3>
                                </Link>
                            )}
                        </div>
                    )
                    })}

				</div>
			</div>
		</div>
	)
}

export default SearchPage
