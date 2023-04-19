import {Sequelize} from 'sequelize';
import {config as dotenvConfig} from 'dotenv';
import {getUsers} from './data/dataMethods.js';
import {User, initUser} from '../models/User.js';

// Load environment variables
dotenvConfig();

const sequelizeClient = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    dialectOptions: {
        timezone: 'Etc/GMT-2',
    },
    logging: false,
});

// Initialize the User model
initUser(sequelizeClient);

const checkAndPopulateTable = async () => {
    // Synchronize the database and create the table if it doesn't exist
    await sequelizeClient.sync();
    const userCount = await User.count();
    if (userCount === 0) {
        const users = getUsers();
        for (const user of users) {
            await User.create(user);
        }
        console.log('User data has been inserted successfully.');
    }
};

const initDb = async () => {
    try {
        // Synchronize the database and create the table if it doesn't exist
        await sequelizeClient.sync();
        console.log('All models were synchronized successfully.');

        // Check and populate the table if it's empty, initially
        await checkAndPopulateTable();

        // Set an interval to check and populate the table every X milliseconds
        const interval = 60000; // 60,000 milliseconds = 1 minute
        setInterval(async () => {
            await checkAndPopulateTable();
        }, interval);
    } catch (error) {
        console.error('Unable to initialize the database:', error);
    }
};

export {sequelizeClient, initDb};