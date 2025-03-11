import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
// import { get } from 'mongoose'

const Login = () => {
    const navigate = useNavigate()
    const {backendUrl, setIsLoggedin, getUserData} = useContext(AppContext)
    const [state,setState] = useState('Sign Up')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e)=>{
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true
            if (state === 'Sign Up') {

              const {data} =  await axios.post(backendUrl+'/api/auth/register', {name,email,password})
              console.log("data", data);
              
              if (data.success) {
                setIsLoggedin(true)
                getUserData()
                navigate('/')
              }else{
                // alert(data.message)
                toast.error(data.message)
              }

            }else{
                console.log("backendUrl", backendUrl);
                
                const {data} =  await axios.post(`${backendUrl}/api/auth/login`, {email,password})
                console.log("data", data.success);
                
                if (data.success) {
                  setIsLoggedin(true)
                  getUserData()
                  navigate('/')
                }else{
                  // alert(data.message)
                  toast.error(data.message)
                }
  
            }
        } catch (error) {
            console.log(error);
            
            toast.error(error.message)
        }
    }
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-50 to-purple-950'>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="" className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"/>
      <div className='bg-slate-900 p-10 rounded-lg w-full sm:w-96 shadow-lg text-indigo-700 text-sm'> 
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state === "Sign Up" ? "Create Account":"Login "}</h2>

        <p className='text-center text-sm mb-6'>{state === "Sign Up" ? "Create your account":"Login to your account"}</p>
        <form action="" onSubmit={onSubmitHandler}>
            {state === "Sign Up" && (  <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-blue-50'>  
                <img src={assets.person_icon} alt="" />
                <input onChange={e=>setName(e.target.value)} value={name} type="text" placeholder='Full Name' required className='bg-transparent outline-none' />

            </div>)}
          
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-blue-50'>  
                <img src={assets.mail_icon} alt="" />
                <input onChange={e=>setEmail(e.target.value)} value={email} type="email" placeholder='Email Id' required className='bg-transparent outline-none' />

            </div>
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-blue-50'>  
                <img src={assets.lock_icon} alt="" />
                <input onChange={e=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' required className='bg-transparent outline-none' />

            </div>
            <p onClick={()=>navigate('/reset-password')}  className='mb-4 text-indigo-500 cursor-pointer'>Forgot Password?</p>
            <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-700 to-indigo-400 text-white font-medium '>{state}</button>
        </form>
        {state === "Sign Up" ? ( <p onClick={()=>navigate('/login')} className='text-center text-gray-400 text-xs mt-4'>Already have an account?{' '}
            <span onClick={()=>setState('Login')} className='text-blue-400 cursor-pointer underline'>Login here</span>
        </p>):(  <p className='text-center text-gray-400 text-xs mt-4'>Don't have an account?{' '}
            <span onClick={()=>setState('Sign Up')} className='text-blue-400 cursor-pointer underline'>Sign Up</span>
        </p>)}
       
      
      </div>
    </div>
  )
}

export default Login
