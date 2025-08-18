import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";

const DepartmentSection = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchDepartments = async () => {
  //     try {
  //       const res = await fetch("http://localhost:5173/api/departments/getdepart");
  //       if (!res.ok) throw new Error("Failed to fetch departments");
  //       const data = await res.json();

  //       // Only keep first 4
  //       setDepartments(data.slice(0, 4));
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDepartments();
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="text-center py-10">
  //       <p className="text-gray-500">Loading departments...</p>
  //     </div>
  //   );
  // }

  return (
   <section className="bg-white px-6 py-12 md:px-20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Area of Focus</h2>
        <p className="text-gray-600 mt-2">
          Cross-Cutting and Interdisciplinary Themes.
        </p>
      </div>



    
  

     
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Scope & Focus Areas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-700">
            {[
              { title: "Peace Studies", icon: "🕊️", text:'Peace Studies explores the theories and practices of peacebuilding, emphasizing conflict prevention and management as crucial strategies.' },
              { title: "Security Studies", icon: "🛡️", text:'Security Studies addresses both national and international security challenges, including traditional and non-traditional threats. It covers human security, regional dynamics—especially within Africa—and the growing impact of emerging threats such as terrorism, insurgency, cybercrime, and maritime insecurity on global and regional stability.' },
              { title: "Policy & Governance", icon: "🏛️", text:'This area focuses on the critical role of governance in promoting peace and security. It evaluates institutional frameworks used in security management and analyzes how public policies are designed and implemented in response to conflict and insecurity at both national and subnational levels.' },
              { title: "Development & Security Nexus", icon: "🌍", text:'The development-security nexus explores how underdevelopment can contribute to conflict and instability. It highlights the importance of socio-economic development in fostering sustainable peace, showing how progress in areas like education, health, and infrastructure can reduce tensions and promote long-term stability.' },
              { title: "Regional Case Studies", icon: "📌", text:'This section provides in-depth examinations of conflicts and peace initiatives across Africa, with a particular focus on West Africa and the Niger Delta region of Nigeria. It investigates the root causes, dynamics, and outcomes of various peacebuilding efforts within these contexts.' },
              { title: "International Relations", icon: "🌐", text:'International Relations emphasizes the importance of diplomacy and multilateral cooperation in conflict resolution. It explores the role of international organizations such as the United Nations (UN), African Union (AU), and Economic Community of West African States (ECOWAS) in peacekeeping, negotiation, and security enhancement across borders.' },
              { title: "Emerging Issues", icon: "🔥", text:'This area investigates contemporary and evolving challenges affecting peace and security. Topics include the impact of climate change on resource-based conflicts, the perspectives of youth and gender in conflict resolution, and the growing influence of technology and cybersecurity in both fueling and mitigating conflicts.' },
            ].map((area, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="text-2xl mb-2">{area.icon}</div>
                <div className="font-medium">{area.title}</div>
                <div className="font-normal text-sm mt-4 self-center text-center text-wrap text-gray-500">{area.text}</div>
                
              </div>
            ))}
          </div>
        </div>  
        
        <div className="text-center mt-10">
        <a
          href="/programmes"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Journal Requirements
        </a>
      </div>
      </section>
  );
};

export default DepartmentSection;
