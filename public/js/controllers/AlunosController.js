angular.module('contatooh').controller('AlunosController',
  function(Aluno, $scope) {
    $scope.alunos = [];
    $scope.filtro = '';
    $scope.mensagem = {
      texto: '',
      tipo: ''
    };

    function buscaAlunos() {

      Aluno.query(
        function(alunos) {
          $scope.alunos = alunos;
        },
        function(erro) {
          console.log(erro)
        }
      );
    }
    buscaAlunos();

    $scope.remove = function(aluno) {
      Aluno.delete({
          id: aluno._id
        },
        function(){
          $scope.mensagem = {
            texto: 'Aluno removido com sucesso.',
            tipo: 'alert alert-success'
          };
          buscaAlunos()
        },
        function(erro) {

          $scope.mensagem = {
            texto: 'Não foi possível remover o aluno.',
            tipo: 'alert alert-danger'
          };
          console.log(erro);
        }
      );
    };
  });
