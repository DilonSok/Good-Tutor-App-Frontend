import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'; // Import Axios for HTTP requests
import '../css/LoginPage.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchUserData = async (username) => {
        try {
            const response = await Axios.get(`http://localhost:3500/users/getone`, { 
                params: { username: username } 
            });
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/home');
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('There was an error retrieving your data. Please try again later.');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginResponse = await Axios.post('http://localhost:3500/users/login', { username, password });
            localStorage.setItem('currentUsername', username);
            localStorage.setItem('authToken', loginResponse.data.token);
            localStorage.setItem('userID', loginResponse.data.userId);
            localStorage.setItem('isLoggedIn', 'true');
            window.dispatchEvent(new Event('loginStateChange'));

            // Fetch user data and navigate
            await fetchUserData(username);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Invalid username or password');
            } else {
                setError('An error occurred during login. Please try again later.');
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
