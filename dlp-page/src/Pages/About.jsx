import React, { useEffect, useState } from "react";
import trialDB from "../../../triadb";

const AboutUs = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // fetch("/api/about-us")
    //   .then(res => res.json())
    //   .then(setData)
    //   .catch(console.error);

    setData(trialDB)
  }, []);

  if (!data) return <p className="text-center mt-20">Loading…</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold">{data.pageTitle}</h1>
        <p className="text-gray-700">{data.intro}</p>
      </section>

      {/* Mission */}
      <section className="md:flex md:items-center md:space-x-8 space-y-4 md:space-y-0">
        {data.mission.imageUrl && (
          <img
            src={data.mission.imageUrl}
            alt="Mission"
            className="md:w-1/3 rounded-lg shadow-lg"
          />
        )}
        <div className="md:w-2/3">
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-700 whitespace-pre-line">{data.mission.text}</p>
        </div>
      </section>

      {/* Objectives & Core Values */}
      <section className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Our Objectives</h3>
          <ul className="list-decimal list-inside space-y-1 text-gray-700">
            {data.objectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Our Core Values</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {data.coreValues.map((val, i) => (
              <li key={i}>{val}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Profiles */}
      <section>
        <h3 className="text-2xl font-semibold mb-6 text-center">Featured Profiles</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.profiles.map((p, i) => (
            <div
              key={i}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold text-lg">{p.name}</h4>
                <p className="text-sm text-gray-500">{p.role}</p>
                <p className="mt-2 text-gray-700">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact/Footer */}
      <section className="bg-gray-100 p-8 rounded-lg text-center space-y-4">
        <p>{data.contact.address}</p>
        <p>{data.contact.phone} | {data.contact.email}</p>
        <div className="flex justify-center space-x-4">
          {data.contact.social.facebook && <a href={data.contact.social.facebook}>FB</a>}
          {data.contact.social.twitter && <a href={data.contact.social.twitter}>TW</a>}
          {data.contact.social.instagram && <a href={data.contact.social.instagram}>IG</a>}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
