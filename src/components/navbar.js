import React, { useState, useEffect, useRef } from 'react';
import logo from '../images/logo.jpg';
import Menu from './menu';
import '../css/navbar.css';
import { NavLink } from 'react-router-dom';
//Dilon Sok
//Frontend for navbar component
// **dropdown menu items will be implemented at a later point and currently just proof of concept

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const profileIconRef = useRef(null);

  //toggles the menu dropdown
  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  //close the menu when clicking outside of it
  const handleClickOutside = (event) => {
    if (!menuRef.current.contains(event.target) && !profileIconRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    //attach the listener to the document
    document.addEventListener('mousedown', handleClickOutside);
    //clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); 

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
          <li className='navbar-profile-logo' onClick={toggleMenu} ref={profileIconRef}>
            <div className='navbar-profile-name'>
              DS
            </div>
          </li>
        </ul>
      </div>
      <div ref={menuRef}>
        <Menu isOpen={isOpen}>
          <ul>
            <li><NavLink to='/home'>Home</NavLink></li>
            <li><NavLink to='/profile'>Profile</NavLink></li>
            <li><NavLink to='/messages'>Messages</NavLink></li>
            <li><NavLink to='/settings'>Settings</NavLink></li>
            <li><NavLink to='/logout'>Logout</NavLink></li>
          </ul>
        </Menu>
      </div>

    </div>
  );
}

export default Navbar;
