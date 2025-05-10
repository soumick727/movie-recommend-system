import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import NavbarHomeScreen from '../components/NavbarHomeScreen'
import { LARGE_IMG_BASE_URL } from '../utils/constants'
import toast from 'react-hot-toast'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const HorizontalScroll = ({ children }) => {
  const scrollContainer = useRef(null)

  const scroll = (direction) => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className='relative'>
      <button onClick={() => scroll('left')} className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-70 p-2 rounded-full hover:bg-opacity-90'>
        <ChevronLeft className='text-white' />
      </button>
      <div
        ref={scrollContainer}
        className='flex gap-4 overflow-x-auto scrollbar-hide py-4 px-8'
      >
        {children}
      </div>
      <button onClick={() => scroll('right')} className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-70 p-2 rounded-full hover:bg-opacity-90'>
        <ChevronRight className='text-white' />
      </button>
    </div>
  )
}

// Reusable horizontal scroller for media credits
const MediaScroller = ({ items = [], keyPrefix = '' }) => {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollAmount = dir === 'left' ? -clientWidth : clientWidth
      scrollRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className='relative group'>
      <button
        onClick={() => scroll('left')}
        className='absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black text-white rounded-full hidden group-hover:flex'
      >
        ‹
      </button>

      <div
        ref={scrollRef}
        className='flex gap-4 overflow-x-auto scrollbar-hide py-4 scroll-smooth'
      >
        {items.map((item, idx) => (
          <Link
            to={`/watch/${item.id}`}
            key={`${keyPrefix}-${item.id}-${idx}`}
            className='min-w-[150px] max-w-[150px] hover:scale-105 transition-transform duration-300 cursor-pointer'
          >
            <img
              src={
                item.poster_path
                  ? `${LARGE_IMG_BASE_URL}${item.poster_path}`
                  : 'https://via.placeholder.com/150x225?text=No+Image'
              }
              alt={item.title || item.name}
              className='rounded-lg shadow-md'
            />
            <p className='text-sm mt-2 text-center text-gray-300'>
              {item.title || item.name}
            </p>
          </Link>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className='absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black text-white rounded-full hidden group-hover:flex'
      >
        ›
      </button>
    </div>
  )
}

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
          axios.get(`/api/v1/person/${id}/combined-credits`),
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

  return (
    <div className='bg-gradient-to-b from-zinc-900 to-black text-white min-h-screen'>
      <NavbarHomeScreen />

      {/* Header Section */}
      <div className='bg-gradient-to-br from-neutral-900 to-black text-white py-10 px-4'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10'>
          <div className='w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-yellow-400 shadow-xl'>
            <img
              src={
                person.profile_path
                  ? LARGE_IMG_BASE_URL + person.profile_path
                  : 'https://via.placeholder.com/300x300?text=No+Image'
              }
              alt={person.name}
              className='w-full h-full object-cover'
            />
          </div>

          <div className='flex-1 space-y-4 text-center md:text-left'>
            <h1 className='text-4xl font-bold'>{person.name}</h1>
            <p className='text-gray-400 text-lg'>
              {person.known_for_department} &bull; Born {person.birthday || 'N/A'}{' '}
              {person.birthday && (
                <span className='text-sm text-gray-500'>
                  ({new Date().getFullYear() - new Date(person.birthday).getFullYear()} years)
                </span>
              )}
            </p>
            {person.imdb_id && (
              <a
                href={`https://www.imdb.com/name/${person.imdb_id}`}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block mt-2 px-4 py-2 bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition'
              >
                View on IMDb
              </a>
            )}
            {person.biography && (
              <p className='text-gray-200 text-sm max-w-2xl'>
                {person.biography.length > 250
                  ? person.biography.slice(0, 250) + '...'
                  : person.biography}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Sections */}
      {personCombinedCredits.length > 0 && (
        <div className='px-4 container mx-auto mt-8'>
          <h2 className='text-3xl font-bold text-yellow-400 mb-4'>Known For</h2>
          <MediaScroller items={personCombinedCredits.slice(0, 15)} keyPrefix='combined' />
        </div>
      )}

      {personMovie.length > 0 && (
        <div className='px-4 container mx-auto mt-10'>
          <h2 className='text-2xl font-bold mb-3'>Movie Credits</h2>
          <MediaScroller items={personMovie} keyPrefix='movie' />
        </div>
      )}

      {personTV.length > 0 && (
        <div className='px-4 container mx-auto mt-10'>
          <h2 className='text-2xl font-bold mb-3'>TV Show Credits</h2>
          <MediaScroller items={personTV} keyPrefix='tv' />
        </div>
      )}

      {personImages.length > 0 && (
        <div className='px-4 container mx-auto mt-10 pb-10'>
          <h2 className='text-2xl font-bold mb-3'>Image Gallery</h2>
          <HorizontalScroll>
            {personImages.slice(0, 15).map((img, index) => (
              <img
                key={index}
                src={LARGE_IMG_BASE_URL + img.file_path}
                alt={`portrait-${index}`}
                className='w-[150px] rounded-lg object-cover shadow-md hover:scale-105 transition-transform duration-300'
              />
            ))}
          </HorizontalScroll>
        </div>
      )}
    </div>
  )
}

export default PersonPage
