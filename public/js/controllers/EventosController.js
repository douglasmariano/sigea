angular.module('contatooh').controller('EventosController',
  function(Usuario, Evento, $scope,$routeParams ) {
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

    $scope.selecionarEvento = function(evento){

      $scope.eventoSelecionado = evento;
      
     }
    $scope.participandoEvento = function(usuario){
      return $scope.eventoSelecionado.usuariospresentes.filter(usuarioAtual => usuarioAtual === usuario._id).length; 
    } 
     

     $scope.presente = function(usuario){

       $scope.eventoSelecionado.usuariospresentes.push(usuario);
       $scope.eventoSelecionado.$save().
      then(function() {
          $scope.mensagemModal = {
            texto: 'Salvo com sucesso.',
            tipo: 'alert alert-success'
          };
         })
         
        .catch(function(erro) {
          $scope.mensagemModal = {
            texto: 'Nao foi possivel salvar.',
            tipo: 'alert alert-danger'
          };
        });

          Evento.get({
            id: $scope.eventoSelecionado._id
          },
          function(evento) {
            $scope.eventoSelecionado = evento;
           },
          function(erro) {
            $scope.mensagemModal = {
              texto: 'Nao foi possivel obter evento.',
              tipo: 'alert alert-danger'
            };
            console.log(erro);
          }
        );
        
     }

     $scope.removerPresenca = function(usuario){
       var listaUsuarioRestantes = $scope.eventoSelecionado.usuariospresentes.filter(usuarioAtual => usuarioAtual != usuario._id);
       $scope.eventoSelecionado.usuariospresentes = listaUsuarioRestantes;
       $scope.eventoSelecionado.$save().
      then(function() {
          $scope.mensagemModal = {
            texto: 'Salvo com sucesso.',
            tipo: 'alert alert-success'
          };
         })
         
        .catch(function(erro) {
          $scope.mensagemModal = {
            texto: 'Nao foi possivel salvar.',
            tipo: 'alert alert-danger'
          };
        });

           Evento.get({
            id: $scope.eventoSelecionado._id
          },
          function(evento) {
            $scope.eventoSelecionado = evento;
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
