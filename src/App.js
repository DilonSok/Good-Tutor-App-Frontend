import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.js';
import LoginPage from './components/LoginPage.js';
import './css/App.css'
import SignupTutor from './components/Signup-TutorPage.js';
import SignupStudent from './components/Signup-StudentPage.js';
import Reviews from './components/Reviews.js';
import HomePage from './components/HomePage.js';
//Eric Medina
//Routing for main application (more will be added as more components are created)

function App() {
  return (
    <Router> {/*Router creates url paths for all pages of the site. */}
        <Navbar />
        <div className='main-content'> {/*Helper div for formatting */}
          <Routes>  {/*Add more paths as more pages are created */}
            <Route exact path="/" Component={LoginPage} />
            <Route path="/signup-tutor" Component={SignupTutor} />
            <Route path="/signup-student" Component={SignupStudent} />
            <Route path="/reviews" Component={Reviews} />
            <Route path="/reviews" Component={Reviews} />
            <Route path="/homepage" Component={HomePage} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
