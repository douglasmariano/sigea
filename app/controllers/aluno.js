module.exports = function(app) {

  var Aluno = app.models.aluno;
  var sanitize = require('mongo-sanitize');

  var controller = {};

  controller.listaTodos = function(req, res) {
    //Aluno.find().populate('emergencia').exec()
    var promise = Aluno.find().populate('faculdade').exec()
      .then(
        function(alunos) {
          res.json(alunos);
        },
        function(erro) {
          console.error(erro)
          res.status(500).json(erro);
        }
      );
  };

  controller.obtemAluno = function(req, res) {
    console.log("obtemAluno: id " + req.params.id);
    var _id = req.params.id;
    Aluno.findById(_id).exec()
      .then(
        function(aluno) {
          if (!aluno) throw new Error("Aluno não encontrado");
          res.json(aluno)
        },
        function(erro) {
          console.log(erro);
          res.status(404).json(erro)
        }
      );
  };

  controller.removeAluno = function(req, res) {
    var _id = sanitize(req.params.id);
    Aluno.remove({
        "_id": _id
      }).exec()
      .then(
        function() {
          res.end();
        },
        function(erro) {
          return console.error(erro);

        }
      );
  };

  controller.salvaAluno = function(req, res) {
    var _id = req.body._id;

    var dados = {
      "nome": req.body.nome,
      "telefone": req.body.telefone,
      "email": req.body.email,
      "faculdade": req.body.faculdade || null
    };
    if (_id) {
      Aluno.findByIdAndUpdate(_id, dados).exec()
        .then(
          function(aluno) {
            res.json(aluno);

          },
          function(erro) {
            res.status(500).json(erro);
          }
        );
    } else {
      Aluno.create(dados)
        .then(
          function(aluno) {
            res.status(201).json(aluno);

          },
          function(erro) {
            console.log(erro);
            res.status(500).json(erro);
          }
        );
    }
  };

  return controller;
};
