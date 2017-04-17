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


    $scope.participarEvento = function(user){
      $http.get("/usuario_logado").then(function(success){
        console.log(success.data);
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

    console.log($route.routes)

  });
