import {User} from "../../models/User.js";
import {UniqueConstraintError, ValidationError} from "sequelize";

const updateUser = async (req, res, isFullUpdate) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            let updateOptions;
            if (isFullUpdate) {
                updateOptions = { fields: undefined };
            } else {
                updateOptions = { fields: Object.keys(req.body) };
            }
            await user.update(req.body, updateOptions);
            return res.json(user);
        } else {
            return res.status(404).json({message: "Error : This user does not exist"});
        }
    } catch (error) {
        if (error instanceof ValidationError) {
            const errorMessage = error.errors.map(err => err.message).join(", ");
            return res.status(400).json({message: `Error : ${errorMessage}`});
        }
        if (error instanceof UniqueConstraintError) {
            const errorMessage = error.errors.map(err => err.message).join(", ");
            return res.status(400).json({message: `Error : ${errorMessage}`});
        }
        return res.status(500).json({message: "Error : Unable to update user"});
    }
};

export default updateUser;