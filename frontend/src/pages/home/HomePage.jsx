import React from 'react'
import { Link } from 'react-router-dom'

import HomeScreen from './HomeScreen'
import AuthScreen from './AuthScreen'

const HomePage = () => {

  const user = false; // Replace with actual user authentication logic
  return (
    <>
    {/* Conditional Rendering based on user authentication */}
      {user ? <HomeScreen /> : <AuthScreen />}
      {/* Navbar */}
      
    </>
  )
}

export default HomePage
