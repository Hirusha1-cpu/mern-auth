import React from 'react'
import Header from '../components/Header'
import NavBarz from '../components/NavBarz'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'> 
        <NavBarz />
        <Header/>
      {/* <h1>Home Page</h1> */}
    </div>
  )
}

export default Home
