import React, { useState, useEffect } from "react";
import API from "../../api";

const Vcaddress = () => {
  const [vcToggle, setVcToggle] = useState(true);




  // Staff data fetched from backend
  const [staffData, setStaffData] = useState(null);
  const [directorInfo, setDirectoInfo] =useState({})
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [activeRole, setActiveRole] = useState(null); // changed hoveredRole to activeRole

  // Fetch staff data on mount (adjust URL to your API endpoint)
  useEffect(() => {
    fetch(`${API}/api/staff`) // Assuming your backend returns full staff document
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch staff data");
        return res.json();
      })
      .then((data) => {
        setStaffData(data);
        setDirectoInfo(data.director)
  
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoadingStaff(false));
  }, []);

  // Map your roles and UI labels to keys in staff data
 
 console.log(directorInfo)
 
 
  return (

    <section className="bg-gray-50 py-16">
  <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
    <img className="w-full h-64 sm:h-80 md:h-96 lg:h-full object-cover rounded-3xl" src={directorInfo.photo} alt="" />
    <div className="flex justify-center">
      <div className="relative">
       
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        {directorInfo.email}
      </h2>
      <p className="text-gray-600 mb-6 text-justify  leading-relaxed">
        {directorInfo.description}
      </p>
      </div>
    </div>

    {/* Welcome Message */}
    <div>
   
      <div>
        <p className="font-semibold text-lg text-gray-800">{directorInfo.name}</p>
        <p className="text-gray-500 mb-2">{directorInfo.post}</p>
      </div>
    </div>

  </div>
</section>

    // <section className="m-4 sm:m-8 md:m-12 lg:m-20 bg-slate-200 shadow rounded-xl flex flex-col lg:flex-row p-4 
    // sm:p-8 md:p-10 items-center justify-between min-h-[40rem]">
    //   <div className="flex flex-col gap-5 w-full lg:w-1/2">
    //     <div className="flex gap-2 justify-center w-fit items-center">
    //       <div className="relative w-2 h-2">
    //         <div className="absolute inset-0 rounded-full bg-blue-300 opacity-20 blur-2xl animate-ping z-0"></div>
    //         <div className="relative z-10 w-full h-full bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
    //       </div>
    //       <p className="text-[0.625rem] font-medium font-[inter] text-blue-400">Why Delsu Codel</p>
    //     </div>

    //     <div className="w-full sm:w-[30rem] md:w-[38rem] lg:w-[45rem] mb-6 sm:mb-10">
    //       <h1 className="font-[inter] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[48px]/14">
    //         Vice Chancellor's and Director's Address
    //       </h1>
    //     </div>

    //     <div className="flex flex-col gap-5">
    //       <div
    //         className={`border-l-2 pl-3 h-fit w-full flex flex-col cursor-pointer ${
    //           vcToggle ? 'opacity-100 border-blue-700 ' : 'opacity-25 border-gray-800 '
    //         }`}
    //         onClick={() => setVcToggle(true)}
    //       >
    //         <h1 className="font-[inter] font-semibold text-base sm:text-lg md:text-[18px]/6">
    //           Prof. Asaju Abdulazez (Vice Chancellor)
    //         </h1>
    //         <p
    //           className={`w-full sm:w-[22rem] md:w-[28rem] lg:w-[30rem] font-[inter] text-xs sm:text-sm md:text-[14px]/5
    //              font-normal text-slate-700 text-justify ${
    //             vcToggle ? 'line-clamp-5 mt-2' : 'hidden'
    //           }`}
    //         >
    //           Delta State University, Abraka, was established in April 1992 and has emerged as a prominent 
    //           institution both nationally and internationally. The university has achieved the goals, mission, and vision
    //            set by its founders, with alumni excelling on a global scale. Adapting to the changing global landscape,
    //             DELSU has evolved into a dual-mode university, leading to the establishment of the Centre for Open Distance and E-Learning (CODEL)...
    //         </p>
    //       </div>

    //       <div
    //         className={`border-l-2 pl-3 h-fit w-full flex flex-col cursor-pointer ${
    //           !vcToggle ? 'opacity-100 border-blue-700 ' : 'opacity-25 border-gray-800 '
    //         }`}
    //         onClick={() => setVcToggle(false)}
    //       >
    //         <h1 className="font-[inter] font-semibold text-base sm:text-lg md:text-[18px]/6">
    //           Prof. Asaju Abdulazez (Director)
    //         </h1>
    //         <p
    //           className={`w-full sm:w-[22rem] md:w-[28rem] lg:w-[30rem] font-[inter] text-xs sm:text-sm md:text-[14px]/5 font-normal text-slate-700 text-justify ${
    //             !vcToggle ? 'line-clamp-5 mt-2' : 'hidden'
    //           }`}
    //         >
    //           Delta State University, Abraka, was established in April 1992 and has emerged as a prominent institution both nationally and internationally. The university has achieved the goals, mission, and vision set by its founders, with alumni excelling on a global scale. Adapting to the changing global landscape, DELSU has evolved into a dual-mode university, leading to the establishment of the Centre for Open Distance and E-Learning (CODEL)...
    //         </p>
    //       </div>
    //     </div>

    //     <div className="w-fit font-bold mt-5">
    //    <Link to={'/about'}> <Button text="Read More" icon={<FaArrowRight className="text-blue-600" />} />
    //    </Link>   </div>
    //   </div>

    //   <div className="w-full mt-8 lg:mt-0  lg:w-[35%] flex-shrink-0 shadow rounded-3xl flex items-center justify-center">
    //     {vcToggle ? (
    //      
    //     ) : (
    //       <img className="w-full h-64 sm:h-80 md:h-96 lg:h-full object-cover rounded-3xl" src={imagetwo} alt="" />
    //     )}
    //   </div>
    // </section>
  )
}

export default Vcaddress;