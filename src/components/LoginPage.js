import React from 'react';
import { Link } from 'react-router-dom';
import '../css/LoginPage.css';

function LoginPage() {
    return (
        <div className='LoginPage'>
            <div className='LoginPage-container'>
                <ul>
                    <li><p>Log in</p></li>
                    <li>
                        <div>
                            <p>Email</p>
                            <input type='email' placeholder='Your email' />
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>Password</p>
                            <input type='password' placeholder='Your password' />
                        </div>
                    </li>
                    <li>
                        <button>Log in</button>
                    </li>
                    <li>
                        <p>Don't have an account yet?</p>
                    </li>
                    <li className='signup-links'>
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
