import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from "body-parser";
import {initDb} from "./src/database/sequelize.js";
import getUsers from "./src/routes/users/get/getUsers.js";
import getUserById from "./src/routes/users/get/getUserById.js";

// Create an Express server instance and set the listening port
const server = express();
const port = 3000;

// Middlewares
server.use(favicon('favicon.ico')).use(bodyParser.json());

// Populate database if it is empty
await initDb();

//
getUsers(server);
getUserById(server);

// Expose API
server.listen(port);