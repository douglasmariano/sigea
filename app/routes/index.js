var passport = require('passport');
var logout = require('express-passport-logout');
module.exports = function(app) {


  app.get('/', function(req, res) {

    var express = require('express');
    var passport = require('passport');

    res.render('index', { user: req.user });
    req.logout();

  });

};
