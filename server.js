import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from "body-parser";
import {getUsers, addUser, updateUser, patchUser, deleteUser} from './data/userMethods.js';
import sequelizeClient from "./config/database.js";
import UserModel from "./src/models/user.js";

// Create an Express server instance and set the listening port
const server = express();
const port = 3000;

// Connect to database
sequelizeClient.authenticate().then(_ => console.log('Success : connected database')).catch(error => console.error(`Failure : ${error}`));
sequelizeClient.sync({ force: true }).then(async () => {
    console.log('Success : created users');

    for (const user of getUsers()) {
        await UserModel.create(user);
    }
});


// Middlewares
server.use(favicon('favicon.ico')).use(bodyParser.json());

// GET methods
server.get('/api/users/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const user = getUsers().find(user => user.id === id);
        return res.json(user);
    }
);
server.get('/api/users', (req, res) => {
    return res.json(getUsers());
});

// POST method
server.post('/api/users', (req, res) => {
    const id = getUsers().length + 1;
    const userCreated = {...req.body, ...{id: id, created: new Date()}};
    addUser(userCreated);
    return res.json(userCreated);
});

// PUT method
server.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userUpdated = {...req.body, id: id}
    updateUser(id, userUpdated);
    return res.json(userUpdated);
});

// PATCH method
server.patch('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedUser = req.body;
    const userPatched = patchUser(id, updatedUser);
    return res.json(userPatched);
});

// DELETE method
server.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userDeleted = getUsers().find(user => user.id === id);
    deleteUser(id);
    return res.json(userDeleted);
});

// Expose API
server.listen(port);