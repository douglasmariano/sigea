var passport = require('passport');
var GitHubStrategy = require('passport-github');
var mongoose = require('mongoose');


module.exports = function(){
  var Usuario = mongoose.model('Usuario');

  passport.use(new GitHubStrategy({
    clientID: 'e3c402f0dfd7ec3962c5',
    clientSecret: 'c2e1c820683127339c355b8ca15bcddbff3df95f',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  }, function(accessToken, refreshToken, profile, done){
    Usuario.findOrCreate(
      {"login" :profile.username},
      {"nome" :profile.username},
        function(erro,usuario){
        //  console.log(usuario);
          if(erro){
            console.log(erro);
            return done(erro);
          }
          return done(null,usuario);
        }
    );

  }));
  passport.serializeUser(function(usuario, done){
    console.log("Passport.serializeUser "+usuario);
    done(null, usuario._id);
  });
  passport.deserializeUser(function(id,done){
    Usuario.findById(id).exec()
    .then(function(usuario){
      console.log("Passport.deserializeUser "+usuario);
      done(null,usuario);
    });
  });

};
