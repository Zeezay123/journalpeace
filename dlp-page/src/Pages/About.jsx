import React, { useEffect, useState } from "react";
import trialDB from "../../../triadb";
import imagetwo from '../assets/images/nbunetvc.png'
import { Card } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import SecondHero from '../components/SecondHero.jsx'

const AboutUs = () => {
  const [data, setData] = useState(null);

//   useEffect(() => {
//     // fetch("/api/about-us")
//     //   .then(res => res.json())
//     //   .then(setData)
//     //   .catch(console.error);

//     setData(trialDB)
//   }, []);

//   if (!data) return <p className="text-center mt-20">Loading…</p>;

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
//       {/* Hero */}
//       <section className="text-center space-y-4">
//         <h1 className="text-4xl md:text-5xl font-extrabold">{data.pageTitle}</h1>
//         <p className="text-gray-700">{data.intro}</p>
//       </section>

//       {/* Mission */}
//       <section className="md:flex md:items-center md:space-x-8 space-y-4 md:space-y-0">
//         {data.mission.imageUrl && (
//           <img
//             src={data.mission.imageUrl}
//             alt="Mission"
//             className="md:w-1/3 rounded-lg shadow-lg"
//           />
//         )}
//         <div className="md:w-2/3">
//           <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
//           <p className="text-gray-700 whitespace-pre-line">{data.mission.text}</p>
//         </div>
//       </section>

//       {/* Objectives & Core Values */}
//       <section className="grid md:grid-cols-2 gap-8">
//         <div>
//           <h3 className="text-xl font-semibold mb-2">Our Objectives</h3>
//           <ul className="list-decimal list-inside space-y-1 text-gray-700">
//             {data.objectives.map((obj, i) => (
//               <li key={i}>{obj}</li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold mb-2">Our Core Values</h3>
//           <ul className="list-disc list-inside space-y-1 text-gray-700">
//             {data.coreValues.map((val, i) => (
//               <li key={i}>{val}</li>
//             ))}
//           </ul>
//         </div>
//       </section>

//       {/* Profiles */}
//       <section>
//         <h3 className="text-2xl font-semibold mb-6 text-center">Featured Profiles</h3>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {data.profiles.map((p, i) => (
//             <div
//               key={i}
//               className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
//             >
//               <img
//                 src={p.imageUrl}
//                 alt={p.name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h4 className="font-bold text-lg">{p.name}</h4>
//                 <p className="text-sm text-gray-500">{p.role}</p>
//                 <p className="mt-2 text-gray-700">{p.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Contact/Footer */}
//       <section className="bg-gray-100 p-8 rounded-lg text-center space-y-4">
//         <p>{data.contact.address}</p>
//         <p>{data.contact.phone} | {data.contact.email}</p>
//         <div className="flex justify-center space-x-4">
//           {data.contact.social.facebook && <a href={data.contact.social.facebook}>FB</a>}
//           {data.contact.social.twitter && <a href={data.contact.social.twitter}>TW</a>}
//           {data.contact.social.instagram && <a href={data.contact.social.instagram}>IG</a>}
//         </div>
//       </section>
//     </div>
//   );
// };

return(
  <section className="flex flex-col">

<SecondHero title='About Us' content='The CCODeL mission drives our focus on quality education for all and service to our neighbours in need.' />


   <div className="flex p-5 md:p-20 items-center justify-center mt-30">
   <p className=" max-w-5xl text-wrap text-lg/9 text-justify">
    Delta State University stands as a beacon of knowledge, excellence, and transformation, committed to shaping minds and building futures. Our mission is to promote quality education that goes beyond academic learning, instilling strong character and fostering cultural transformation to meet the dynamic challenges of our time. Through exemplary scholarship and unwavering professionalism, we address local, national, and international issues in key areas, ensuring that our impact resonates far beyond the walls of our institution.

We envision a university that is recognized as a true centre of excellence — a hub where teaching, research, innovation, and community service intersect to create meaningful change. Our commitment to disseminating knowledge empowers individuals, strengthens communities, and drives societal progress. By embracing innovation and fostering collaboration, we prepare our students to become problem-solvers, leaders, and changemakers who contribute to the improvement of the global community.

At Delta State University, education is more than a pursuit of degrees; it is a lifelong journey of discovery, responsibility, and service. Our graduates carry forward not just skills, but values — becoming ambassadors of integrity, professionalism, and cultural pride, ready to influence the world for the better.
   </p>
   </div>

   <div className="flex flex-col-reverse md:flex-row p-5 md:p-30 md:relative">

    <div className="flex flex-col item justify-between p-5 md:p-20 bg-blue-700"> <p className="max-w-[700px] text-white text-justify text-lg font-normal font-sans">
       Delta State University, Abraka, was established in April 1992 and has emerged as a prominent institution both nationally and internationally. The university has achieved the goals, mission, and vision set by its founders, with alumni excelling on a global scale. Adapting to the changing global landscape, DELSU has evolved into a dual-mode university, leading to the establishment of the Centre for Open Distance and E-Learning (CODEL). This transformation aims to offer higher education opportunities to a diverse student body, eliminating geographical barriers, catering to individuals unable to pursue traditional full-time programs, and promoting social inclusivity. 
       DELSU's accredited courses by the National Universities Commission, dedicated staff, quality facilities, conducive environment, and ICT resources make it a preferred choice for students.  
The course materials for CODEL programs are developed by DELSU scholars, meeti3+ng global standards and undergoing stringent quality assurance procedures. These materials are self-explanatory and digestible, easily accessible through our Learning Management System and other virtual platforms. CODEL is proud to position DELSU as a leader in 5th generation education providers and invites all students to embrace this new era of learning. 
      </p>
      <p className="text-white text-justify text-lg font-normal font-sans my-2">Thank you</p>
       <h1 className=" text-white text-justify text-xl font-bold font-sans">Prof. Samuel Ogheneovo Asagba.  </h1>
      <p className="text-white text-justify text-sm font-normal font-sans "> VC Delta State Unversity</p>
       
       </div>




   <div className="md:absolute max-w-[500px] max-h-[800px] md:w-[500px] md:h-[800px] top-10 right-20 flex"><img className="w-full h-full object-cover" src={imagetwo} alt="" /></div>
   </div>

<div className="flex flex-col-reverse md:flex-row p-5 md:p-30 md:relative">

    <div className="flex flex-col item justify-between p-5 md:p-20 bg-slate-100"> <p className="max-w-[700px] text-blue-950 text-justify text-lg font-normal font-sans">
       Welcome to the Centre for Open Distance and E-Learning at Delta State University, Abraka. Our primary objective is to deliver high-quality education that can seamlessly integrate into your lifestyle. Our programmes are tailored to equip you with the knowledge, skills, and competencies essential for success in both your professional and personal endeavours. Whether you are a working professional, job seeker, or seeking to enhance your skills, our open distance and e-learning programmes are designed to cater to your need for flexibility and convenience. We provide a variety of print-based and electronic materials to ensure that our quality education is accessible to students from diverse backgrounds. Join our community of learners and embark on the journey towards achieving your aspirations. Explore our extensive range of 

 programmes, benefit from the expertise of our experienced faculty, and make the most of our advanced online platform.  

I urge all students to be enthusiastic about learning, hardworking, diligent, and exhibit good character at all times. 

  </p>
      <p className="text-blue-900 text-justify text-lg font-normal font-sans my-2">Thank you</p>
       <h1 className=" text-blue-900 text-justify text-xl font-bold font-sans"> 

Prof O. Odedede  </h1>
      <p className="text-blue-900 text-justify text-sm font-normal font-sans ">Director, CODEL </p>

</div>
   <div className="md:absolute max-w-[500px] max-h-[800px] md:w-[500px] md:h-[800px] top-10 right-20 flex"><img className="w-full h-full object-cover" src={imagetwo} alt="" /></div>
   </div>

   <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:p-20 p-5 ">
    <Card className="min-w-[400px] min-h-[250px] ."> <h1 className="text-2xl font-bold text-black
    font-sans">Our Mission</h1>
    <p className="text-sm">
      The mission of Delta State University is to promote quality education, character and cultural transformation,
       to meet the challenges of our time through exemplary scholarship and professionalism for the purpose of addressing local, 
       national and international issues in key areas so as to contribute to the improvement of the global community.
    </p>
    </Card>
 
   <Card className="min-w-[400px] min-h-[250px]"> <h1 className="text-2xl font-bold text-black
    font-sans">Our Vision</h1>
   <p className="text-sm ">
      To become a centre of excellence through Teaching, Scholarship, Research, Innovation, Community Service and Dissemination of knowledge.
    </p>
    </Card>

      <Card className="min-w-[400px] min-h-[250px] "> <h1 className="text-2xl font-bold text-black
    font-sans">Our Philosophy</h1>
   <p className="text-sm">
     The Philosophy of the Codel  Bachelor of Nursing Science (B.N.Sc)
     programmes is to advance the education of nurses for modern-day nursing practice to enabling the graduates to meet health promotion and healthcare needs 
     of individuals across the life span within a family framework. Graduates are motivated
     for self-directed learning and professional growth. They will lead health initiatives and contribute to the development of Nigeria and beyond.
    </p>
    </Card>
   </div>
  <CallToAction/>
  </section>
)


}
export default AboutUs;
