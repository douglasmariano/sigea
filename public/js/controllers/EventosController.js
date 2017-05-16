angular.module('contatooh').controller('EventosController',
  function(Usuario, Evento, $scope ) {
    $scope.eventos = [];
    $scope.filtro = '';
    $scope.mensagem = {
      texto: '',
      tipo: ''
    };

    function buscaEventos() {

      Evento.query(
        function(eventos) {
          $scope.eventos = eventos;
        },
        function(erro) {
          console.log(erro)
        }
      );
    }
    buscaEventos();

    $scope.remove = function(evento) {
      Evento.delete({
          id: evento._id
        },
        function(){
          $scope.mensagem = {
            texto: 'Evento removido com sucesso.',
            tipo: 'alert alert-success'
          };
          buscaEventos()
        },
        function(erro) {

          $scope.mensagem = {
            texto: 'Não foi possível remover o evento.',
            tipo: 'alert alert-danger'
          };
          console.log(erro);
        }
      );
    };

    $scope.listaParticipantes = function(){
                 
    }
  });
