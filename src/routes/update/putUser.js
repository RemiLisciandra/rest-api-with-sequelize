import updateUser from "./update.js";
import authenticateUser from "../../auth/auth.js";

const putUser = (server) => {
    server.put("/api/users/:id", authenticateUser, async (req, res) => {
        await updateUser(req, res, true);
    });
};

export default putUser;