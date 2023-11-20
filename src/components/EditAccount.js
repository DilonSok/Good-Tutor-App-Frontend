import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import updateUser from './updateUser'; // Import the updateUser function
import '../css/EditAccount.css';

function EditAccount({ userId }) {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        // Fetch user data based on userId
        const fetchUserData = async () => {
            try {
                const response = await Axios.get(`http://localhost:3500/users/${userId}`);
                setUserData(response.data); // Set user data in state
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(userId, userData); // Update user data
            // Optionally, perform other actions after updating
            console.log('User updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div>
            <div className='edit-header'>
            <h1>Edit Account</h1>
            </div>
            <form onSubmit={handleSubmit}>
                {/* Input fields for editing user data */}
                <div>
                    <h2>Change Username</h2>
                    <input type="text" name="username" value={userData.username} onChange={handleInputChange} />
                </div>
                <div>
                    <h2>Change Email</h2>
                <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
                </div>
                <div>
                    <h2>Change Password</h2>
                <input type="password" name="password" value={userData.password} onChange={handleInputChange} />
                </div>
                {/* Other input fields */}
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditAccount;