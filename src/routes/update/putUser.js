import updateUser from "./update.js";

const putUser = (server) => {
    server.put("/api/users/:id", async (req, res) => {
        await updateUser(req, res, true);
    });
};

export default putUser;