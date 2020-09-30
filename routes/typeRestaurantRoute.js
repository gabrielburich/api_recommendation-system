import {responseError, responseHttpOk} from "../libs/responseUtils";

module.exports = server => {

    server.route('/type-restaurant')
        .all(server.auth.authenticate())
        .get((req, res) => {
            server.db.many('SELECT * FROM tp_restaurant;')
                .then(data => responseHttpOk(data, res))
                .catch(error => responseError(error, res));
        })

};
