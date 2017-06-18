module.exports = function(app) {

  var Faculdade = app.models.faculdade;
  var sanitize = require('mongo-sanitize');

  var controller = {};

  controller.listaTodos = function(req, res) {
    //Faculdade.find().populate('emergencia').exec()
    var promise = Faculdade.find().populate('faculdade').exec()
      .then(
        function(faculdades) {
          res.json(faculdades);
        },
        function(erro) {
          console.error(erro)
          res.status(500).json(erro);
        }
      );
  };

  controller.obtemFaculdade = function(req, res) {
    var _id = req.params.id;
    Faculdade.findById(_id).exec()
      .then(
        function(faculdade) {
          if (!faculdade) throw new Error("Faculdade não encontrado");
          res.json(faculdade)
        },
        function(erro) {
          console.log(erro);
          res.status(404).json(erro)
        }
      );
  };

  controller.removeFaculdade = function(req, res) {
    var _id = sanitize(req.params.id);
    Faculdade.remove({
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

  controller.salvaFaculdade = function(req, res) {
    var _id = req.body._id;

    var dados = {
      "nome": req.body.nome
    };
    if (_id) {
      Faculdade.findByIdAndUpdate(_id, dados).exec()
        .then(
          function(faculdade) {
            res.json(faculdade);

          },
          function(erro) {
            res.status(500).json(erro);
          }
        );
    } else {
      Faculdade.create(dados)
        .then(
          function(faculdade) {
            res.status(201).json(faculdade);

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
