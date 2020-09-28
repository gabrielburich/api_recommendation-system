import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';

module.exports = server => {
    const configuration = server.libs.config;
    const strategyOpt = {secretOrKey: configuration.jwtSecret, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()};
    const strategy = new Strategy(strategyOpt, (payload, done) => {
        server.db.one('select id, name from "user" where id = $1', [payload.id])
            .then(user => done(null, user ? {id: user.id, name: user.name} : false))
            .catch(error => done(error, null))
    });

    passport.use(strategy);

    return {
        initialize : () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', configuration.jwtSession)
    }
};
