import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';
import { authenticateUser } from '../scripts/authenticateUser';
//Dilon Sok
//Frontend for Log in page

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate =  useNavigate();

    //test logic for logging in
    const handleSubmit = (e) => {
        e.preventDefault();

        //these calls will be 
        const studentData = JSON.parse(localStorage.getItem('studentUser'));
        const tutorData = JSON.parse(localStorage.getItem('tutorUser'));

        if (authenticateUser(studentData, email, password) || authenticateUser(tutorData, email, password)) {
            localStorage.setItem('isLoggedIn', 'true');
            window.dispatchEvent(new Event('loginStateChange'));
            navigate('/home');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className='LoginPage'>
            <div className='LoginPage-container'>
                <ul>
                    <li><p className='login-title'>Log in</p></li>
                    <form onSubmit={handleSubmit}>
                        <li>
                            <div className='email-input-container'>
                                <p>Email</p>
                                <input type='email' placeholder='Your email' value={email} onChange={(e) => setEmail(e.target.value)}/> {/*email input will be grabbed to be used by Log In button for logging in*/}
                            </div>
                        </li>
                        <li>
                            <div className='password-input-container'>
                                <p>Password</p>
                                <input type='password' placeholder='Your password' value={password} onChange={(e) => setPassword(e.target.value)}/> {/*password input will be grabbed to be used by Log In button for logging in*/}
                            </div>
                        </li>
                        <li>
                            <button>Log in</button>  {/*button input here will eventually connect with backend script to initiate obtaining login/input and authenticate*/}
                        </li>
                        {error && <li className="error-message">{error}</li>}
                    </form>
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
