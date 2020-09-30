import {responseError, responseHttpOk} from "../libs/responseUtils";

module.exports = server => {

    server.route('/restaurant/:id')
        .all(server.auth.authenticate())
        .get((req, res) => {
            const restaurantPromise = server.db.one('select * from restaurant_information WHERE id = $1;', [req.params.id]);
            const mealsPromise = server.db.many('select * from meal WHERE restaurant_id =$1;', [req.params.id]);

            Promise.all([restaurantPromise, mealsPromise])
                .then(data => {
                    const [restaurant, meals] = data;
                    restaurant.meals = meals.map(meal => {
                        delete meal.restaurant_id;
                        return meal;
                    });
                    responseHttpOk(restaurant, res)
                })
                .catch(error => responseError(error, res));
        })

};
