import React, { useState } from 'react';
import logo from '../assets/delsulogo.png';
import { Navbar} from 'flowbite-react';
import { Link, useLocation  } from 'react-router-dom';

const HeaderMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const path = useLocation().pathname;
  return (
   
      <Navbar className="bg-white  justify-between w-full">
        <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
          {/* Logo */}
          <Link  className="flex items-center" to="/">
            <img src={logo} className="h-10 mr-3" alt="Delsu Logo" />
            <span className="text-xl font-bold text-gray-800">Delta State University</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to='/'  className={`font-semibold ${path == '/' ? 'text-blue-700':'text-gray-700' }`}>Home</Link>
            <Link to='/projects'  className={`font-semibold ${path == '/projects' ? 'text-blue-700':'text-gray-700' }`}>Projects</Link>
            <Link to='/dashboard'  className={`font-semibold ${path == '/dashboard' ? 'text-blue-700':'text-gray-700' }`}>Dashboard</Link>
            <Link to='/about'  className={`font-semibold ${path == '/about' ? 'text-blue-700':'text-gray-700' }`}>About</Link>
            <Link to='/blog'  className={`font-semibold ${path == '/blog' ? 'text-blue-700':'text-gray-700' }`}>Blog</Link>
          </div>

          {/* Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link to="/signin" className="text-gray-700 hover:underline">Log in</Link>
            <Link to="/signup" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">Admin</Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="lg:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 space-y-2 px-4">
             <Link to='/'  className={`font-semibold block ${path == '/' ? 'text-blue-700':'text-gray-700' }`}>Home</Link>
            <Link to='/projects'  className={`font-semibold block ${path == '/projects' ? 'text-blue-700':'text-gray-700' }`}>Projects</Link>
            <Link to='/dashboard'  className={`font-semibold block ${path == '/dashboard' ? 'text-blue-700':'text-gray-700' }`}>Dashboard</Link>
            <Link to='/about'  className={`font-semibold block ${path == '/about' ? 'text-blue-700':'text-gray-700' }`}>About</Link>
            <Link to='/blog'  className={`font-semibold block ${path == '/blog' ? 'text-blue-700':'text-gray-700' }`}>Blog</Link>
            <div className="pt-3 border-t mt-3">
              <Link to='/login' className="block text-gray-700 mb-2 hover:underline">Log in</Link>
              <Link to='/signup' className="block bg-blue-700 text-white text-center py-2 rounded hover:bg-blue-800 transition">Admin</Link>
            </div>
          </div>
        )}
      </Navbar>

  );
};

export default HeaderMenu;
