const passport = require('passport');
const JWTstrategy = require('passport-jwt');
const localStrategy = require('passport-local');
const User = require('../model/usersModel');

passport.use(
  'signup',
  new localStrategy.Strategy(
    {
      usernameField: 'name',
      passwordField: 'password'
    },
    async (name, password, done) => {
      try {
        const user = await User.create({ name, password });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy.Strategy(
    {
      usernameField: 'name',
      passwordField: 'password'
    },
    async (name, password, done) => {
      try {
        const user = await User.findOne({ name });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        if (!user.isValidPassword(password)) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy.Strategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: JWTstrategy.ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
