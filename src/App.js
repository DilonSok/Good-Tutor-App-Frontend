import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css'
import Navbar from './components/navbar.js';
import LoginPage from './components/LoginPage.js';
import SignupTutor from './components/Signup-TutorPage.js';
import SignupStudent from './components/Signup-StudentPage.js';
import Reviews from './components/Reviews.js';
import ConversationPage from './components/ConversationPage.js';
import ProfilePage from './components/ProfilePage.js';
import HomePage from './components/HomePage.js';
import SearchPage from './components/SearchPage.js';
import EditAccount from './components/EditAccount.js';
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
            <Route path="/profile-view" Component={Reviews} />
            <Route path="/home" Component={HomePage} />
            <Route path="/messages" Component={ConversationPage} />
            <Route path="/profile" Component={ProfilePage} />
            <Route path="/search" Component={SearchPage} />
            <Route path="/settings" Component={EditAccount} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
