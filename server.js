import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from "body-parser";
import {getUsers, addUser, updateUser, patchUser, deleteUser} from './data/userMethods.js';
import {Sequelize} from "sequelize";
import { config as dotenvConfig } from 'dotenv';

// Load environment variables
dotenvConfig();

// Create an Express server instance and set the listening port
const server = express();
const port = 3000;

// Connect to database
const sequelizeClient = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    dialectOptions: {
        timezone: 'Etc/GMT-2'
    },
    logging: false
});
sequelizeClient.authenticate().then(_ => console.log('Success')).catch(error => console.error(`Failure : ${error}`));

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