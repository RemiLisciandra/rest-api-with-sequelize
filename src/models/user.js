import {DataTypes, Model} from "sequelize";

class User extends Model {
}

const initUser = (sequelizeClient) => {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [1, 50],
                        msg: "Full name must be between 1 and 50 characters.",
                    },
                },
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: {
                        args: [1, 30],
                        msg: "Username must be between 1 and 30 characters.",
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        args: true,
                        msg: "Email must be a valid email address.",
                    },
                    len: {
                        args: [1, 100],
                        msg: "Email must be between 1 and 100 characters.",
                    },
                },
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: {
                        args: 1,
                        msg: "Age must be at least 1.",
                    },
                    max: {
                        args: 100,
                        msg: "Age must not be greater than 100.",
                    },
                    isInt: {
                        args: true,
                        msg: "Age must be an integer.",
                    },
                },
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [1, 300],
                        msg: "The picture URL may not contain more than 300 characters.",
                    },
                    isUrl: {
                        args: true,
                        msg: "The picture field must be a valid URL.",
                    },
                },
            },
            cars: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
                validate: {
                    maxCars(value) {
                        if (value && value.length > 2) {
                            throw new Error("The car array may not contain more than 2 elements.");
                        }
                    },
                },
            },
        },
        {
            sequelize: sequelizeClient,
            modelName: "User",
            timestamps: true,
        }
    );
};

export {User, initUser};