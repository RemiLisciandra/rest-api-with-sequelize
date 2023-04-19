import {User} from "../../models/User.js";
import {ValidationError, UniqueConstraintError} from "sequelize";

const postUser = (server) => {
    server.post("/api/users", async (req, res) => {
        try {
            const user = await User.create(req.body);
            return res.json(user);
        } catch (error) {
            if (error instanceof ValidationError) {
                const errorMessage = error.errors.map(err => err.message).join(", ");
                return res.status(400).json({message: `Error : ${errorMessage}`});
            }
            if (error instanceof UniqueConstraintError) {
                const errorMessage = error.errors.map(err => err.message).join(", ");
                return res.status(400).json({message: `Error : ${errorMessage}`});
            }
            return res.status(500).json({message: "Error : Unable to create user"});
        }
    });
};

export default postUser;