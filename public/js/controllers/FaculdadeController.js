angular.module('contatooh').controller('FaculdadeController',
  function($scope, $routeParams, Faculdade) {

    $scope.faculdade = new Faculdade();
    $scope.salva = function() {
      $scope.faculdade.$save().
      then(function() {
          $scope.mensagem = {
            texto: 'Salvo com sucesso.',
            tipo: 'alert alert-success'
          };
          $scope.faculdade = new Faculdade();
        })
        .catch(function(erro) {
          $scope.mensagem = {
            texto: 'Nao foi possivel salvar.',
            tipo: 'alert alert-danger'
          };
        });
    };

    if ($routeParams.faculdadeId) {
      Faculdade.get({
          id: $routeParams.faculdadeId
        },
        function(faculdade) {
          $scope.faculdade = faculdade;
        },
        function(erro) {
          $scope.mensagem = {
            texto: 'Nao foi possivel obter faculdade.',
            tipo: 'alert alert-danger'
          };
          console.log(erro);
        }
      );

    }

  });
