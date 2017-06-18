var passport = require('passport');

module.exports = function(app){


  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback',
      passport.authenticate('github', {
          successRedirect: '/'
          }));
  app.get('/', function(req, res, next){
    if(req.isAuthenticated()){
      console.log("isAuthenticated"+ req.user);
      return next();
    }else {
      console.log("not Authenticated");
      res.render("auth");
    };
  });
}
