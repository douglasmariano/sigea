angular.module('contatooh').controller('PaginaInicialController',
  function($http, $scope, $route, Evento, Usuario) {
    $scope.filtro = '';
    /*
    tipos de mensagem disponíveis. Cada um tem uma cor.
    Quando for inserir uma mensagem, insira um tipo também

    alert alert-success
    alert alert-danger
    alert alert-info
    alert alert-warning
    */
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

    function carregarEventosUsuario(){
      $http.get("/usuario_logado").then(function(success){

        Usuario.get({
          id: success.data._id
        }, function(usuario){
          
          $scope.usuario = usuario;
        }, function(erro){
          console.log(erro);
        });

      }, function(error){
        console.log("erro");
      });
    }
    carregarEventosUsuario();


    $scope.participarEvento = function(evento){
      $http.get("/usuario_logado").then(function(success){

        Usuario.get({
          id: success.data._id
        }, function(usuario){
          
          usuario.eventosinscritos.push(evento);
          usuario.$save()
          .then(function(){
            $scope.mensagem = {
              texto: 'Inscrito com sucesso.',
              tipo: 'alert alert-success'
            };
          })
          .catch();

          carregarEventosUsuario();
        }, function(erro){
          console.log(erro);
        });

      }, function(error){
        console.log("erro");
      });
    }

    $scope.removerEvento = function(evento){
      $http.get("/usuario_logado").then(function(success){

        Usuario.get({
          id: success.data._id
        }, function(usuario){
          
          var eventosRestantes = usuario.eventosinscritos.filter(function(el) {
              return el._id !== evento._id;
          });

          usuario.eventosinscritos = eventosRestantes;
          usuario.$save()
          .then(function(){
            $scope.mensagem = {
              texto: 'Removido com sucesso.',
              tipo: 'alert alert-success'
            };
          })
          .catch();

          carregarEventosUsuario();
        }, function(erro){
          console.log(erro);
        });

      }, function(error){
        console.log("erro");
      });
    }

    $scope.mensagem = {
      texto: '',
      tipo: ''
    };

    // Alimenta a tabela de rotas da primeira página
    $scope.routes = $route.routes;
    $scope.logout = function(){
      delete $sessionStorage.sessname; //sessname is get sessionStorage username
        $location.path('/login');
    };

  });
