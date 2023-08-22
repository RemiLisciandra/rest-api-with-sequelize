import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import privateKey from '../../auth/key.js';
import {Admin} from "../../models/Admin.js";

const loginUser = (app) => {
    app.post('/api/login', (req, res) => {

        Admin.findOne({where: {username: req.body.username}})
            .then(admin => {
                if (!admin) {
                    const message = `L'admin demandé n'existe pas.`;
                    return res.status(404).json({message});
                }

                return bcrypt.compare(req.body.password, admin.password)
                    .then(isValidPassword => {
                        if (!isValidPassword) {
                            const message = `Le mot de passe est incorrect.`;
                            return res.status(401).json({message});
                        }

                        // Générer un jeton JWT valide pendant 24 heures.
                        const token = jwt.sign(
                            {userId: admin.id},
                            privateKey,
                            {expiresIn: '24h'}
                        );

                        const message = `L'admin a été connecté avec succès`;
                        return res.json({message, data: admin, token});
                    });
            })
            .catch(error => {
                const message = `L'admin n'a pas pu être connecté. Réessayez dans quelques instants.`;
                res.status(500).json({message, data: error});
            });
    });
};

export default loginUser;