import React from 'react'


const SecondHero = ({title, content }) => {
return (
    <header className="relative w-full">
 

       {/* Hero Section */}
      <section className="bg-blue-950 px-6 py-16 md:px-20 text-center itemes-center justify-center md:text-left md:min-h-86">
      
        <div className="max-w-5xl mx-auto items-center justify-between flex flex-col">
      
          <div className="w-full flex items-center justify-center gap-5">
          
        <div className="w-[8rem] h-[8rem]"> <img className="w-ful h-full object-contain" src={''} alt="" /> </div> 
          <div className="flex flex-col items-center justify-center gap-3">  
            
            <h1 className="text-2xl self-center text-center text-white font-bold">{ title || 'DELSU JOURNAL OF PEACE AND SECURITY STUDIES'} </h1>
            <h2 className="text-4xl text-white font-bold "> { content || 'DELJOPSS' }</h2>
          
          </div>
          
         <div className="w-[7rem] h-[7rem]"> <img className="w-ful h-full object-contain"  src={''} alt="" /> </div> </div>


        </div>
      </section>
    </header>
)
};

export default SecondHero;
