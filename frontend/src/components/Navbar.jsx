import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-transparent text-white px-6 py-4 flex justify-between items-center shadow-md  top-0 left-0 w-full z-50 backdrop-blur-sm">

      {/* Logo / Brand */}
  <Link
  to="/"
  className="flex items-center gap-2 transform hover:scale-105 transition duration-300 ease-in-out"
>
  <img
    src="/bee.png"
    alt="BeeWatch Logo"
    className="h-14 w-auto drop-shadow-[0_0_6px_rgba(255,223,0,0.8)]  transition duration-300"
  />
  <span className="text-3xl font-extrabold text-yellow-400 drop-shadow-sm">BeeWatch</span>
</Link>



      {/* Hamburger - Mobile only */}
      <button className="md:hidden" onClick={toggleMenu}>
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 items-center">
        <Link to="/" className="hover:text-yellow-400 transition duration-200">
          Home
        </Link>
        <Link to="/about" className="hover:text-yellow-400 transition duration-200">
          About Us
        </Link>
        <Link to="/contact" className="hover:text-yellow-400 transition duration-200">
            Contact Us
        </Link>

        
        <Link
          to="/signup"
          className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="border border-yellow-400 text-yellow-400 px-4 py-2 rounded-full font-semibold hover:bg-yellow-400 hover:text-black transition"
        >
          Sign In
        </Link>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black bg-opacity-90 text-white flex flex-col items-center py-4 space-y-4 md:hidden">
          <Link to="/" className="hover:text-yellow-400 transition duration-200" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/about" className="hover:text-yellow-400 transition duration-200">
          About Us
        </Link>
        <Link to="/contact" className="hover:text-yellow-400 transition duration-200">
            Contact Us
        </Link>
          <Link
            to="/signup"
            className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
            onClick={toggleMenu}
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="border border-yellow-400 text-yellow-400 px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 hover:text-black transition"
            onClick={toggleMenu}
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
