angular.module('contatooh').controller('EventoController',
  function($scope, $routeParams, Evento) {

    $scope.evento = new Evento();
    $scope.salva = function() {
      $scope.evento.$save().
      then(function() {
          $scope.mensagem = {
            texto: 'Salvo com sucesso.',
            tipo: 'alert alert-success'
          };
          $scope.evento = new Evento();
        })
        .catch(function(erro) {
          $scope.mensagem = {
            texto: 'Nao foi possivel salvar.',
            tipo: 'alert alert-danger'
          };
        });
    };

    Evento.query(function(eventos) {
      console.log(eventos);
      $scope.eventos = eventos;
    });

    Evento.get({
        id: $routeParams.eventoId
      },
      function(evento) {
        $scope.evento = evento;
      },
      function(erro) {
        $scope.mensagem = {
          texto: 'Nao foi possivel obter evento.',
          tipo: 'alert alert-danger'
        };
        console.log(erro);
      }
    );


  });
