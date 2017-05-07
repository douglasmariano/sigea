angular.module('contatooh').controller('UsuariosController',
  function(Usuario, $scope) {
    $scope.usuarios = [];
    $scope.filtro = '';
    $scope.mensagem = {
      texto: '',
      tipo: ''
    };

    function buscaUsuarios() {

      Usuario.query(
        function(usuarios) {
          $scope.usuarios = usuarios;
        },
        function(erro) {
          console.log(erro)
        }
      );
    }
    buscaUsuarios();

    $scope.remove = function(usuario) {
      Usuario.delete({
          id: usuario._id
        },
        function(){
          $scope.mensagem = {
            texto: 'usuarios removido com sucesso.',
            tipo: 'alert alert-success'
          };
          buscaUsuarios()
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
