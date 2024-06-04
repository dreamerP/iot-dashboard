const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const userService = require('../services/authService');
const jwtUtils = require('../utils/jwtUtils');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtUtils.secret
};

const strategy = new JwtStrategy(options, (payload, done) => {
  const user = userService.getUserById(payload.id);
  if (user) {
    return done(null, user);
  }
  return done(null, false);
});

module.exports = (passport) => {
  passport.use(strategy);
};
