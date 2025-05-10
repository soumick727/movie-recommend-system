import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { FaLinkedin, FaGithub } from 'react-icons/fa6'

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
                    Enter your email to start with the sign-up process and get personalized recommendations.
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
  <motion.h2
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-3xl md:text-4xl font-bold text-center mb-10"
  >
    Why Choose <span className="text-yellow-400">BeeWatch</span>?
  </motion.h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    {[
      {
        title: "Tailored Recommendations",
        desc: "We understand your taste and suggest content you’ll actually enjoy.",
      },
      {
        title: "Movies & TV Shows",
        desc: "Discover hidden gems and the hottest trending shows on all platforms.",
      },
      {
        title: "Community Insights",
        desc: "What are others watching? Dive into curated watchlists and ratings.",
      },
    ].map((feature, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        viewport={{ once: true }}
        className="p-6 rounded-xl bg-gray-800/50 shadow-md hover:scale-105 transition-transform"
      >
        <h3 className="text-yellow-400 text-xl font-semibold mb-2">{feature.title}</h3>
        <p>{feature.desc}</p>
      </motion.div>
    ))}
  </div>
</section>


            {/* separator */}
            <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

            {/* Team Section */}
            <section className="bg-gray-900 text-white py-20 px-6">
  <motion.h2
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-4xl md:text-5xl font-extrabold text-center mb-14"
  >
    Meet the <span className="text-yellow-400">BeeWatch</span> Team
  </motion.h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
    {[
      {
        name: "Soumick Roy",
        role: "Backend Developer",
        img: "/team/soumick.png",
        linkedin: "#",
        github: "#",
      },
      {
        name: "Pralay Patra",
        role: "Frontend Developer",
        img: "/team/pralay.jpg",
        linkedin: "#",
        github: "#",
      },
      {
        name: "Oliva Dutta",
        role: "Frontend Developer",
        img: "/team/oliva.jpg",
        linkedin: "#",
        github: "#",
      },
      {
        name: "Dwip Sasmal",
        role: "Backend Developer",
        img: "/team/dwip.png",
        linkedin: "#",
        github: "#",
      },
      {
        name: "Sayan Maji",
        role: "Frontend Developer",
        img: "/team/sayan.jpg",
        linkedin: "#",
        github: "#",
      },
    ].map((member, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-tr from-gray-800 to-gray-700 border border-yellow-400/10 shadow-xl rounded-2xl p-6 w-72 sm:w-80 text-center relative hover:scale-105 transition-transform group"
      >
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <img
            src={member.img}
            alt={member.name}
            className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-md group-hover:shadow-yellow-400 transition"
          />
        </div>
        <div className="mt-16">
          <h4 className="text-xl font-bold text-yellow-400">{member.name}</h4>
          <p className="text-sm text-zinc-300 mb-4">{member.role}</p>
          <div className="flex justify-center gap-4 mt-2">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-white transition text-xl"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-white transition text-xl"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>




            {/* separator */}
            <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

            {/* Trending Now Section */}
            <TrendingCarousel />

            <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />
            {/* User Testimonials */}
            <section className="bg-[#111] text-white py-16 px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                {
                    name: "Aarav S.",
                    review: "BeeWatch completely changed my binge-watching game! I never run out of good shows to watch.",
                    image: "/user.png",
                },
                {
                    name: "Tanya M.",
                    review: "I love how it learns my preferences over time. It feels like Netflix, but smarter!",
                    image: "/user.png",
                },
                {
                    name: "Rahul K.",
                    review: "I found hidden gems I would've never discovered. Highly recommended to all movie lovers.",
                    image: "/user.png",
                },
                ].map((user, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-gray-800 p-6 rounded-xl shadow-md text-center"
                >
                    <img src={user.image} alt={user.name} className="w-20 h-20 mx-auto rounded-full mb-4 object-cover border-2 border-yellow-400" />
                    <p className="italic text-sm text-gray-300 mb-2">“{user.review}”</p>
                    <h4 className="text-yellow-400 font-semibold">{user.name}</h4>
                </motion.div>
                ))}
            </div>
            </section>

            
            {/* FAQ Section */}
            <section className="bg-gray-900 text-white py-16 px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto space-y-6">
                {[
                {
                    q: "Is BeeWatch free to use?",
                    a: "Absolutely! BeeWatch is 100% free and open to everyone who wants smart recommendations.",
                },
                {
                    q: "How do you recommend movies?",
                    a: "We use curated data from TMDB and your preferences to suggest shows you'll likely enjoy.",
                },
                {
                    q: "Can I add movies to a watchlist?",
                    a: "Yes! Sign in to create your personalized watchlist and track what you’ve watched.",
                },
                {
                    q: "Does BeeWatch stream content?",
                    a: "No, BeeWatch helps you discover what to watch, but doesn’t stream directly.",
                },
                ].map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-800/50 p-5 rounded-lg shadow"
                >
                    <h3 className="text-yellow-400 text-lg font-semibold mb-2">{item.q}</h3>
                    <p className="text-gray-300">{item.a}</p>
                </motion.div>
                ))}
            </div>
            </section>


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
