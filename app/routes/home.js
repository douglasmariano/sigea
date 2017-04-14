/*var controller = require('../controllers/home');

module.exports = function(app) {
  app.get('/index', controller().index);
  app.get('/', controller().index);
}*/
var passport = require('passport');
var logout = require('express-passport-logout');
module.exports = function(app) {
  var controller = app.controllers.home;
//  app.get('/', controller.index);
};
