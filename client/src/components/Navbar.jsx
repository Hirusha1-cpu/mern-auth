import React, { use, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
    const navigate = useNavigate()
    const {userData, backendUrl, setUserData, setIsLoggedin} = useContext(AppContext)
    const sendVerificationOtp = async ()=>{
      try {
        axios.defaults.withCredentials = true
        const {data} = await axios.post(backendUrl + 'api/auth/send-verify-otp')
        if(data.success){
          navigate('/email-verify')
          toast.success(data.message)
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
    const logout = async ()=>{
        try {
          console.log("Logout");
          
          axios.defaults.withCredentials = true
          const {data} = await axios.post(`${backendUrl}/api/auth/logout`)
          console.log("Logout1");
          console.log(data);
          if (data.success) {
            data.success && setUserData(false)
            data.success &&  setIsLoggedin(false)
            navigate('/')
          }
          console.log("Logout2");
        } catch (error) {
            toast.error(error.message)            
        }
    }
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 left-0 bg-white '> 
      <img src={assets.logo} alt="React Logo" className='w-28 sm:w-32' />
      {userData ? <div className='w-8 h-8 flex justify-center items-center bg-gray-500 text-white rounded-full relative group'> 
        {userData.name[0].toUpperCase()}
        <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded-lg bg-white p-2 shadow-lg'>
            <ul className='list-none m-0 p-2 bg-gray-100 text-sm '>
                {!userData.isVerified && <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Mail</li>}
                {/* <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li> */}
                <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
            </ul>
        </div>
      </div>:
       <button onClick={()=>navigate('/login')} className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 hover:bg-gray-600 transition-all '>Login
       <img src={assets.arrow_icon} alt=''/>
     </button>}
     
    </div>
  )
}

export default Navbar
