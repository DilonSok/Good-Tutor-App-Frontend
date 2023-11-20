import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { validatePassword } from '../scripts/validatePassword';
import '../css/signup.css'; // Ensure the path to your CSS file is correct

function SignupTutor() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [classes, setClasses] = useState('');
    const [description, setDescription] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [availability, setAvailability] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false
    });
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
            case 'classes':
                setClasses(value);
                break;
            case 'description':
                setDescription(value);
                break;
            default:
                break;
        }
    };

    const handleAvailabilityChange = (e) => {
        setAvailability({
            ...availability,
            [e.target.name]: e.target.checked
        });
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
            alert('Password does not meet criteria, the password must be at least 8 characters long and contain at least one symbol.');
            return;
        }

        const selectedAvailability = Object.keys(availability).filter(day => availability[day]);
        const classesArray = classes.split(',').map(item => item.trim());
        const userData = { 
            username, 
            email, 
            password, 
            firstName, 
            lastName, 
            classes: classesArray, 
            description, 
            availability: selectedAvailability 
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
                    <div className="text">Sign Up As Tutor</div>
                    {passwordError && <p className='error-message'>{passwordError}</p>}
                </div>
                <form className="inputs" onSubmit={handleSubmit}>
                    <div className="input">
                        <input type="text" placeholder="Username" name="username" value={username} onChange={handleInputChange} />
                    </div>
                    <div className="input">
                        <input type="email" placeholder="Enter Email" name="email" value={email} onChange={handleInputChange} />
                    </div>
                    <div className="input">
                        <input type="password" placeholder="Enter Password" name="password" value={password} onChange={handleInputChange} onBlur={handlePasswordBlur} />
                    </div>
                    <div className="input">
                        <input type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={handleInputChange} />
                    </div>
                    <div className="input">
                        <input type="text" placeholder="First Name" name="firstName" value={firstName} onChange={handleInputChange} />
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={handleInputChange} />
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Classes (comma-separated)" name="classes" value={classes} onChange={handleInputChange} />
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Description" name="description" value={description} onChange={handleInputChange} />
                    </div>
                    <div className="availability">
                        <p>Select Available Days:</p>
                        {Object.keys(availability).map(day => (
                            <div key={day}>
                                <input 
                                    type="checkbox" 
                                    id={day} 
                                    name={day} 
                                    checked={availability[day]} 
                                    onChange={handleAvailabilityChange} 
                                />
                                <label htmlFor={day}>{day}</label>
                            </div>
                        ))}
                    </div>
                    <button className="submit-container" type='submit'>Sign Up</button>
                </form>
                <div>Already have an account or want to sign up as a student?</div>
                <p className='signup-links'>
                    <Link to="/">Log in</Link>
                    {' or '}
                    <Link to="/signup-student">Sign up as a student</Link>
                </p>
            </div>
        </div>
    );
}

export default SignupTutor;
