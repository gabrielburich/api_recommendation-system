module.exports = server => {
    server.route('/restaurant')
        // .all(server.auth.authenticate())
        .get((req, res) => {
            const functionParams = JSON.parse(req.query.params);
            server.db.func('recommends_restaurant', functionParams)
                .then(result => res.json(result))
                .catch(error => res.status(501).json({msg: error.message}))
        });
};
