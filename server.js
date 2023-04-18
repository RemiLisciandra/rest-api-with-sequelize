import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from "body-parser";
import {initDb} from "./src/database/sequelize.js";

// Create an Express server instance and set the listening port
const server = express();
const port = 3000;

// Middlewares
server.use(favicon('favicon.ico')).use(bodyParser.json());

// Populate database if it is empty
initDb();

// Expose API
server.listen(port);