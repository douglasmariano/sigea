angular.module('contatooh').controller('PaginaInicialController',
  function($scope, $route) {
    $scope.filtro = '';
    /*
    tipos de mensagem disponíveis. Cada um tem uma cor.
    Quando for inserir uma mensagem, insira um tipo também

    alert alert-success
    alert alert-danger
    alert alert-info
    alert alert-warning
    */

    $scope.mensagem = {
      texto: '',
      tipo: ''
    };

    // Alimenta a tabela de rotas da primeira página
    $scope.routes = $route.routes;

  });
