import React, { useState, useEffect } from 'react';
import DepartData from '/depart.js';
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

const Faculty = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedFaculty, setSelectedFaculty] = useState("Faculty of Science");

  const displayFaculties = DepartData.find(
    (facultyObj) => facultyObj.faculty === selectedFaculty
  );

  const departments = displayFaculties ? displayFaculties.Departments : [];

  // Responsive items per page
  const [itemsList, setItemsList] = useState(4);

  useEffect(() => {
    // Adjust items per page based on screen width
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsList(1); // mobile
      else if (window.innerWidth < 1024) setItemsList(2); // tablet
      else if (window.innerWidth < 1280) setItemsList(3); // small desktop
      else setItemsList(4); // large desktop
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = Math.ceil(departments.length / itemsList);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalItems);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalItems) % totalItems);
  };

  const visibleDepartments = departments.slice(
    currentPage * itemsList,
    currentPage * itemsList + itemsList
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedFaculty, itemsList]);

  return (
    <div className="flex flex-col w-full items-center justify-center gap-2 mt-10 mb-5 py-20 bg-[#f6f7f9] min-h-screen">
      <div className="flex items-center justify-center flex-col gap-2 mb-5 px-2 text-center">
        <h1 className="font-bold font-sans text-2xl sm:text-3xl md:text-4xl">
          All the skills you need in one place
        </h1>
        <p className="font-sans text-[14px] text-gray-700">
          From critical skills to technical topics, Delsu supports your professional development.
        </p>
      </div>

      <div className="flex items-center justify-center mt-6 w-full px-2">
        <ul className="flex flex-wrap gap-4 sm:gap-6 md:gap-10 justify-center items-center border-b border-gray-300 w-full">
          {DepartData.map((faculty) => (
            <li
              key={faculty.id}
              onClick={() => setSelectedFaculty(faculty.faculty)}
              className={`${
                selectedFaculty === faculty.faculty
                  ? 'font-bold border-b-2 border-black text-black'
                  : 'text-gray-500'
              } font-sans text-[14px] sm:text-[16px] font-bold cursor-pointer px-2 py-1 transition`}
            >
              {faculty.faculty}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-center overflow-x-auto w-full px-2 sm:px-6 md:px-12 mt-8 relative">
        <div className="flex items-center justify-between w-full absolute z-10 pointer-events-none">
          <button
            className="pointer-events-auto bg-white text-black px-3 py-3 rounded-full hover:bg-gray-400 transition disabled:opacity-50"
            onClick={handlePrev}
            disabled={totalItems <= 1}
            aria-label="Previous"
          >
            <MdArrowBackIos />
          </button>
          <button
            className={`pointer-events-auto bg-white text-black px-3 py-3 rounded-full hover:bg-gray-400 transition disabled:opacity-50 ${
              currentPage >= totalItems - 1 ? 'opacity-0' : ''
            }`}
            onClick={handleNext}
            disabled={totalItems <= 1}
            aria-label="Next"
          >
            <MdArrowForwardIos />
          </button>
        </div>
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-7 w-full pt-16">
          {visibleDepartments.map((faculty, index) => (
            <div
              key={index}
              className="flex flex-col items-start bg-white border border-gray-200 rounded-b-md justify-start gap-3 w-[90vw] sm:w-[45vw] md:w-[30vw] lg:w-[23%] h-[22rem] rounded-t-lg shadow-sm"
            >
              <div className="w-full h-[10rem] sm:h-[12rem] bg-slate-200 rounded-t-lg flex items-center justify-center overflow-hidden">
                <img
                  className="w-full h-full object-cover rounded-t-lg"
                  src={faculty.image}
                  alt={faculty.name}
                />
              </div>
              <div className="flex flex-col items-start justify-start gap-2 px-4">
                <h2 className="text-[15px] sm:text-[16px] font-semibold font-sans line-clamp-1">
                  {faculty.name}
                </h2>
                <p className="font-sans font-normal text-xs text-gray-600">
                  {faculty.description}
                </p>
              </div>
              <div className="px-4 mt-auto mb-4">
                <button className="border-b-2 pb-1 flex items-center gap-1 justify-center border-blue-600 text-blue-600 text-xs font-bold font-sans">
                  Enroll <MdArrowForwardIos className="inline-block text-blue-600"  size={10}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faculty;