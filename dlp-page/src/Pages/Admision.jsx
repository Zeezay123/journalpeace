import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import SecondHero from "../components/SecondHero";

export default function Admision() {
  // Staff data fetched from backend
  const [staffData, setStaffData] = useState(null);
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [activeRole, setActiveRole] = useState(null); // changed hoveredRole to activeRole

  // Fetch staff data on mount (adjust URL to your API endpoint)
  useEffect(() => {
    fetch("/api/staff") // Assuming your backend returns full staff document
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
      <SecondHero
        title="Administration & Admission"
        content="Learn more about our administrative structure and admission
          requirements for prospective students."
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
              {[
                "Vice Chancellor",
                "CODEL Governing Board",
                "Director",
              ].map((role, i) => (
                <div
                  key={i}
                  className={`px-6 py-3 rounded shadow cursor-pointer ${
                    role === "Vice Chancellor"
                      ? "bg-blue-800 text-white"
                      : role === "Director"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100"
                  }`}
                  onClick={() => {
                    if (roleKeys[role]) setActiveRole(roleKeys[role]);
                  }}
                >
                  {role}
                </div>
              ))}
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
                  className="border border-blue-300 px-4 py-2 rounded bg-white shadow-sm cursor-pointer"
                  onClick={() => {
                    if (roleKeys[role]) setActiveRole(roleKeys[role]);
                  }}
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

      {/* Show modal if activeRole is set */}
      {activeRole && <ProfileModal roleKey={activeRole} />}
    </div>
  );
}
