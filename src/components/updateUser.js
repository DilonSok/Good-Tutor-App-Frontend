import Axios from 'axios';

const updateUser = async (userId, userData) => {
    try {
        const response = await Axios.put(`http://localhost:3500/users/${userId}`, userData);
        console.log('Updated user:', response.data);
        return response.data; // Return the updated user data
    } catch (error) {
        console.error('Error updating user:', error);
        throw error; // Throw the error to handle it in the calling code
    }
};

export default updateUser;