var passport = require('passport');
var logout = require('express-passport-logout');

module.exports = function(app){

  app.get('/usuario_logado', function(req, res, next) {
    var data = {
      nome: req.user.nome,
      login: req.user.login,
      _id: req.user._id
    };

    res.send(data);

  });

  app.get('/login', function(req, res, next) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  app.get('/logout', function(req, res) {
    console.log("logout");
    req.logout();
    res.redirect('/');
  });

  app.get('/signup', function(req, res) {
  res.render('signup.ejs', { message: req.flash('signupMessage') });
  });
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true,
  }));

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }));


  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', { user: req.user });
  });

  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback',
      passport.authenticate('github', {
          successRedirect: '/'
          }));
  app.get('/', function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }else {
      res.render("auth");
    };
  });
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
