import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'; // Import Axios for HTTP requests
import '../css/LoginPage.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to your login endpoint
            // In your login response handling
            const response = await Axios.post('http://localhost:3500/users/login', { username, password });
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userID', response.data.userId); // Storing user ID

            
            // Store the JWT token in localStorage or Context API/Redux
            localStorage.setItem('authToken', response.data.token);

            // Update login state and redirect to home
            localStorage.setItem('isLoggedIn', 'true');
            window.dispatchEvent(new Event('loginStateChange'));
            navigate('/home');
        } catch (err) {
            // Handle errors like invalid credentials
            if (err.response && err.response.status === 401) {
                setError('Invalid username or password');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className='LoginPage'>
            <div className='LoginPage-container'>
                <ul>
                    <li><p className='login-title'>Log in</p></li>
                    <form onSubmit={handleSubmit}>
                        <li>
                            <div className='username-input-container'>
                                <p>Username</p>
                                <input 
                                    type='text' 
                                    placeholder='Your username' 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </li>
                        <li>
                            <div className='password-input-container'>
                                <p>Password</p>
                                <input 
                                    type='password' 
                                    placeholder='Your password' 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </li>
                        <li>
                            <button>Log in</button>
                        </li>
                        {error && <li className="error-message">{error}</li>}
                    </form>
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
