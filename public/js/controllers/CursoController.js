angular.module('contatooh').controller('CursoController',
  function($scope, $routeParams, Curso, Faculdade) {

    $scope.curso = new Curso();
    $scope.salva = function() {
      $scope.curso.$save().
      then(function() {
          $scope.mensagem = {
            texto: 'Salvo com sucesso.',
            tipo: 'alert alert-success'
          };
          $scope.curso = new Curso();
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

    if ($routeParams.cursoId) {
      Curso.get({
          id: $routeParams.cursoId
        },
        function(curso) {
          $scope.curso = curso;
        },
        function(erro) {
          $scope.mensagem = {
            texto: 'Nao foi possivel obter curso.',
            tipo: 'alert alert-danger'
          };
          console.log(erro);
        }
      );
    }


  });
