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
        timezone: 'Europe/Paris',
    },
    logging: false,
});

// Initialize the User model
initUser(sequelizeClient);

const initDb = async () => {
    try {
        // Synchronize the database and create the table if it doesn't exist
        await sequelizeClient.sync({force: true});
        console.log('All models were synchronized successfully.');

        // Insert user data if the table is empty
        const userCount = await User.count();
        if (userCount === 0) {
            const users = getUsers();
            for (const user of users) {
                await User.create(user);
            }
            console.log('User data has been inserted successfully.');
        }
    } catch (error) {
        console.error('Unable to initialize the database:', error);
    }
};

export {sequelizeClient, initDb};