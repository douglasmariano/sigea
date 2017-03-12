module.exports = function (app) {
var controller = app.controllers.faculdade;
app.route('/faculdades')
.get(controller.listaTodos)
.post(controller.salvaFaculdade);

app.route('/faculdades/:id')
.get(controller.obtemFaculdade)
.delete(controller.removeFaculdade);
};
