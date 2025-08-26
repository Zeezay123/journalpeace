import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import SecondHero from "../components/SecondHero";
import Announcement from "../components/Announcement";
import logoOne from '../assets/delsulogo.png'
import logoTeo from '../assets/cpcrlogo.png'
import API from "../api";


export default function Admision() {
  // Staff data fetched from backend
  const [staffData, setStaffData] = useState(null);
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
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoadingStaff(false));
  }, []);

  // Map your roles and UI labels to keys in staff data
  const roleKeys = {
    "Vice Chancellor": "vc",
    "Director": "director",
    "Deputy Director": "deputy",
    "Representative of the Bursar": "bursar",
    "Representative of the Registrar": "registrar",
    "Representative of the Library": "library",
    "Deputy Director of ICT": "depIct",
    "Deputy Director (Acad)": "acad",
  };

  // Modal component
  function ProfileModal({ roleKey }) {
    if (!staffData || !staffData[roleKey]) return null;
    const info = staffData[roleKey];
    if (!info.name) return null; // Hide if empty

    return (
      <div
        className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50"
        onMouseLeave={() => setActiveRole(null)} // closes modal on mouse leave
      >
        <div
          className="bg-white rounded-lg shadow-lg max-w-sm p-6 relative"
          onClick={(e) => e.stopPropagation()} // prevent modal close when clicking inside
        >
          <button
            onClick={() => setActiveRole(null)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
            aria-label="Close modal"
          >
            &times;
          </button>

          {info.photo && (
            <img
              src={info.photo}
              alt={info.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
          )}

          <h3 className="text-center text-xl font-semibold mb-1">{info.name}</h3>
          <p className="text-center italic mb-3">{info.post}</p>
          <p className="text-center text-sm mb-2">
            <a href={`mailto:${info.email}`} className="text-blue-600 hover:underline">
              {info.email}
            </a>
          </p>
          <p className="text-sm">{info.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full font-sans bg-gray-50 min-h-screen">
      {/* <SecondHero
        title="Administration & Admission"
        content="Learn more about our administrative structure and admission
          requirements for prospective students."
      /> */}
<section className="bg-blue-950 px-6 py-16 md:px-20 text-center md:text-left">
      
        <div className="max-w-5xl mx-auto items-center justify-between flex flex-col">
      
          <div className="w-full flex items-center justify-center gap-5">
          
        <div className="w-[8rem] h-[8rem]"> <img className="w-ful h-full object-contain" src={logoOne} alt="" /> </div> 
          <div className="flex flex-col items-center justify-center gap-3">  
            
            <h1 className="text-2xl self-center text-center text-white font-bold"> DELSU JOURNAL OF PEACE AND SECURITY STUDIES </h1>
            <h2 className="text-4xl text-white font-bold "> DELJOPSS </h2>
          
          </div>
          
         <div className="w-[7rem] h-[7rem]"> <img className="w-ful h-full object-contain"  src={logoTeo} alt="" /> </div> </div>


          <h1 className="text-3xl  mt-2 md:text-5xl font-bold text-white mb-4">
            Call for Papers
          </h1>
          <p className="text-lg md:text-xl mb-2 text-white">
            DELSU Journal of Peace and Security Studies
          </p>
          <p className="italic text-white mb-4">
            Volume 1, Number 1 – 2025 Edition
          </p>
          <p className="text-sm md:text-base text-white">
            A publication of the Centre for Security, Peace and Conflict Resolution (CSPCR), Delta State University, Abraka, Nigeria.
          </p>
        </div>
      </section>
   

     
      <Announcement/>

      {/* Show modal if activeRole is set */}
      {activeRole && <ProfileModal roleKey={activeRole} />}
    </div>
  );
}
