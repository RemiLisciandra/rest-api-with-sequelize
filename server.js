import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from "body-parser";
import {initDb} from "./src/database/sequelize.js";
import getUsers from "./src/routes/get/getUsers.js";
import getUserById from "./src/routes/get/getUserById.js";
import postUser from "./src/routes/post/postUser.js";
import deleteUser from "./src/routes/delete/deleteUser.js";
import putUser from "./src/routes/update/putUser.js";
import patchUser from "./src/routes/update/patchUser.js";

// Create an Express server instance and set the listening port
const server = express();
const port = 3000;

// Middlewares
server.use(favicon('favicon.ico')).use(bodyParser.json());

// Populate database if it is empty
await initDb();

// HTTP method calls
getUsers(server);
getUserById(server);
postUser(server);
putUser(server);
patchUser(server);
deleteUser(server);

// Expose API
server.listen(port);