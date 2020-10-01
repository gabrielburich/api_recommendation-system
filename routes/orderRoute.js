import {responseCreate, responseError} from "../libs/responseUtils";

module.exports = server => {

    server.route('/order')
        .all(server.auth.authenticate())
        .post((req, res) => {
            const {restaurantId, meal, filter} = req.body;
            const {acceptsMealVoucher, typeRestaurantId, orderTime, distance, typeOrderId, sitPlace} = filter;

            const promiseOrder = server.db.one(
                'INSERT INTO "order" (user_id, restaurant_id, meal_id) values ($1, $2, $3) RETURNING id;',
                [req.user.id, restaurantId, meal.id]
            )

            const lastCasePromise = server.db.none(
                'INSERT INTO ' +
                'last_cases ' +
                '(accepts_meal_voucher, tp_restaurant_id, order_time, distance, tp_order_id, sit_place, restaurant_id) ' +
                'VALUES ' +
                '($1, $2, $3, $4, $5, $6, $7);',
                [acceptsMealVoucher, typeRestaurantId, orderTime, distance, typeOrderId, sitPlace, restaurantId]
            )

            Promise.all([promiseOrder, lastCasePromise])
                .then(data => responseCreate(data[0], res))
                .catch(error => responseError(error, res));
        })

};
