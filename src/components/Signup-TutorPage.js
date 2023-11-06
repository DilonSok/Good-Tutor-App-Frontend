import React from 'react';
import '../css/signup.css';
import { Link } from 'react-router-dom';
//Rushi Kona 
//Frontend for Signup (tutor page)


function SignupTutor() {
    return (
        <div className='Signup'>
            <div className='container'>
                <div className="header">
                    <div className="text">Sign Up As Tutor</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs"> {/*All inputs here will be saved to be used by Submit button for creating account */}
                    <div className="input">
                        <input type="email" placeholder="Enter Email" />
                    </div>
                    <div className="input">
                        <input type="password" placeholder="Enter Password" />
                    </div>
                    <div className="input">
                        <input type="password" placeholder="Confirm Password" />
                    </div>
                    <div className="input">
                        <input type="Tutor First Name" placeholder="Enter First Name" />
                    </div>
                    <div className="input">
                        <input type="Tutor Last Name" placeholder="Enter Last Name" />
                    </div>
                    <div className="input">
                        <input type="University" placeholder="Enter Current University" />
                    </div>
                    {/*submit button will eventually connect with backend script and use previous inputs to create an account */}
                    <button className="submit-container" >Sign Up</button> 
                </div>
                {/*routing to different sign up or back to logging in*/}
                <div>Already have an account or want to sign up as a student?</div>
                <p className='signup-links'>
                    <Link to="/">Log in</Link>
                    {' or '}
                    <Link to="/signup-student">sign up as a student</Link>
                </p>
            </div>
        </div>
    )
}

export default SignupTutor;
