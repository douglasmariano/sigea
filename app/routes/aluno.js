module.exports = function (app) {
var controller = app.controllers.aluno;
app.route('/alunos')
.get(controller.listaTodos)
.post(controller.salvaAluno);

app.route('/alunos/:id')
.get(controller.obtemAluno)
.delete(controller.removeAluno);
};
