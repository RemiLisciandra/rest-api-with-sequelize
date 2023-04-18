import {DataTypes, Model} from 'sequelize';
import sequelizeClient from "../../config/database.js";

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cars: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    }
}, {
    sequelize: sequelizeClient,
    timestamps: true,
    modelName: 'User',
    createdAt: 'created',
    updatedAt: true
});

export default User;