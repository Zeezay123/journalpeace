import React from 'react';

const Aboutus = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40 py-12">
      <div className="text-center max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium font-sans leading-tight">
          Expanding Learning Opportunities in Education.
        </h1>
      </div>

      <div className="text-center max-w-4xl">
        <p className="text-base sm:text-lg font-normal font-sans leading-relaxed">
          The Distance Learning Institute (DLI) is the organ of the University that operates and coordinates the Open and Distance Learning programmes.
          It has an enhanced status as that of a faculty in the University. It has its own Management Board and an Academic Board.
          It is empowered to formulate its own policies, employ its own staff and be responsible for academic programmes, examinations,
          supervise its day-to-day affairs and generate funds for its operations.
        </p>
      </div>

      <a
        href="#"
        className="border-b-2 border-blue-800 text-blue-800 font-medium hover:text-blue-600 transition-all duration-300"
      >
        Learn more about Veritas
      </a>
    </div>
  );
};

export default Aboutus;
