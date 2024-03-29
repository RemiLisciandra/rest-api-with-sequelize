import {DataTypes, Model} from "sequelize";

class Admin extends Model {
}

const initAdmin = (sequelizeClient) => {
    Admin.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            sequelize: sequelizeClient,
            modelName: "Admin",
            timestamps: true,
        }
    );
};

export {Admin, initAdmin};