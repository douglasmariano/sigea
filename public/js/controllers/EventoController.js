angular.module('contatooh').controller('EventoController',
  function($scope, $routeParams, Evento, Faculdade) {

    $scope.evento = new Evento();
    $scope.salva = function() {
      console.log($scope.evento);
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
    Faculdade.query(function(faculdades) {
      $scope.faculdades = faculdades;
    });


    Evento.query(function(eventos) {
      console.log(eventos);
      $scope.eventos = eventos;
    });

  if($routeParams.eventoId){
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
  }


  });
