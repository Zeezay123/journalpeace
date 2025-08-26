import React, { useState } from 'react';
import logo from '../assets/delsulogo.png';
import { Avatar, Button,Dropdown, Navbar, DropdownHeader, DropdownItem, DropdownDivider} from 'flowbite-react';
import { Link, useLocation  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../Redux/user/slice.js';
import API from '../../api.js';

const HeaderMenu = () => {

  const [moonToggle, setMoonToogle] = useState(false);
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const path = useLocation().pathname;
  const currentUser = useSelector(state => state.user.currentUser);
  

  
  const handleSignout =async()=>{
    try{
      const res = await fetch(`${API}/api/users/signout`, {
        method:'POST',
      })
      
      const data = res.json()
      if(!res.ok){
        console.log(error.message)
      }
     else{
      dispatch(signOutSuccess())
     }
    }catch(error){
      console.log(error.message)
    }
  }
  

  return (
   
      <Navbar className={`bg-transparent  justify-between w-full ${currentUser ?  'block' : 'absolute z-10 top-0' } `}>
        <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
          {/* Logo */}
          <Link  className="flex items-center" to="/">
            <img src={logo} className="h-10 mr-3" alt="Delsu Logo" />
            <span className={`text-xl font-bold  ${currentUser ?'text-gray-600' :'text-white'}` }>Delta State University</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to='/'  className={`font-semibold  ${path == '/' ? 'text-blue-500': currentUser ?'text-gray-600' :'text-white' }`}>Home</Link>
            <Link to='/programmes'  className={`font-semibold  ${path == '/programmes' ? 'text-blue-500': currentUser ?'text-gray-600' :'text-white' }`}>Journals</Link>
            {/* <Link to='/dashboard'  className={`font-semibold  ${path == '/dashboard' ? 'text-blue-500':'text-white text-gray-700' }`}>Dashboard</Link> */}
            <Link to='/about'  className={`font-semibold  ${path == '/about' ? 'text-blue-500':currentUser ?'text-gray-600' :'text-white' }`}>About</Link>
            <Link to='/posts'  className={`font-semibold  ${path == '/posts' ? 'text-blue-500':currentUser ?'text-gray-600' :'text-white'}`}>Blog</Link>
            <Link to='/admision'  className={`font-semibold  ${path == '/admision' ? 'text-blue-500':currentUser ?'text-gray-600' :'text-white' }`}>Admision</Link>
           
          </div>
{/* 
        <Button onClick={()=> dispatch(toggleTheme())}>
          
           <FaMoon />
          </Button>   */}


          {/* Buttons */}

          {currentUser ? (<>
          <Dropdown 
          className='z-50'
            arrowIcon={false}
           inline 
           label={
            <Avatar
            alt='user'
            img={currentUser?.profilePhoto}
            rounded/>
           }
           >
          
          <DropdownHeader>
            <span className='block text-sm font-medium'> @{currentUser?.username || 'User'}</span>
            <span className='block text-sm font-medium truncate'> @{currentUser?.email || 'email'}</span>
          </DropdownHeader>
            <Link to='/dashboard?tab=profile'>
             <DropdownItem>
               Profile
             </DropdownItem>
            </Link> 
            <DropdownDivider/>
              <Link to={'/dashboard?tab=signout '}>
             <DropdownItem onClick={handleSignout}>
               Sign out
             </DropdownItem>
            </Link> 
          </Dropdown>
          
          </>):(

  null
   
          )}
     

          {/* Mobile Toggle Button */}
          <button
            className="lg:hidden text-white focus:outline-none"
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
          <div className="lg:hidden mt-3 space-y-2 p-4  z-10  bg-white w-full">
             <Link to='/'  className={`font-semibold block ${path == '/' ? 'text-blue-500':'text-gray-700' }`}>Home</Link>
            <Link  to='/programmes'  className={`font-semibold block ${path == '/projects' ? 'text-blue-500':'text-gray-700' }`}>Journal Articles</Link>
            {/* <Link to='/dashboard'  className={`font-semibold block ${path == '/dashboard' ? 'text-blue-500':'text-gray-700' }`}>Dashboard</Link> */}
            <Link to='/about'  className={`font-semibold block ${path == '/about' ? 'text-blue-500':'text-gray-700' }`}>About</Link>
            <Link to='/posts'   className={`font-semibold block ${path == '/blog' ? 'text-blue-500':'text-gray-700' }`}>News and Stories</Link>
            
          </div>
        )}
      </Navbar>

  );
};

export default HeaderMenu;
