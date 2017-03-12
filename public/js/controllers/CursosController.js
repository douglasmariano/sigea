angular.module('contatooh').controller('CursosController',
  function(Curso, $scope) {
    $scope.cursos = [];
    $scope.filtro = '';
    $scope.mensagem = {
      texto: '',
      tipo: ''
    };

    function buscaCursos() {

      Curso.query(
        function(cursos) {
          $scope.cursos = cursos;
        },
        function(erro) {
          console.log(erro)
        }
      );
    }
    buscaCursos();

    $scope.remove = function(curso) {
      Curso.delete({
          id: curso._id
        },
        function(){
          $scope.mensagem = {
            texto: 'Curso removido com sucesso.',
            tipo: 'alert alert-success'
          };
          buscaCursos()
        },
        function(erro) {

          $scope.mensagem = {
            texto: 'Não foi possível remover o curso.',
            tipo: 'alert alert-danger'
          };
          console.log(erro);
        }
      );
    };
  });
