import React from "react";
import '../css/HomePage.css'; 
import photo from '../images/photo.jpeg';
import logo from '../images/logo.jpg';

function HomePage(){
  return(
    <div>
      <div className="title">
        <h3>Welcome back, User</h3>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <img
          src={logo}
          alt="Image Description"
          style={{ width: '25%', height: '200px'}}
        />
        <img
          src={photo}
          alt="Image Description"
          style={{width: '100%', marginBottom: '0%', marginTop: '5px' }}
        />
      </div>
    </div>
  );
}

export default HomePage;