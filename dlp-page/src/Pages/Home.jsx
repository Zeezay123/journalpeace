import React from 'react'
import Hero from '../components/Hero'
import Aboutus from '../components/Aboutus' 
import Vcaddress from '../components/Vcaddress'
import Faculty from '../components/Faculty' 
import News from '../components/News'
import Footer from '../components/Footer'

const Home = () => {
  return (
  <div className='flex flex-col p-1'>
      <Hero />
      <Aboutus />
      <Vcaddress />
      <Faculty />
      <News />
      <Footer/>
    </div>
  )
}

export default Home