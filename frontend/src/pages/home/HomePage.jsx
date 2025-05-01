import React from 'react'
import { Link } from 'react-router-dom'

import HomeScreen from './HomeScreen'
import AuthScreen from './AuthScreen'
import { useAuthUser } from '../../store/authUser' // Import your authentication hook or context


const HomePage = () => {

  const  {user}  = useAuthUser(); // Replace with actual user authentication logic
  return (
    <>
    {/* Conditional Rendering based on user authentication */}
      {user ? <HomeScreen /> : <AuthScreen />}

      
    </>
  )
}

export default HomePage
