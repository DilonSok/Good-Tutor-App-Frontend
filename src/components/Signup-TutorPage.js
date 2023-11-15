import React, {useState} from 'react';
import '../css/signup.css';
import { Link } from 'react-router-dom';
import { validatePassword } from '../scripts/validatePassword';
//Rushi Kona 
//Frontend for Signup (tutor page)


function SignupTutor() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [tutorFirstName, setTutorFirstName] = useState('');
    const [tutorLastName, setTutorLastName] = useState('');
    const [university, setUniversity] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handlePasswordBlur = () => {
        if(!validatePassword(password)){
            setPasswordError('Password must be at least 8 characters long and contain at least one symbol.');
        }
        else{
            setPasswordError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            alert('Passwords do not match');
            return;
        }

        if(!validatePassword(password)){
            alert('Password does not meet criteria');
            return;
        }

        //if it reaches this stage, it will send this data to the database
        //currently uses localstorage to test
        const userData = {email, password, tutorFirstName, tutorLastName, university};
        localStorage.setItem('tutorUser', JSON.stringify(userData));
        console.log(userData);
    };

    return (
        <div className='Signup'>
            <div className='container'>
                <div className="header">
                    <div className="text">Sign Up As Tutor</div>
                    {/*add css to make this look pretty*/}
                    {passwordError && <p className='error-message'>{passwordError}</p>}
                </div>
                <form className="inputs" onSubmit={handleSubmit}> {/*All inputs here will be saved to be used by Submit button for creating account */}
                    <div className="input">
                        <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}  />
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
                        <input type="Tutor First Name" placeholder="Enter First Name" value={tutorFirstName} onChange={(e) => setTutorFirstName(e.target.value)}/>
                    </div>
                    <div className="input">
                        <input type="Tutor Last Name" placeholder="Enter Last Name" value={tutorLastName} onChange={(e) => setTutorLastName(e.target.value)}/>
                    </div>
                    <div className="input">
                        <input type="University" placeholder="Enter Current University" value={university} onChange={(e) => setUniversity(e.target.value)}/>
                    </div>
                    {/*submit button will eventually connect with backend script and use previous inputs to create an account */}
                    <button className="submit-container" >Sign Up</button> 
                </form>
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