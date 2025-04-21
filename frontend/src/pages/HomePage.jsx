import React from 'react'

const HomePage = () => {
  return (
<div className="cover-pg flex flex-col items-center justify-center text-center gap-6 px-4">
  {/* Logo */}
  <img
    src="/icons8-bumblebee-96.png"
    alt="BeeWatch Logo"
    className=" w-40 md:w-32 bg-transparent drop-shadow-2xl animate-bounce"
  />

  {/* Heading */}
  <h1 className="text-white text-3xl md:text-6xl font-extrabold tracking-wide animate-fade-in">
    Welcome To <span className="text-yellow-400">BeeWatch 🎬</span>
  </h1>

  {/* Subheading */}
  <p className="text-gray-200 text-lg md:text-2xl max-w-xl animate-fade-in-delay">
    Dive into a world of endless movies, shows, and recommendations curated just for you.
  </p>

  {/* CTA Button */}
  <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md animate-fade-in-delay2">
    Explore Now
  </button>
</div>

  )
}

export default HomePage
