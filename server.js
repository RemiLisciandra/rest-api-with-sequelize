import users from './data/data.js';
import express from 'express';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import bodyParser from "body-parser";

const server = express();
const port = 3000;

// Middlewares
server.use(favicon('favicon.ico')).use(morgan('dev')).use(bodyParser.json());

// GET Methods
server.get('/api/users/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const user = users.find(user => user.id === id);
        res.json(user);
    }
);

server.get('/api/users', (req, res) => {
        res.json(users);
    }
);

// POST Methods
server.post('/api/users', (req, res) => {
    const id = users.length + 1;
    const userCreated = {...req.body, ...{id: id, created: new Date()}};
    users.push(userCreated);
    res.json(userCreated);
});

// Listen api
server.listen(port);