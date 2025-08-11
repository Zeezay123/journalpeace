import React, { useEffect } from 'react'
import SecondHero from '../components/SecondHero'
import {useState} from 'react'
import { FaArrowRight, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import DepartData from '../../depart'
import CallToAction from '../components/CallToAction'
import HowToApply from '../components/HowToApply'



const Programmes = () => {
const [toggleCourse, setToggleCurse] = useState(false)
const [noindex, setNoIndex] = useState(null)


const handleToggle = (id)=>{

  setToggleCurse(toggleCourse === id ? false : id)

}


useEffect(()=>{
  const fetchAllData = async()=> {
    try{
      const res = await fetch('/api/course/getcourse')
       const data = await res.json()

      if(res.ok){
         console.log(data)
      }
      if(!res.ok){
        console.log(error.message)
      }
     
    }catch(error){
      console.log(error.message)
    }

  }


  fetchAllData()
},[])
  








  return (
    <main>
          <SecondHero
        title="Our Programmes"
        content="DELSU Codel is kicking off with its BSc Computer Science Programme, licensed and accredited by NUC. The same quality education and degree certificate as being offered by its face-to-face students."
      />

  
      <section className="flex flex-col gap-6 text-center p-5 md:p-20 items-center justify-center mt-30">
        <h1 className="font-bold font-sans text-3xl text-center">
          World-class e-learning degree programmes
        </h1>
        <p className="max-w-5xl text-lg leading-relaxed text-gray-700">
          Through flexible, personalized, collaborative platforms and immersive faculty-led
          course instruction, we make it easy for you to access our online curriculum from
          anywhere in the world and engage with the world-renowned faculty and forward-thinking
          community that make our university a hub for those seeking to advance their careers
          in creative fields.
        </p>
      </section>

    <section className='w-full flex flex-col gap-7 p-5 md:p-20 items-center'>
   <div className='flex justify-center items-center bg-blue-800 w-full rounded-lg shadow-lg'><h1 className='text-lg md:text-3xl text-white font-bold font-sans py-3'>Undergraduate Programmes</h1></div>
    
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full'>

       {
       DepartData.map((data) =>
       (
        <div className='border rounded-lg shadow-sm bg-white overflow-hidden'>
         <div key={data.id} onClick={()=>{handleToggle(data.id)} }  className={`flex items-center justify-between w-full px-4 py-3 font-semibold transition-all duration-300 
              ${toggleCourse === data.id ? 'bg-blue-800 text-white' : 'bg-gray-100 hover:bg-blue-700 hover:text-white'}`}>
          {data.faculty} { toggleCourse === data.id ? <FaChevronUp /> : <FaChevronDown />}
         </div>
         <ul  className={`flex flex-col gap-2 text-left p-4   rounded-b-lg bg-slate-100 ${toggleCourse === data.id ? 'flex absolute md:w-[21%] w-[92%] ' : 'hidden'}`}>
          {data.Departments.map((dept,i)=>(
            <li  className="px-2 py-1 rounded hover:bg-blue-100 cursor-pointer" key={i} >{dept.name}</li>
          ))} 
         </ul>
        </div>
       ))
       
       
       }
     

    </div>
    
    </section>



<HowToApply />
      <CallToAction />


    </main>
  )
}

export default Programmes



  