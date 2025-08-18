import React, { useEffect, useState } from "react";

import { Card } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import logoOne from '../assets/delsulogo.png'
import logoTeo from '../assets/cpcrlogo.png'

const AboutUs = () => {
  const [data, setData] = useState(null);

useEffect(() => {
  
const fetchdata = async ()=>{
  try {
     
     const res = await fetch(`/api/focus/homePage`)
     const data = await res.json()
     if(res.ok){
 
      setData(data)
      console.log(data)
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


const title = data?.title || ''




return(
  <section className="flex flex-col">


<section className="bg-blue-950 px-6 py-16 md:px-20 text-center md:text-left">
      
        <div className="max-w-5xl mx-auto items-center justify-between flex flex-col">
      
          <div className="w-full flex items-center justify-center gap-5">
          
        <div className="w-[10rem] h-[10rem]"> <img className="w-ful h-full object-contain" src={logoTeo} alt="" /> </div> 
          <div className="flex flex-col items-center justify-center gap-3">  
            
            <h1 className="text-2xl self-center text-center text-white font-bold"> DELTA STATE UNIVERSITY, ABRAKA.
   CENTRE FOR SECURITY, PEACE AND CONFLICT RESOLUTION  </h1>
            <h2 className="text-4xl text-white font-bold "> (CSPCR) </h2>
          
          </div>
          
         <div className="w-[10rem] h-[10rem]"> <img className="w-ful h-full object-contain"  src={logoOne} alt="" /> </div> </div>

          <p className="text-lg md:text-xl mb-2 text-white">
         <span className="font-bold"> MOTTO: </span>     Fostering Peace, Ensuring Security, Resolving Conflict
          </p>
          <p className="italic text-white mb-4">
         <span className="font-bold">   Email:  </span>  cspcr@delsu.edu.ng        <span className="font-bold">   Website:  </span> https://delsu.edu.ng/cspcr/default 

          </p>
         
        </div>
      </section>



 <div className="max-w-4xl mx-auto  rounded-lg  p-6">
  <div> <h1 className="font-bold font-sans text-3xl text-center my-3">  {data?.title} </h1>    </div>
<div> <h1 className="font-bold font-sans text-xl text-center">  {data?.subtitle} </h1> </div>
         <div class='content' className=" font-normal font-sans text-lg/10" dangerouslySetInnerHTML={{ __html: data?.content }} />
           </div>

   {/* <div className="flex p-5 md:p-20 items-center justify-center mt-30">
   <p className=" max-w-5xl text-wrap text-lg/9 text-justify">
    {data?.intro}  </p>
   </div>

   <div className="flex flex-col-reverse md:flex-row p-5 md:p-30 md:relative">

    <div className="flex flex-col item justify-between p-5 md:p-20 bg-blue-700"> <p className="max-w-[700px] text-white text-justify text-lg font-normal font-sans">
  {data?.vcMessage || 'loading'}  </p>
      <p className="text-white text-justify text-lg font-normal font-sans my-2">Thank you</p>
       <h1 className=" text-white text-justify text-xl font-bold font-sans">Prof. Samuel Ogheneovo Asagba.  </h1>
      <p className="text-white text-justify text-sm font-normal font-sans "> VC Delta State Unversity</p>
       
       </div>




   <div className="md:absolute max-w-[500px] max-h-[800px] md:w-[500px] md:h-[800px] top-10 right-20 flex"><img className="w-full h-full object-cover" src={imagetwo} alt="" /></div>
   </div>

<div className="flex flex-col-reverse md:flex-row p-5 md:p-30 md:relative">

    <div className="flex flex-col item justify-between p-5 md:p-20 bg-slate-100"> <p className="max-w-[700px] text-blue-950 text-justify text-lg font-normal font-sans">
   {data?.directorMessage || 'loading'} </p>
      <p className="text-blue-900 text-justify text-lg font-normal font-sans my-2">Thank you</p>
       <h1 className=" text-blue-900 text-justify text-xl font-bold font-sans"> 

Prof O. Odedede  </h1>
      <p className="text-blue-900 text-justify text-sm font-normal font-sans ">Director, CODEL </p>

</div>
   <div className="md:absolute max-w-[500px] max-h-[800px] md:w-[500px] md:h-[800px] top-10 right-20 flex"><img className="w-full h-full object-cover" src={imagetwo} alt="" /></div>
   </div> */}

   {/* <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:p-20 p-5 ">
    <Card className="min-w-[400px] min-h-[250px] ."> <h1 className="text-2xl font-bold text-black
    font-sans">Our Mission</h1>
    <p className="text-sm">
    {data?.mission || 'loading'}  </p>
    </Card>
 
   <Card className="min-w-[400px] min-h-[250px]"> <h1 className="text-2xl font-bold text-black
    font-sans">Our Vision</h1>
   <p className="text-sm ">
      {data?.vision || 'Loading'}  </p>
    </Card>

      <Card className="min-w-[400px] min-h-[250px] "> <h1 className="text-2xl font-bold text-black
    font-sans">Our Philosophy</h1>
   <p className="text-sm">
    {data?.philosophy || 'Loading'}
   
    </p>
    </Card>
   </div> */}
  <CallToAction/>
  </section>
)


}
export default AboutUs;
