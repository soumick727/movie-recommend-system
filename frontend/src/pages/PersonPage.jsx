import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import NavbarHomeScreen from '../components/NavbarHomeScreen'
import { LARGE_IMG_BASE_URL } from '../utils/constants'
import toast from 'react-hot-toast'
import { useContentStore } from '../store/content'

const PersonPage = () => {
	const { id } = useParams()
	const [person, setPerson] = useState(null)
	const [personMovie, setPersonMovie] = useState([])
	const [personTV, setPersonTV] = useState([])
	const [personImages, setPersonImages] = useState([])
	const [personCombinedCredits, setPersonCombinedCredits] = useState([])

	useEffect(() => {
		const fetchAll = async () => {
			try {
				const [p, movie, tv, images, combined] = await Promise.all([
					axios.get(`/api/v1/person/${id}`),
					axios.get(`/api/v1/person/${id}/movies`),
					axios.get(`/api/v1/person/${id}/tv`),
					axios.get(`/api/v1/person/${id}/images`),
					axios.get(`/api/v1/person/${id}/combined-credits`)
				])

				setPerson(p.data.content)
				setPersonMovie(movie.data.content.cast || [])
				setPersonTV(tv.data.content.result || [])
				setPersonImages(images.data.content.profiles || [])
				setPersonCombinedCredits(combined.data.content.cast || [])
			} catch (error) {
				toast.error('Failed to fetch person data.')
			}
		}
		fetchAll()
	}, [id])

	if (!person) {
		return (
			<div className='min-h-screen bg-black text-white flex items-center justify-center'>
				Loading...
			</div>
		)
	}

	const renderCredits = (items) => (
		<div className='flex gap-4 overflow-x-auto scrollbar-hide py-4'>
			{items.map((item) => (
				<div key={item.id} className='min-w-[150px] max-w-[150px]'>
					<img
						src={item.poster_path ? `${LARGE_IMG_BASE_URL}${item.poster_path}` : 'https://via.placeholder.com/150x225?text=No+Image'}
						alt={item.title || item.name}
						className='rounded-lg shadow-md hover:scale-105 transition-transform duration-300'
					/>
					<p className='text-sm mt-2 text-center'>{item.title || item.name}</p>
				</div>
			))}
		</div>
	)

	return (
		<div className='bg-black text-white min-h-screen'>
			<NavbarHomeScreen />

			<div className='container mx-auto px-4 py-10 flex flex-col md:flex-row gap-10'>
				{/* Profile Image */}
				<img
					src={person.profile_path ? LARGE_IMG_BASE_URL + person.profile_path : 'https://via.placeholder.com/300x450?text=No+Image'}
					alt={person.name}
					className='w-full md:w-[300px] rounded-xl shadow-2xl object-cover'
				/>

				{/* Info Section */}
				<div className='flex-1 space-y-6'>
					<h1 className='text-4xl font-bold text-yellow-400'>{person.name}</h1>
					<div className='text-gray-300 space-y-2'>
						<p><b>Known For:</b> {person.known_for_department}</p>
						<p><b>Gender:</b> {person.gender === 1 ? 'Female' : 'Male'}</p>
						<p><b>Birthday:</b> {person.birthday || 'N/A'}</p>
						{person.deathday && <p><b>Died:</b> {person.deathday}</p>}
						<p><b>Place of Birth:</b> {person.place_of_birth || 'N/A'}</p>
						{person.popularity && <p><b>Popularity:</b> {Math.round(person.popularity)}</p>}
						{person.imdb_id && (
							<p>
								<b>IMDb:</b>{' '}
								<a
									href={`https://www.imdb.com/name/${person.imdb_id}`}
									target='_blank'
									rel='noopener noreferrer'
									className='text-yellow-400 hover:underline'
								>
									View Profile
								</a>
							</p>
						)}
					</div>

					<div>
						<h2 className='text-2xl font-semibold text-white mt-8 mb-2'>Biography</h2>
						<p className='text-gray-200 leading-relaxed whitespace-pre-line'>
							{person.biography || 'No biography available.'}
						</p>
					</div>
				</div>
			</div>

			{/* Section: Known For (Combined Credits) */}
			{personCombinedCredits.length > 0 && (
				<div className='px-4 container mx-auto'>
					<h2 className='text-3xl font-bold text-yellow-400 mb-4'>Known For</h2>
					{renderCredits(personCombinedCredits.slice(0, 15))}
				</div>
			)}

			{/* Section: Movie Credits */}
			{personMovie.length > 0 && (
				<div className='px-4 container mx-auto mt-10'>
					<h2 className='text-2xl font-bold text-white mb-3'>Movie Credits</h2>
					{renderCredits(personMovie)}
				</div>
			)}

			{/* Section: TV Credits */}
			{personTV.length > 0 && (
				<div className='px-4 container mx-auto mt-10'>
					<h2 className='text-2xl font-bold text-white mb-3'>TV Show Credits</h2>
					{renderCredits(personTV)}
				</div>
			)}

			{/* Section: Image Gallery */}
			{personImages.length > 0 && (
				<div className='px-4 container mx-auto mt-10 pb-10'>
					<h2 className='text-2xl font-bold text-white mb-3'>Image Gallery</h2>
					<div className='flex gap-4 overflow-x-auto scrollbar-hide py-4'>
						{personImages.slice(0, 15).map((img, index) => (
							<img
								key={index}
								src={LARGE_IMG_BASE_URL + img.file_path}
								alt={`portrait-${index}`}
								className='w-[150px] rounded-lg object-cover shadow-md hover:scale-105 transition-transform duration-300'
							/>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default PersonPage
