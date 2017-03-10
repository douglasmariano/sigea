angular.module('contatooh').controller('ContatoController',
  function($scope, $routeParams, Contato) {

    $scope.contato = new Contato();
    $scope.salva = function() {
      $scope.contato.$save().
      then(function() {
          $scope.mensagem = {
            texto: 'Salvo com sucesso.',
            tipo: 'alert alert-success'
          };
          $scope.contato = new Contato();
        })
        .catch(function(erro) {
          $scope.mensagem = {
            texto: 'Nao foi possivel salvar.',
            tipo: 'bg-danger'
          };
        });
    };

    Contato.query(function(contatos) {
      console.log(contatos);
      $scope.contatos = contatos;
    });

    Contato.get({
        id: $routeParams.contatoId
      },
      function(contato) {
        $scope.contato = contato;
      },
      function(erro) {
        $scope.mensagem = {
          texto: 'Nao foi possivel obter contato.',
          tipo: 'bg-danger'
        };
        console.log(erro);
      }
    );


  });
