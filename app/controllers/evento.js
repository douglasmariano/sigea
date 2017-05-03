module.exports = function(app) {

  var Evento = app.models.evento;
  var sanitize = require('mongo-sanitize');

  var controller = {};

  controller.listaTodos = function(req, res) {
    //Evento.find().populate('faculdade').exec()
    var promise = Evento.find().populate('faculdade').exec()
      .then(
        function(eventos) {
          res.json(eventos);
        },
        function(erro) {
          console.error(erro)
          res.status(500).json(erro);
        }
      );
  };

  controller.obtemEvento = function(req, res) {
    var _id = req.params.id;
    Evento.findById(_id).exec()
      .then(
        function(evento) {
          if (!evento) throw new Error("Evento não encontrado");
          res.json(evento)
        },
        function(erro) {
          console.log(erro);
          res.status(404).json(erro)
        }
      );
  };

  controller.removeEvento = function(req, res) {
    var _id = sanitize(req.params.id);
    Evento.remove({
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

  controller.salvaEvento = function(req, res) {
    var _id = req.body._id;

    var dados = {
      "nome": req.body.nome,
      "codigo": req.body.codigo,
      "data": req.body.data,
      "local": req.body.local,
      "valor": req.body.valor,
      "quantidade": req.body.quantidade,
      "quantidadedisponivel": req.body.quantidadedisponivel,
      "certificado": req.body.certificado,
      "tipoEvento": req.body.tipoEvento,
      "usuariosinscritos": req.body.usuariosinscritos || [],
      "usuariospresentes": req.body.usuariospresentes || []
    };
    if (_id) {
      Evento.findByIdAndUpdate(_id, dados).exec()
        .then(
          function(evento) {
            res.json(evento);

          },
          function(erro) {
            res.status(500).json(erro);
          }
        );
    } else {
      Evento.create(dados)
        .then(
          function(evento) {
            res.status(201).json(evento);

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
