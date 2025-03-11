import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Login = () => {
    const [state,setState] = useState('Sign Up')
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-50 to-purple-950'>
      <img src={assets.logo} alt="" className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"/>
      <div className=''>
        <h2>{state === "Sign Up" ? "Create Account":"Login "}</h2>
        <p>{state === "Sign Up" ? "Create your account":"Login to your account"}</p>
        <form action="">
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-blue-50'>  
                <img src={assets.person_icon} alt="" />
                <input type="text" placeholder='Full Name' required className='bg-transparent outline-none' />

            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
