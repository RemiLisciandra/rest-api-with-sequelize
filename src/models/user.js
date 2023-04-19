import {DataTypes, Model} from 'sequelize';

class User extends Model {
}

const initUser = (sequelizeClient) => {
    User.init(
        {
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
        },
        {
            sequelize: sequelizeClient,
            modelName: 'User',
            timestamps: true
        }
    );
};

export {User, initUser};