const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { JWT_SECRET_KEY } = require("../env");
const userService = require("../users");

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET_KEY,
    },
    async (jwtPayload, done) => {
      try {
        const email = { email: jwtPayload.email };
        const user = await userService.UserModel.findOne(email);

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
