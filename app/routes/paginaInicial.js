module.exports = function (app) {
var controller = app.controllers.paginaInicial;
app.route('/paginaInicial')
.get(function(req,res){res.end();})
.post(function(req,res){});

app.route('/paginaInicial/:id')
.get(function(req,res){})
.delete(function(req,res){});
};
