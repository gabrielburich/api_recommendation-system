import jwt from 'jwt-simple';
import {responseError} from '../libs/responseUtils';
import {compareEncryptValue} from '../libs/encryptUtils';

module.exports = server => {
    const configuration = server.libs.config;

    server.post('/token/', (req, res) => {
        if (req.body.email && req.body.password) {
            const login = req.body;

            server.db.one('select id, name, password from "user" where email = $1', [login.email])
                .then(user => {
                    if (user && compareEncryptValue(login.password, user.password)) {
                        const payload = {id: user.id, name: user.name};
                        res.json({token: jwt.encode(payload, configuration.jwtSecret)});
                    } else {
                        res.sendStatus(401);
                    }
                })
                .catch(error => responseError(error, res, 401));

        } else {
            res.sendStatus(401);
        }
    })
};