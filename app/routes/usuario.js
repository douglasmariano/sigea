module.exports = function (app) {
var controller = app.controllers.usuario;
app.route('/usuarios')
.get(controller.listaTodos)
.post(controller.salvaUsuario);

app.route('/usuarios/:id')
.get(controller.obtemUsuario)
.delete(controller.removeUsuario);

app.route('/usuario_por_login/:login')
.get(controller.obtemUsuarioPorLogin)
};
