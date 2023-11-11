export const authenticateUser = (userData, email, password) => {
    return userData && userData.email === email && userData.password === password;
};
