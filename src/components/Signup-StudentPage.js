import React from 'react';
import '../css/signup.css';
//Rushi Kona

function SignupStudent() {
  return (
    <div className='Signup'>
        <div className='container'>
            <div className="header">
                <div className="text">Sign Up As Student</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="email" placeholder="Enter Email"/>
                </div>
                <div className="input">
                    <input type="password" placeholder="Enter Password"/>
                </div>
                <div className="input">
                    <input type="password" placeholder="Confirm Password"/>
                </div>
                <div className="input">
                    <input type="Student First Name" placeholder="Enter Student First Name"/>
                </div>
                <div className="input">
                    <input type="Student Last Name" placeholder="Enter Student Last Name"/>
                </div>
                <button className="submit-container" >Sign Up</button>
            </div>
        </div>
    </div>
  )
}

export default SignupStudent;