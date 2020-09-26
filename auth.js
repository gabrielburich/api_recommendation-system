import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";

module.exports = server => {
    const User = server.db.models.User;

    const configuration = server.libs.config;
    const strategyOpt = {secretOrKey: configuration.jwtSecret, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()};
    const strategy = new Strategy(strategyOpt, (payload, done) => {
        User.findOne({where: {id: payload.id}})
            .then(user => {
                return (user)
                    ? done(null, {id: user.id, email: user.email})
                    : done(null, false)
            })
            .catch(error => done(error, null))
    });

    passport.use(strategy);

    return {
        initialize : () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', configuration.jwtSession)
    }
};
