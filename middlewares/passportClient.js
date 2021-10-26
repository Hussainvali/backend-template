const passport = require("passport");
const passportJWT = require("passport-jwt");

const LocalStrategy = require("passport-local");
const db = require("../models/index");
const { getSingleRow } = require("../models/dataModel");
const jwtConfig = require("../config/jwtConfig.json");

const JwtStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;
const md5 = require("md5");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtConfig.secret;


passport.use("jwt", new JwtStrategy(opts,  (jwt_payload, done) => {

    // console.log("jwt_payload",jwt_payload);

    if (Object.prototype.hasOwnProperty.call(jwt_payload, "email")) {

        let user = jwt_payload;

        return done(null, user);
    }
    return done(null, false);


  })
);

// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//
//   User.findOne({id: jwt_payload.sub}, function(err, user) {
//     if (err) {
//       return done(err, false);
//     }
//     if (user) {
//       return done(null, user);
//     } else {
//       return done(null, false);
//       // or you could create a new account
//     }
//   });
//
//
// }));


passport.use("login", new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        session: false
    },
    (username, password, done) => {
        password = md5(password)
        const where = {
            email: username
        };
        getSingleRow(db.Registration, where)
            .then((user) => {
                if (!user) {
                    return done({ message: "Check username", error_code: "wrong_user_or_password", status: 200 }, false);
                }
                if (user.password !== password) {
                    return done({ message: "Wrong password", error_code: "wrong_user_or_password", status: 200 }, false);
                }
                return done(null, user);
            }).catch((err) => done(err, null));
    }));

module.exports = passport;
module.exports.login = passport.authenticate("login", { session: false });
module.exports.jwtAuthorize = passport.authenticate("jwt", { session: false });
