import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.js';
import LoginPage from './components/LoginPage.js';
import './css/App.css'
import SignupTutor from './components/Signup-TutorPage.js';
import SignupStudent from './components/Signup-StudentPage.js';


function App() {
  return (
    <Router>
        <Navbar />
        <div className='main-content'>
          <Routes>
            <Route exact path="/" Component={LoginPage} />
            <Route path="/signup-tutor" Component={SignupTutor} />
            <Route path="/signup-student" Component={SignupStudent} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
