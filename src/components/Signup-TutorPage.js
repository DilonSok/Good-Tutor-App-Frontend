import React from 'react';
import '../css/signup.css';
//Rushi Kona 

function SignupTutor() {
  return (
    <div className='Signup'>
        <div className='container'>
            <div className="header">
                <div className="text">Sign Up As Tutor</div>
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
                    <input type="Tutor First Name" placeholder="Enter First Name"/>
                </div>
                <div className="input">
                    <input type="Tutor Last Name" placeholder="Enter Last Name"/>
                </div>
                <div className="input">
                    <input type="University" placeholder="Enter Current University"/>
                </div>
                <button className="submit-container" >Sign Up</button>
            </div>
        </div>
    </div>
  )
}

export default SignupTutor;
