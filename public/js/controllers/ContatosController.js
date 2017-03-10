angular.module('contatooh').controller('ContatosController',
  function(Contato, $scope) {
    $scope.contatos = [];
    $scope.filtro = '';
    $scope.mensagem = {
      texto: '',
      tipo: ''
    };

    function buscaContatos() {

      Contato.query(
        function(contatos) {
          $scope.contatos = contatos;
        },
        function(erro) {
          console.log(erro)
        }
      );
    }
    buscaContatos();

    $scope.remove = function(contato) {
      Contato.delete({
          id: contato._id
        },
        function(){
          $scope.mensagem = {
            texto: 'Contato removido com sucesso.',
            tipo: 'bg-success'
          };
          buscaContatos()
        },
        function(erro) {

          $scope.mensagem = {
            texto: 'Não foi possível remover o contato.',
            tipo: 'bg-danger'
          };
          console.log(erro);
        }
      );
    };
  });
