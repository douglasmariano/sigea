angular.module('contatooh', ['ngRoute','ngResource'])
  .config(function($locationProvider, $routeProvider) {

$locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

$routeProvider.when('/contatos', {
    templateUrl: 'partials/contatos.html',
    controller: 'ContatosController'
  });
$routeProvider.when('/contato/:contatoId', {
    templateUrl: 'partials/contato.html',
    controller: 'ContatoController'
  });
$routeProvider.when('/contato', {
    templateUrl: 'partials/contato.html',
    controller: 'ContatoController'
});
$routeProvider.when('/paginainicial', {
    templateUrl: 'partials/paginaInicial.html',
    controller: 'PaginaInicialController'
});
$routeProvider.otherwise({redirectTo: '/paginainicial'});
});
