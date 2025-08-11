import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import SecondHero from "../components/SecondHero";

const Admision = () => {
  return (
    <div className="w-full font-sans bg-gray-50">
      {/* Hero Header
      <section className="bg-blue-900 text-white py-12 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Administration & Admission
        </h1>
        <p className="max-w-2xl mx-auto text-lg">
          Learn more about our administrative structure and admission
          requirements for prospective students.
        </p>
      </section> */}

       <SecondHero
        title="Administration & Admission"
        content='Learn more about our administrative structure and admission
          requirements for prospective students.'
      />

      {/* Administration Section */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
          Administration Structure
        </h2>

        <div className="overflow-x-auto">
          <div className="flex flex-col items-center gap-6">
            {/* Top Level */}
            <div className="bg-blue-200 px-6 py-3 rounded shadow font-bold">
              ADMINISTRATION
            </div>

            {/* Second Level */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-blue-800 text-white px-6 py-3 rounded shadow">
                Vice Chancellor
              </div>
              <div className="bg-blue-100 px-6 py-3 rounded shadow">
                CODEL Governing Board
              </div>
              <div className="bg-blue-600 text-white px-6 py-3 rounded shadow">
                Director
              </div>
            </div>

            {/* Third Level */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {[
                "Deputy Director",
                "Representative of the Bursar",
                "Representative of the Registrar",
                "Representative of the Library",
                "Deputy Director of ICT",
                "Deputy Director (Acad)",
              ].map((role, i) => (
                <div
                  key={i}
                  className="border border-blue-300 px-4 py-2 rounded bg-white shadow-sm"
                >
                  {role}
                </div>
              ))}
            </div>

            {/* Fourth Level */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {[
                "Administrative staff",
                "Programme coordinators",
                "Website/LMS Programmers",
                "Modules, Processing, E-Tutoring, E-Library",
                "Learners support staff",
              ].map((role, i) => (
                <div
                  key={i}
                  className="border border-blue-200 px-4 py-2 rounded bg-gray-50 shadow-sm"
                >
                  {role}
                </div>
              ))}
            </div>

            {/* Fifth Level */}
            <div className="mt-2">
              <div className="border border-blue-200 px-4 py-2 rounded bg-gray-50 shadow-sm">
                Lecturer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Section */}
      <section className="bg-white py-12 px-6">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
          Admission Procedures
        </h2>

        <div className="max-w-3xl mx-auto bg-gray-100 rounded-lg shadow p-6">
          {[
            "Candidates will be considered for selection on the basis of merit.",
            "Admission into the programme can occur in any of the semester (first or second semester) within the University stipulated timeframe.",
            "Candidates must have completed the three-year General Nursing programme in an accredited School of Nursing, and be registered with and currently licensed by the Nursing and Midwifery Council of Nigeria to practice.",
            "Candidates must hold the Senior Secondary School Certificate WAEC, NECO, GCE, NABTEB or its equivalent.",
            "Candidates must possess at least five credit passes in the following subjects: Mathematics, English Language, Biology, Physics and Chemistry.",
            "JAMB/UTME result is not required to be admitted. But students are mandated to regularize their admission on the JAMB portal.",
            "Application forms are available at the University’s website from: www.portal.delsu.edu.ng",
          ].map((point, index) => (
            <div key={index} className="flex gap-3 mb-3">
              <FaCheckCircle className="text-blue-600 mt-1" />
              <p>{point}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-6">
          <a
            href="https://portal.delsu.edu.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-bold transition"
          >
            Apply Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Admision;
