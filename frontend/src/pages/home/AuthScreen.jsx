import { useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, Mail } from 'lucide-react'
import TrendingCarousel from '../../components/TrendingCarousel'

const AuthScreen = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleFormSubmit = (e) => {
        e.preventDefault()
        // Validate email format (basic validation)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address')
            return
        }
        // Perform email validation and submission logic here
        console.log('Email submitted:', email)
        // Redirect to home screen after submission
        navigate('/signup?email=' + email)
        // Reset email input
        setEmail('')
    }

    return (
        <div>
            <Navbar />
            <div className="cover-pg flex flex-col items-center justify-center text-center gap-6 px-4 pt-24 min-h-screen">
                {/* Heading */}
                <h1 className="text-white text-3xl md:text-6xl font-extrabold tracking-wide animate-fade-in">
                    Welcome To <span className="text-yellow-400">BeeWatch 🎬</span>
                </h1>

                {/* Subheading */}
                <p className="text-gray-200 text-lg md:text-2xl max-w-xl animate-fade-in-delay">
                    Discover hidden gems, timeless classics, and trending favorites. BeeWatch curates movie and TV show recommendations tailored just for you. Let us take the guesswork out of your next watch!
                </p>
                <p className="text-gray-200 mb-4">
                    Enter your email to visit your home screen
                </p>

                {/* Email Input Form */}
                <form onSubmit={handleFormSubmit} className="relative flex flex-col items-center gap-4 animate-fade-in-delay2 w-full max-w-md">
                    <div className="relative w-full">
                        <Mail className="absolute top-3 left-3 text-yellow-400 size-6" />
                        <input
                            type="email"
                            className="w-full pl-10 pr-4 py-3 bg-black/40 text-white placeholder-white/70 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md backdrop-blur-sm"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md transform hover:scale-105 flex items-center gap-2"
                    >
                        Continue
                        <ChevronRight className="size-8 md:size-10" />
                    </button>
                </form>

                {/* Auth Buttons */}
                <div className="flex flex-col md:flex-row  gap-4 mt-4 animate-fade-in-delay2">
                    <Link
                        to="/signup"
                        className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md transform hover:scale-105"
                    >
                        Sign Up
                    </Link>
                    <Link
                        to="/login"
                        className="bg-white hover:bg-gray-100 text-black font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md transform hover:scale-105"
                    >
                        Sign In
                    </Link>
                </div>

            </div>

            {/* separator */}
            <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

            {/* Why Choose Us Section */}
            <section className="bg-black/70 text-white py-16 px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Why Choose BeeWatch?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 rounded-xl bg-gray-800/50 shadow-md hover:scale-105 transition">
                        <h3 className="text-yellow-400 text-xl font-semibold mb-2">Tailored Recommendations</h3>
                        <p>We understand your taste and suggest content you’ll actually enjoy.</p>
                    </div>
                    <div className="p-6 rounded-xl bg-gray-800/50 shadow-md hover:scale-105 transition">
                        <h3 className="text-yellow-400 text-xl font-semibold mb-2">Movies & TV Shows</h3>
                        <p>Discover both hidden gems and the hottest trending shows on all platforms.</p>
                    </div>
                    <div className="p-6 rounded-xl bg-gray-800/50 shadow-md hover:scale-105 transition">
                        <h3 className="text-yellow-400 text-xl font-semibold mb-2">Community Insights</h3>
                        <p>What are others watching? Dive into curated watchlists and ratings.</p>
                    </div>
                </div>
            </section>

            {/* separator */}
            <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

            {/* Team Section */}
            <section className="bg-gray-900 text-white py-16 px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Meet the BeeWatch Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
                    {/* Team Member 1 */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <img src="/heroImage.jpg" alt="Soumick Roy" className="w-32 h-32 mx-auto rounded-full mb-4" />
                        <h4 className="text-xl font-semibold text-yellow-400">Soumick Roy</h4>
                        <p className="text-sm text-zinc-400">Backend developer</p>
                    </div>
                    {/* Team Member 2 */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <img src="https://via.placeholder.com/150" alt="John Doe" className="w-32 h-32 mx-auto rounded-full mb-4" />
                        <h4 className="text-xl font-semibold text-yellow-400">John Doe</h4>
                        <p className="text-sm text-zinc-400">Frontend Developer</p>
                    </div>
                    {/* Team Member 3 */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <img src="https://via.placeholder.com/150" alt="Jane Smith" className="w-32 h-32 mx-auto rounded-full mb-4" />
                        <h4 className="text-xl font-semibold text-yellow-400">Jane Smith</h4>
                        <p className="text-sm text-zinc-400">Backend Developer</p>
                    </div>
                    {/* Team Member 4 */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <img src="https://via.placeholder.com/150" alt="Alex Lee" className="w-32 h-32 mx-auto rounded-full mb-4" />
                        <h4 className="text-xl font-semibold text-yellow-400">Alex Lee</h4>
                        <p className="text-sm text-zinc-400">UI/UX Designer</p>
                    </div>
                    {/* Team Member 5 */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <img src="https://via.placeholder.com/150" alt="Sam Taylor" className="w-32 h-32 mx-auto rounded-full mb-4" />
                        <h4 className="text-xl font-semibold text-yellow-400">Sam Taylor</h4>
                        <p className="text-sm text-zinc-400">QA Engineer</p>
                    </div>
                </div>
            </section>

            {/* separator */}
            <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

            {/* Trending Now Section */}
            <TrendingCarousel />

            {/* Call to Action Section */}
            <section className="bg-yellow-400 text-black text-center py-16 px-4">
                <h2 className="text-3xl font-bold mb-4">Ready to Binge Better?</h2>
                <p className="mb-6 text-lg">Sign up now and get personalized movie and TV picks right away.</p>
                <Link to="/signup" className="bg-black text-yellow-400 px-6 py-3 font-semibold rounded-full hover:bg-gray-800 transition">
                    Get Started
                </Link>
            </section>
        </div>
    )
}

export default AuthScreen
