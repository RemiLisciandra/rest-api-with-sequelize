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
                allowNull: false,
                validate: {
                    len: [1, 50]
                }
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: [1, 30]
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                    len: [1, 100]
                }
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 100,
                    isInt: true
                }
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1, 300]
                }
            },
            cars: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
                validate: {
                    maxCars(value) {
                        if (value && value.length > 1) {
                            throw new Error('The car array may not contain more than 10 elements');
                        }
                    }
                }
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