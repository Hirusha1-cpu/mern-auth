import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 left-0 bg-white '> 
      <img src={assets.logo} alt="React Logo" className='w-28 sm:w-32' />
      <button onClick={()=>navigate('/login')} className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 hover:bg-gray-600 transition-all '>Login
        <img src={assets.arrow_icon} alt=''/>
      </button>
    </div>
  )
}

export default Navbar
