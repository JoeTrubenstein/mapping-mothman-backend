const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/User");

const keys = "supersupersecret" || process.env.SECRET_KEY;

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
      console.log(17)
        .then(user => {
            console.log(19)
          if (user) {
            console.log(user)
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch(error => console.log(error));
    })
  );
};