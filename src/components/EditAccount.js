import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { validatePassword } from '../scripts/validatePassword';
import '../css/EditAccount.css';
import { useNavigate, NavLink } from 'react-router-dom';



function EditAccount() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        description: '',
        availability: [],
        role: 0, // Default to student role
        classes: '' // Add a new state for classes
    });
    const [errors, setErrors] = useState({});
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const _username = storedUser ? storedUser.username : null;
    const _userID = storedUser ? storedUser._id : null;
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const navigate = useNavigate();

    useEffect(() => {
        if (_username) {
            Axios.get(`http://localhost:3500/users/getone`, { params: { username: _username } })
                .then(response => {
                    const fetchedData = response.data;
                    setUserData({ ...fetchedData, password: '', confirmPassword: '' });
                    setUserData(prev => ({ ...prev, classes: fetchedData.classes.join(', ') })); // Set the classes state
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [_username]);

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleClassesChange = (e) => {
        setUserData(prev => ({ ...prev, classes: e.target.value })); // Update the classes state
    };

    const handleAvailabilityChange = (e) => {
        const { name, checked } = e.target;
        setUserData(prevState => ({
            ...prevState,
            availability: checked
                ? [...prevState.availability, name]
                : prevState.availability.filter(day => day !== name)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userData.password !== userData.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match.' }));
            return;
        }

        if (!validatePassword(userData.password)) {
            setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters long and contain at least one symbol.' }));
            return;
        }

        // Convert classes from a comma-separated string to an array
        const classesArray = userData.classes.split(',').map(cls => cls.trim());

        try {
            const response = await Axios.patch(`http://localhost:3500/users`, { ...userData, id: _userID, classes: classesArray });
            console.log('User updated successfully!', response.data);

            // Update localStorage after successful user update
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('userID', response.data.user._id);
            localStorage.setItem('currentUsername', response.data.user.username);

            alert('Account updated successfully!');
            navigate('/home')
            // Optionally, redirect user or show success message
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const validateField = (field, value) => {
        let tempErrors = { ...errors };
        switch (field) {
            case 'username':
                tempErrors.username = value ? '' : 'Username cannot be empty';
                break;
            case 'email':
                tempErrors.email = value && value.includes('@') && value.includes('.') ? '' : 'Invalid email';
                break;
            case 'description':
                tempErrors.description = value ? '' : 'Description cannot be empty';
                break;
            case 'password':
                tempErrors.password = validatePassword(value) ? '' : 'Invalid password';
                break;
            case 'confirmPassword':
                tempErrors.confirmPassword = value === userData.password ? '' : 'Passwords do not match';
                break;
            case 'classes':
                // Check if classes input is a comma-separated list
                tempErrors.classes = value.split(',').every(cls => cls.trim().length) ? '' : 'Classes must be a comma-separated list';
                break;
            default:
                break;
        }
        setErrors(tempErrors);
    };

    const handleBlur = (e) => {
        validateField(e.target.name, e.target.value);
    };

    const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

    const showDeleteConfirmation = () => {
      setDeleteConfirmationVisible(true);
    };
  
    const hideDeleteConfirmation = () => {
      setDeleteConfirmationVisible(false);
    };

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false'); 
        localStorage.removeItem('user'); 
        localStorage.removeItem('tutorProfile'); 
        localStorage.removeItem('currentUsername'); 
        localStorage.removeItem('userID'); 
        localStorage.removeItem('authToken'); 
        window.dispatchEvent(new Event('loginStateChange')); //ping state change for login (logged out)
        navigate('/');
      };
  
    const handleDelete = async () => {
      try {
        const response = await Axios.delete(`http://localhost:3500/users`, { data: { id: _userID } });
  
        if (response.status === 200) {
          // Perform any additional cleanup or redirection
            console.log(`Account for ${_username} deleted successfully`);
            handleLogout()
        } else {
          alert('Error deleting account');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
      } finally {
        hideDeleteConfirmation();
      }
    };
    return (
        <div className='edit-account-container'>
            <div className='edit-header'>
                <h1>Edit Account</h1>
            </div>
            <form onSubmit={handleSubmit} className='edit-account-form'>
                <div className="input-group">
                    <label htmlFor="username">Change Username</label>
                    <input type="text" id="username" name="username" value={userData.username} onChange={handleInputChange} onBlur={handleBlur} required />
                    {errors.username && <p className="error-message">{errors.username}</p>}
                </div>
                <div className="input-group">
                    <label htmlFor="email">Change Email</label>
                    <input type="email" id="email" name="email" value={userData.email} onChange={handleInputChange} onBlur={handleBlur} required />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="input-group">
                    <label htmlFor="password">Change Password</label>
                    <input type="password" id="password" name="password" value={userData.password} onChange={handleInputChange} onBlur={handleBlur} required />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={userData.confirmPassword} onChange={handleInputChange} onBlur={handleBlur} required />
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                </div>
                <div className="input-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={userData.description} onChange={handleInputChange} onBlur={handleBlur} required />
                    {errors.description && <p className="error-message">{errors.description}</p>}
                </div>
                {userData.role === 1 && (
                    <>
                        <div className="input-group">
                            <label htmlFor="classes">Classes (comma-separated)</label>
                            <input type="text" id="classes" name="classes" value={userData.classes} onChange={handleClassesChange} onBlur={handleBlur} required />
                            {errors.classes && <p className="error-message">{errors.classes}</p>}
                        </div>
                        <div className="input-group availability-group">
                            <label htmlFor="availability">Select Available Days:</label>
                            <div className="days-grid">
                                {daysOfWeek.map(day => (
                                    <div key={day} className="day-checkbox">
                                        <input
                                            type="checkbox"
                                            id={day}
                                            name={day}
                                            checked={userData.availability.includes(day)}
                                            onChange={handleAvailabilityChange}
                                        />
                                        <label htmlFor={day}>{day}</label>
                                    </div>
                                ))}
                            </div>
                            {errors.availability && <p className="error-message">{errors.availability}</p>}

                        </div>
                    </>
                )}
                <button className="submit-container" type="submit">Save Changes</button>
            </form>
      {/* ... (existing code) */}
      <button className="delete-account-button" onClick={showDeleteConfirmation}>Delete Account</button>

      {/* Delete Confirmation Dialog */}
      {isDeleteConfirmationVisible && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete your account?</p>
          <button onClick={handleDelete}>Yes, Delete</button>
          <button onClick={hideDeleteConfirmation}>Cancel</button>
        </div>
      )}
    </div>

    );
}

export default EditAccount;