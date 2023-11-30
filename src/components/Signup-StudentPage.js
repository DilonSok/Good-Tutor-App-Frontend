import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { validatePassword } from '../scripts/validatePassword';
import '../css/signup.css';
//Rushi Kona

function SignupStudent() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            default:
                break;
        }
    };

    const handlePasswordBlur = () => {
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and contain at least one symbol.');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (!validatePassword(password)) {
            alert('Password does not meet criteria');
            return;
        }

        const userData = {
            username,
            email,
            password,
            firstName,
            lastName
        };

        try {
            const response = await Axios.post('http://localhost:3500/users', userData);
            console.log('API response:', response);
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    return (
        <div className='Signup'>
            <div className='container'>
                <div className="header">
                    <div className="text">Sign Up As Student</div>
                    {/*add css to make this look pretty*/}
                    {passwordError && <p className='error-message'>{passwordError}</p>}
                </div>
                <form className="inputs" onSubmit={handleSubmit}> {/*All inputs here will be saved to be used by Submit button for creating account */}
                    <div className="input">
                        <input type="text" placeholder="Username" name="username" value={username} onChange={handleInputChange} />
                    </div>
                    <div className="input">
                        <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={handlePasswordBlur}
                        />
                    </div>
                    <div className="input">
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="input">
                        <input type="Student First Name" placeholder="Enter Student First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="input">
                        <input type="Student Last Name" placeholder="Enter Student Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    {/*submit button will eventually connect with backend script and use previous inputs to create an account */}
                    <button className="submit-container" type='submit'>Sign Up</button>
                </form>
                {/*routing to different sign up or back to logging in*/}
                <div>Already have an account or want to sign up as a tutor?</div>
                <p className='signup-links'>
                    <Link to="/">Log in</Link>
                    {' or '}
                    <Link to="/signup-tutor">sign up as a tutor</Link>
                </p>
            </div>
        </div>
    )
}

export default SignupStudent;