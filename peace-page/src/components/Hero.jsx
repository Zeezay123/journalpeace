import React, { useEffect,useState } from 'react'
import Button from './Button.jsx'
import { FaArrowRight } from "react-icons/fa6"; 
import { Link } from 'react-router-dom';
import API from '../api.js';

const Hero = () => {
const [data, setData] = useState(null);

useEffect(() => {
  
const fetchdata = async ()=>{
  try {
     
     const res = await fetch(`${API}/api/settings/homepage`)
     const data = await res.json()
     if(res.ok){
 
      setData(data)
      return
     }

     if(!res.ok){
      console.log('cant get response')
     }

  } catch (error) {
    console.log(error.message)
  }
}

fetchdata()
     
}, [])





  return (
    <div className='relative  flex flex-col items-center justify-center  sm:justify-start lg:flex-row bg-cover h-auto lg:h-[46rem] overflow-hidden mb-5' style={{  backgroundImage: `url(${data?.homeimage || ''})`}} >

      <div className='flex flex-col md:mt-2 mt-10 p-6 md:p-12 lg:p-20 justify-center gap-4  lg:w-[60%]'>
       

        <h1 className='font-[inter] font-medium text-white text-center sm:text-left text-4xl md:text-5xl lg:text-[64px]/18 leading-tight'>
        {data?.title || 'loading'}<br />
          <span className='text-white font-bold'>{data?.subtitle || 'loading'}</span>
        </h1>

        <p className='font-[inter] text-base text-center sm:text-left md:text-sm text-slate-300 max-w-xl'>
         {data?.intro || 'loading'}
         </p>

        <div  className='flex justify-center sm:block '>
       <Link to={'/programmes'}>   <Button text='Browse Our Journals' icon={<FaArrowRight className='text-blue-600' />} /></Link>
        </div>

       
      </div>

    
    </div>
  )
}

export default Hero
