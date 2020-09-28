import {responseError, responseHttpOk, responseUpdate} from "../libs/responseUtils";

module.exports = server => {

    server.route('/user-preference/:userId')
        .all(server.auth.authenticate())

        .get((req, res) => {
            server.db.one('SELECT * FROM user_preference_data WHERE "userId" = $1', [req.params.userId])
                .then(data => responseHttpOk(data, res))
                .catch(error => responseError(error, res));
        })

        .put((req, res) => {
            const userPreference = req.body;
            server.db.none(
                'UPDATE user_preference ' +
                'set order_time_weight = $1, ' +
                'order_time_tolerance = $2, ' +
                'distance_weight = $3, ' +
                'distance_tolerance = $4 ' +
                'WHERE user_id = $5;',
                [
                    userPreference.orderTimeWeight,
                    userPreference.orderTimeTolerance,
                    userPreference.distanceWeight,
                    userPreference.distanceTolerance,
                    req.params.userId
                ]
            )
                .then(() => responseUpdate(req.params.userId, res))
                .catch(error => responseError(error, res));
        })

};
