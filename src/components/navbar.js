import React, { useState, useEffect, useRef } from 'react';
import logo from '../images/logo.jpg';
import Menu from './menu';
import '../css/navbar.css';
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
            <li>Home</li>
            <li>Profile</li>
            <li>Messages</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        </Menu>
      </div>

    </div>
  );
}

export default Navbar;
