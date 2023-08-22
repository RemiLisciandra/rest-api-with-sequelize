import updateUser from "./update.js";
import authenticateUser from '../../auth/auth.js';

const patchUser = (server) => {
    server.patch("/api/users/:id", authenticateUser, async (req, res) => {
        await updateUser(req, res, false);
    });
};

export default patchUser;
