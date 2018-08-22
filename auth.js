// Connect to the database
const db = require('./db/databaseConnection.js');
// Passport requirements
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const options = {};

passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser((id, done) => {
  return db.one('SELECT * FROM users WHERE id = $1', id)
    .then((user) => { done(null, user); })
    .catch((err) => { done(err,null); });
});

passport.use(new LocalStrategy(options, (username, password, done) => {
  db.one('SELECT * FROM users WHERE user = $1', username)
    .then((user) => {
      if (!user) return done(null, false);
      if (password === user.password) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => { return done(err); });
}));
