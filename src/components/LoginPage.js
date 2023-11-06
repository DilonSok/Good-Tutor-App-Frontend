import React from 'react';
import { Link } from 'react-router-dom';
import '../css/LoginPage.css';
//Dilon Sok
//Frontend for Log in page

function LoginPage() {
    return (
        <div className='LoginPage'>
            <div className='LoginPage-container'>
                <ul>
                    <li><p className='login-title'>Log in</p></li>
                    <li>
                        <div className='email-input-container'>
                            <p>Email</p>
                            <input type='email' placeholder='Your email' /> {/*email input will be grabbed to be used by Log In button for logging in*/}
                        </div>
                    </li>
                    <li>
                        <div className='password-input-container'>
                            <p>Password</p>
                            <input type='password' placeholder='Your password' /> {/*password input will be grabbed to be used by Log In button for logging in*/}
                        </div>
                    </li>
                    <li>
                        <button>Log in</button>  {/*button input here will eventually connect with backend script to initiate obtaining login/input and authenticate*/}
                    </li>
                    <li>
                        <p>Don't have an account yet?</p>
                    </li>
                    <li className='signup-links'> {/*routing to different sign ups*/}
                        <p>
                            <Link to="/signup-tutor">Sign up as a tutor</Link>
                            {' or '}
                            <Link to="/signup-student">sign up as a student</Link>
                        </p>
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default LoginPage;
