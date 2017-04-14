var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var helmet = require('helmet');
var flash = require('connect-flash');
var logout = require('express-passport-logout');



module.exports = function() {
  var app = express();
  app.use(helmet());
  app.set('port', 3000);


  app.set('view engine', 'ejs');
  app.set('views', './app/views');
  app.use(express.static('./public'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(require('method-override')());
  app.use(cookieParser());
  app.use(session({
    secret: 'homem avestruz',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.use(helmet.hidePoweredBy({
    setTo: 'PHP 5.5.14'
  }));
  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());

  //var home = require('../app/routes/home');
  //home(app);

  load('models', {
      cwd: 'app'
    })
    .then('controllers')
    .then('routes/auth.js')
    .then('routes')
    .into(app);
  app.get('*', function(req, res) {
    res.status(404).render('404');
  });



  return app;

};
