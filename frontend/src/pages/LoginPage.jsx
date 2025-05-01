import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthUser } from "../store/authUser";
import "../index.css";

const LoginPage = () => {
  // Define state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login, isSignedIn} = useAuthUser(); // Assuming you have a custom hook for authentication
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the login logic here, e.g., send data to an API
    console.log("Email:", email);
    console.log("Password:", password);
    login({email,password}); // Call the login function (to be implemented)
    // Reset form (optional)
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual + Text */}
      <div className="w-1/2 hidden md:flex flex-col justify-center items-center text-white bg-black bg-opacity-80 relative bg-cover bg-center" style={{ backgroundImage: "url('hero.png')" }}>
        <div className="px-8 text-center z-10">
          <h1 className="text-5xl font-extrabold mb-4">
            <Link to={"/"} className="text-yellow-400">BeeWatch 🎬</Link>
          </h1>
          <h2 className="text-3xl font-semibold mb-3">Say Goodbye to Bad Movie Nights</h2>
          <p className="text-lg leading-relaxed">
            Discover hidden gems, timeless classics, and trending favorites. 
            BeeWatch curates movie and TV show recommendations tailored just for you. 
            Let us take the guesswork out of your next watch!
          </p>
        </div>
        <div className="absolute inset-0 bg-black opacity-60 z-0" />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-20 py-10 bg-white">
        <h1 className="text-3xl font-bold mb-2"> Sign In </h1>
        <p className="text-gray-600 mb-6">Smart, curated suggestions based on your taste. Sign in and find your next favorite film</p>

        <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 py-2 px-4 w-full max-w-md rounded-md mb-4 hover:shadow">
          <img src="/image/google-icon.svg" alt="Google" className="w-6 h-6" />
          <span className="text-base font-medium">Continue with Google</span>
        </button>

        <div className="my-4 text-gray-400 text-sm text-center">or</div>

        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email address</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="enter your email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">We will never share your email.</p>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Create password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">10 characters minimum</p>
            <ul className="text-xs text-gray-500 mt-2 list-disc pl-5 space-y-1">
              <li>Uppercase letter</li>
              <li>Lowercase letter</li>
              <li>Number</li>
              <li>Special character</li>
            </ul>
          </div>

          <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-md font-bold mt-4">
            Sign In
          </button>
        </form>
        <p className="text-sm mt-6">
          Need an account? <Link to="/signup" className="text-blue-600 underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
