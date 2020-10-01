import {responseError, responseHttpOk} from "../libs/responseUtils";

module.exports = server => {

    //TODO save order
    server.route('/order')
        .all(server.auth.authenticate())
        .post((req, res) => {
            const {restaurantId, filter} = req.body;
            const {acceptsMealVoucher, typeRestaurantId, orderTime, distance, typeOrderId, sitPlace} = filter;

            server.db.none(
                'INSERT INTO ' +
                'last_cases ' +
                '(accepts_meal_voucher, tp_restaurant_id, order_time, distance, tp_order_id, sit_place, restaurant_id) ' +
                'VALUES ' +
                '($1, $2, $3, $4, $5, $6, $7);',
                [acceptsMealVoucher, typeRestaurantId, orderTime, distance, typeOrderId, sitPlace, restaurantId]
            )
                .then(data => responseHttpOk(data, res))
                .catch(error => responseError(error, res));
        })

};
