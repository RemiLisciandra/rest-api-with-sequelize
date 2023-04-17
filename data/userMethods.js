import { generateUsersList } from './dataGenerator.js';

let usersList = generateUsersList(10);

const getUsers = () => {
    return usersList;
};

const addUser = (addedUser) => {
    return usersList.push(addedUser);
};

const updateUser = (id, updatedUser) => {
    return usersList = usersList.map(user => user.id === id ? updatedUser : user);
};

const patchUser = (id, updatedUser) => {
    let modifiedUser;
    usersList = usersList.map(user => {
        if (user.id === id) {
            modifiedUser = { ...user, ...updatedUser };
            return modifiedUser;
        }
        return user;
    });
    return modifiedUser;
};

const deleteUser = (id) => {
    return usersList = usersList.filter(user => user.id !== id);
};

export {getUsers, addUser, updateUser, deleteUser, patchUser};