module.exports = function (app) {
var controller = app.controllers.evento;
app.route('/eventos')
.get(controller.listaTodos)
.post(controller.salvaEvento);

app.route('/eventos/:id')
.get(controller.obtemEvento)
.delete(controller.removeEvento);
};
