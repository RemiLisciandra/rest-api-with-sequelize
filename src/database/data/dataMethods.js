import {generateUsersList} from './dataGenerator.js';

let usersList = generateUsersList(10);

const getUsers = () => {
    return usersList;
};

export {getUsers};