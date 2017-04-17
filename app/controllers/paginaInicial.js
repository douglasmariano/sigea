module.exports = function(app){

  var Usuario = app.models.usuario;

  var controller = {};

  controller.obtemUsuario = function(req, res) {
    var _id = req.params.id;
    Usuario.findById(_id).exec()
      .then(
        function(usuario) {
          if (!usuario) throw new Error("Evento não encontrado");
          res.json(usuario)
        },
        function(erro) {
          console.log(erro);
          res.status(404).json(erro)
        }
      );
  };

  return controller;
};
