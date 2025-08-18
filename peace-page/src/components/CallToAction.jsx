import React from 'react';
import Button from './button';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="bg-blue-900 text-white px-6 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to contribute to global peace and African scholarship?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#" className="bg-white text-blue-900 px-6 py-3 rounded font-semibold hover:bg-gray-100">📤 Submit Your Paper to: cspcr@delsu.edu.ng or delsujpss@gmail.com  </a>
          <a href="mailto:editor@delsupeacejournal.edu.ng" className="bg-white text-blue-900 px-6 py-3 rounded font-semibold hover:bg-gray-100">📧 Contact Editor : editor@delsujpss.org</a>
        </div>
      </section>
  );
};

export default CallToAction;
