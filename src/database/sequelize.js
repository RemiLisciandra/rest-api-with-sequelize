import { Sequelize } from 'sequelize';
import { config as dotenvConfig } from 'dotenv';
import { getUsers } from './data/userMethods.js';
import { User, initUser } from '../models/User.js';

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

const initDb = () => {
    return sequelizeClient.sync({ force: true }).then(async (_) => {
        initUser(sequelizeClient);

        const userCount = await User.count();
        if (userCount === 0) {
            for (const user of getUsers()) {
                await User.create(user);
            }
        }
    });
};

export { sequelizeClient, initDb };