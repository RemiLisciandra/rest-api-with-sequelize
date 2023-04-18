import {Sequelize} from "sequelize";
import {config as dotenvConfig} from 'dotenv';

// Load environment variables
dotenvConfig();

const sequelizeClient = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    dialectOptions: {
        timezone: 'Europe/Paris'
    },
    logging: false
});

export default sequelizeClient;