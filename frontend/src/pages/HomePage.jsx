import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="cover-pg flex flex-col items-center justify-center text-center gap-6 px-4 pt-24 min-h-screen">
        {/* Heading */}
        <h1 className="text-white text-3xl md:text-6xl font-extrabold tracking-wide animate-fade-in">
          Welcome To <span className="text-yellow-400">BeeWatch 🎬</span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-200 text-lg md:text-2xl max-w-xl animate-fade-in-delay">
          Dive into a world of endless movies, shows, and recommendations curated just for you.
        </p>

        {/* Auth Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4 animate-fade-in-delay2">
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

        {/* CTA Button */}
        <button className="mt-6 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md animate-fade-in-delay2">
          Explore Now
        </button>
      </div>
    </>
  )
}

export default HomePage
