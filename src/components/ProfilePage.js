import React from 'react';
import './css/ProfilePage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function ProfilePage() {
  return (
    
    <div className="profile-container">
      <div className="messages-container">
        <i className="fa-solid fa-comments fa-2x"></i>
          <h3>
            Message
          </h3>
      </div>
      <div className="profile-icon">
        <i className="fa-regular fa-circle-user fa-8x"></i>
      </div>
      <h1> 
        Tutor Name
      </h1>
      <h1>
        Schedule/Booking
      </h1>
    </div>
  );
}

export default ProfilePage;