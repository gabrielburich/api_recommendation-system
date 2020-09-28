import {responseError} from "../libs/responseUtils";

module.exports = server => {
    server.route('/restaurant')
        .all(server.auth.authenticate())
        .get((req, res) => {
            const reqParams = JSON.parse(req.query.params);
            const functionParams = [req.user.id, ...reqParams];
            server.db.func('recommends_restaurant', functionParams)
                .then(result => res.json(result))
                .catch(error => responseError(error, res));
        });
};
