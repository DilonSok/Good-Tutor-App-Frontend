import React, { useState, useEffect, useRef } from 'react';
import logo from '../images/logo.jpg';
import Menu from './menu';
import '../css/navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
//Dilon Sok
//Frontend for navbar component
// **dropdown menu items will be implemented at a later point and currently just proof of concept

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // States for the dropdown menu
  const menuRef = useRef(null);
  const profileIconRef = useRef(null);
  const navigate = useNavigate();

  //Function to logout user
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false'); //set this to false on the way out so state knows youre logged out
    window.dispatchEvent(new Event('loginStateChange')); //ping state change for login (logged out)
    navigate('/');
  };

  // Update login status function
  const updateLoginStatus = () => {
    const loggedInFlag = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInFlag);
  };

  useEffect(() => {
    updateLoginStatus();

    const handleLoginStateChange = () => {
      updateLoginStatus();
    };

    window.addEventListener('loginStateChange', handleLoginStateChange);

    return () => {
      window.removeEventListener('loginStateChange', handleLoginStateChange);
    };
  }, []);


  //Listener for closing the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && profileIconRef.current &&
        !menuRef.current.contains(event.target) &&
        !profileIconRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggles the menu dropdown
  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(prevIsOpen => !prevIsOpen);
  };
  
  return (
    <div className="navbar">
      <div className="navbar-container">
        <ul className='navbar-leftside'>
          <li className="navbar-home">
            <img className='navbar-home-logo' src={logo} alt="Home Logo" />
          </li>
          <li className='find-tutor-button'>
            Find Tutor
          </li>
        </ul>
        <ul className='navbar-rightside'>
          {isLoggedIn ? (
            // If logged in, show profile icon and menu
            <>
              <li className='navbar-profile-logo' onClick={toggleMenu} ref={profileIconRef}>
                <div className='navbar-profile-name'>
                  DS
                </div>
              </li>
              <div ref={menuRef}>
                <Menu isOpen={isOpen}>
                  <ul className='navlinks'>
                    <li><NavLink to='/home'>Home</NavLink></li>
                    <li><NavLink to='/profile'>Profile</NavLink></li>
                    <li><NavLink to='/messages'>Messages</NavLink></li>
                    <li><NavLink to='/settings'>Settings</NavLink></li>
                    <li onClick={handleLogout}>Logout</li>
                  </ul>
                </Menu>
              </div>
            </>
          ) : (
            // If not logged in, show Login and Sign Up buttons
            <>
              <li className='login-button'>
                <NavLink to='/'>Login</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
