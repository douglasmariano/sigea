var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GitHubStrategy = require('passport-github');
var mongoose = require('mongoose');


module.exports = function() {
  var Usuario = mongoose.model('Usuario');

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {
    Usuario.findOne({ 'login':  email }, function(err, user) {
      //console.log(user);
      if (err)
          return done(err);
      if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.'));
      if (user.password != password)
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      return done(null, user);
    });
  }));

  passport.use('local-signup', new LocalStrategy({

    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {


    process.nextTick(function() {
      Usuario.findOne({ 'login':  email }, function(err, user) {
        if (err)
            return done(err);
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
          var newUser = new Usuario();
          newUser.nome = req.body.nome;
          newUser.login = email;
          newUser.password = password;
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));


  passport.serializeUser(function(usuario, done) {
    done(null, usuario._id);
  });
  passport.deserializeUser(function(id, done) {
    Usuario.findById(id).exec()
      .then(function(usuario) {
        done(null, usuario);
      });
  });

};
