import {responseError, responseHttpOk} from "../libs/responseUtils";

module.exports = server => {

    server.route('/type-order')
        .all(server.auth.authenticate())
        .get((req, res) => {
            server.db.many('SELECT * FROM tp_order;')
                .then(data => responseHttpOk(data, res))
                .catch(error => responseError(error, res));
        })

};