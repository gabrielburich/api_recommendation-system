import {encryptPassword} from '../libs/encryptUtils';
import {responseError} from '../libs/responseUtils';

module.exports = server => {
    server.route('/user')
        .post((req, res) => {
            const user = req.body;
            encryptPassword(user);

            server.db.one(
                'INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3) RETURNING id',
                [user.name, user.email, user.password]
            )
                .then(data => res.status(201).send({id: data.id}))
                .catch(error => responseError(error, res));
        });

};
