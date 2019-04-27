const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' }, (email, password, done) => {
        User.findOne({ email: email }).then(user => {
          if (!user) {
            return done(null, false, {
              message: 'That email is not registered'
            })
          }

          bcrypt.compare(password, user.password, (err, isMach) => {
            if (err) throw err
            if (isMach) {
              return done(null, user)
            } else {
              return done(null, false, {
                message: 'Email or password incorrect'
              })
            }
          })
        })
      }
    )
  )

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });



}
