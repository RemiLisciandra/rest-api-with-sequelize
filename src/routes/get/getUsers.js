import {User} from "../../models/User.js";

const getUsers = (server) => {
    server.get("/api/users", async (req, res) => {
        try {
            const users = await User.findAll();
            if (!users || users.length === 0) {
                return res.status(404).json({message: "No users found"});
            }
            return res.json(users);
        } catch (error) {
            return res.status(500).json({message: "Error : Unable to retrieve user data"});
        }
    });
};

export default getUsers;