import { User } from "../../models/User.js";
import { Op } from "sequelize";

const getUsers = (server) => {
    server.get("/api/users", async (req, res) => {
        try {
            const searchUsername = req.query.username || undefined;
            const minAge = parseInt(req.query.minAge) || undefined;
            const maxAge = parseInt(req.query.maxAge) || undefined;
            const offset = parseInt(req.query.offset) || undefined;
            const limit = parseInt(req.query.limit) || undefined;
            const queryConditions = {};

            if (searchUsername) {
                queryConditions.username = {
                    [Op.iLike]: `%${searchUsername}%`,
                };
            }
            if (minAge || maxAge) {
                queryConditions.age = {};
                if (minAge) {
                    queryConditions.age[Op.gte] = minAge;
                }
                if (maxAge) {
                    queryConditions.age[Op.lte] = maxAge;
                }
            }
            const { count, rows: users } = await User.findAndCountAll({
                where: queryConditions,
                limit: limit,
                offset: offset,
                order: [["username", "ASC"]],
            });
            if (!users || users.length === 0) {
                return res.status(404).json({ message: "No users found" });
            }
            const totalUsers = count;
            return res.json({ totalUsers, users });
        } catch (error) {
            return res.status(500).json({ message: "Error : Unable to retrieve user data" });
        }
    });
};

export default getUsers;