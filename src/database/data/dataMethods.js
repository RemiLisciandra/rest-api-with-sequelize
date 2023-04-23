import {generateUsersList} from './dataGenerator.js';

let usersList = generateUsersList();

const getUsers = () => {
    return usersList;
};

const getAdmin = (usernameAdmin, emailAdmin, hashedPassword) => {
    return {
        username : usernameAdmin,
        email: emailAdmin,
        password : hashedPassword
    };
}

export {getUsers, getAdmin};