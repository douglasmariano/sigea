module.exports = function(app) {

  var Usuario = app.models.usuario;
  var sanitize = require('mongo-sanitize');

  var controller = {};

  controller.listaTodos = function(req, res) {
    //Usuario.find().populate('faculdade').exec()
    var promise = Usuario.find().populate('eventosinscritos').exec()
      .then(
        function(usuarios) {
          res.json(usuarios);
        },
        function(erro) {
          console.error(erro)
          res.status(500).json(erro);
        }
      );
  };

  controller.obtemUsuario = function(req, res) {
    var _id = req.params.id;
    Usuario.findById(_id).populate('eventosinscritos').exec()
      .then(
        function(usuario) {
          if (!usuario) throw new Error("Usuario não encontrado");

          res.json(usuario);
        },
        function(erro) {
          console.log(erro);
          res.status(404).json(erro)
        }
      );
  };

  controller.removeUsuario = function(req, res) {
    var _id = sanitize(req.params.id);
    Usuario.remove({
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

  controller.salvaUsuario = function(req, res) {
    var _id = req.body._id;

    var dados = {
      "login": req.body.login,
      "nome": req.body.nome,
      "password": req.body.password,
      "permissao": req.body.permissao,
      "eventosinscritos": req.body.eventosinscritos || null
    };
    if (_id) {
      Usuario.findByIdAndUpdate(_id, dados).exec()
        .then(
          function(usuario) {
            res.json(usuario);

          },
          function(erro) {
            res.status(500).json(erro);
          }
        );
    } else {
      Usuario.create(dados)
        .then(
          function(usuario) {
            res.status(201).json(usuario);

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
