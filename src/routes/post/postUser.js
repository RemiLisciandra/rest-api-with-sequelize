import {User} from "../../models/User.js";
import {ValidationError, UniqueConstraintError} from "sequelize";

const postUser = (server) => {
    server.post("/api/users", async (req, res) => {
        try {
            const user = await User.create(req.body);
            return res.json(user);
        } catch (error) {
            if (error instanceof ValidationError) {
                const validationErrors = error.errors.map((err) => ({
                    path: err.path,
                    message: err.message,
                }));
                return res.status(400).json({message: "Error : Validation error", errors: validationErrors});
            }
            if (error instanceof UniqueConstraintError) {
                return res.status(400).json({message: "Error : A user with the same unique field(s) already exists"});
            }
            return res.status(500).json({message: "Error : Unable to create user"});
        }
    });
};

export default postUser;