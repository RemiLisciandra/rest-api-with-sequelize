import updateUser from "./update.js";

const patchUser = (server) => {
    server.patch("/api/users/:id", async (req, res) => {
        await updateUser(req, res, false);
    });
};

export default patchUser;