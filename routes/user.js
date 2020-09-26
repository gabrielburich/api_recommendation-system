import bcrypt from 'bcrypt';

module.exports = server => {
    server.route('/user')
        .post((req, res) => {
            const user = req.body;

            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);

            server.db.one(
                'INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3) RETURNING id',
                [user.name, user.email, user.password]
            )
                .then(data => res.status(201).send({id: data.id}))
                .catch(error => res.status(501).send({msg: error.message}));
        });

};
