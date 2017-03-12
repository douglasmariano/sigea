angular.module('contatooh').controller('AlunoController',
  function($scope, $routeParams, Aluno) {

    $scope.aluno = new Aluno();
    $scope.salva = function() {
      $scope.aluno.$save().
      then(function() {
          $scope.mensagem = {
            texto: 'Salvo com sucesso.',
            tipo: 'alert alert-success'
          };
          $scope.aluno = new Aluno();
        })
        .catch(function(erro) {
          $scope.mensagem = {
            texto: 'Nao foi possivel salvar.',
            tipo: 'alert alert-danger'
          };
        });
    };

    Aluno.query(function(alunos) {
      console.log(alunos);
      $scope.alunos = alunos;
    });

    Aluno.get({
        id: $routeParams.alunoId
      },
      function(aluno) {
        $scope.aluno = aluno;
      },
      function(erro) {
        $scope.mensagem = {
          texto: 'Nao foi possivel obter aluno.',
          tipo: 'alert alert-danger'
        };
        console.log(erro);
      }
    );


  });