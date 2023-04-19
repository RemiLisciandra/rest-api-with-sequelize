import {User} from "../../models/User.js";

const deleteUser = (server) => {
    server.delete('/api/users/:id', async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                await User.destroy({where: {id: req.params.id}});
                return res.json({message: "Success : User deleted successfully"});
            } else {
                return res.status(404).json({message: "Error : This user does not exist"});
            }
        } catch (error) {
            return res.status(500).json({message: "Error : Unable to delete user"});
        }
    });
};

export default deleteUser;