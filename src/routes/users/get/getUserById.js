import {User} from "../../../models/User.js";

const getUserById = (server) => {
    server.get("/api/users/:id", async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (user !== null) {
                return res.json(user);
            } else {
                return res.status(404).json({message: "Error : This user does not exist"});
            }
        } catch (error) {
            return res.status(500).json({message: "Error : Unable to retrieve user data"});
        }
    });
};

export default getUserById;